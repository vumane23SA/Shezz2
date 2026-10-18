import crypto from 'node:crypto';
import {promisify} from 'node:util';
import mysql from 'mysql2/promise';

const scrypt=promisify(crypto.scrypt);
const config={
  host:process.env.MYSQL_HOST||'127.0.0.1',
  port:Number(process.env.MYSQL_PORT||3306),
  user:process.env.MYSQL_USER||'root',
  password:process.env.MYSQL_PASSWORD||'',
  database:process.env.MYSQL_DATABASE||'shezz_beauty',
  dateStrings:true,
  waitForConnections:true,
  connectionLimit:10,
};
export const enabled=['MYSQL_HOST','MYSQL_USER','MYSQL_PASSWORD','MYSQL_DATABASE'].every(name=>process.env[name]!==undefined);
const pool=enabled?mysql.createPool(config):null;
const reply=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
const fail=(res,status,message)=>reply(res,status,{error:message});
const hashToken=token=>crypto.createHash('sha256').update(token).digest('hex');
const safeUser=row=>({id:row.id,email:row.email,fullName:row.full_name,phone:row.phone});
const bookingFromRow=row=>({
  id:row.id,
  name:row.customer_name,
  phone:row.phone,
  service:Number(row.service_id),
  stylist:row.stylist_id,
  date:row.appointment_date,
  time:String(row.appointment_time).slice(0,5),
  status:row.status,
  payment:row.payment_preference,
});
async function getActor(req){
  const match=/^Bearer (.+)$/i.exec(req.headers.authorization||'');
  if(!match)return null;
  const [rows]=await pool.execute('SELECT c.id,c.email,c.full_name,c.phone FROM customer_sessions s JOIN customers c ON c.id=s.customer_id WHERE s.token_hash=? AND s.expires_at>UTC_TIMESTAMP() LIMIT 1',[hashToken(match[1])]);
  return rows[0]||null;
}
async function createSession(res,customer){
  const token=crypto.randomBytes(32).toString('base64url');
  await pool.execute('INSERT INTO customer_sessions (customer_id,token_hash,expires_at) VALUES (?,?,DATE_ADD(UTC_TIMESTAMP(),INTERVAL 30 DAY))',[customer.id,hashToken(token)]);
  return reply(res,200,{token,user:safeUser(customer)});
}
function validEmail(email){return typeof email==='string'&&email.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
export async function handleMysql(req,res,pathname,body){
  if(pathname==='/api/config'&&req.method==='GET')return reply(res,200,{database:enabled});
  if(!pathname.startsWith('/api/v1/')&&!pathname.startsWith('/api/auth/'))return false;
  if(!enabled)return fail(res,503,'MySQL is not configured. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE.');
  try{
    if(pathname==='/api/auth/register'&&req.method==='POST'){
      const fullName=String(body?.fullName||'').trim(),email=String(body?.email||'').trim().toLowerCase(),phone=String(body?.phone||'').trim(),password=body?.password;
      if(fullName.length<2||fullName.length>100||!validEmail(email)||!/^[+\d ()-]{9,22}$/.test(phone)||typeof password!=='string'||password.length<8||password.length>128)return fail(res,400,'Enter your name, a valid email and phone number, and a password of at least 8 characters.');
      const salt=crypto.randomBytes(16).toString('hex');
      const passwordHash=(await scrypt(password,salt,64)).toString('hex');
      const [result]=await pool.execute('INSERT INTO customers (email,full_name,phone,password_hash) VALUES (?,?,?,?)',[email,fullName,phone,`${salt}:${passwordHash}`]);
      const customer={id:result.insertId,email,full_name:fullName,phone};
      return await createSession(res,customer);
    }
    if(pathname==='/api/auth/login'&&req.method==='POST'){
      const email=String(body?.email||'').trim().toLowerCase(),password=body?.password;
      if(!validEmail(email)||typeof password!=='string')return fail(res,400,'Enter your email and password.');
      const [rows]=await pool.execute('SELECT id,email,full_name,phone,password_hash FROM customers WHERE email=? LIMIT 1',[email]);
      const customer=rows[0];
      if(!customer)return fail(res,401,'Email or password is incorrect.');
      const [salt,stored]=customer.password_hash.split(':');
      const candidate=await scrypt(password,salt,64);
      if(!stored||candidate.length!==Buffer.from(stored,'hex').length||!crypto.timingSafeEqual(candidate,Buffer.from(stored,'hex')))return fail(res,401,'Email or password is incorrect.');
      return await createSession(res,customer);
    }
    const actor=await getActor(req);
    if(pathname==='/api/auth/me'&&req.method==='GET')return actor?reply(res,200,{user:safeUser(actor)}):fail(res,401,'Sign in to continue.');
    if(pathname==='/api/auth/logout'&&req.method==='POST'){
      const match=/^Bearer (.+)$/i.exec(req.headers.authorization||'');
      if(match)await pool.execute('DELETE FROM customer_sessions WHERE token_hash=?',[hashToken(match[1])]);
      return reply(res,200,{ok:true});
    }
    if(pathname==='/api/v1/slots'&&req.method==='GET'){
      const url=new URL(req.url,'http://localhost'),date=url.searchParams.get('date'),stylist=url.searchParams.get('stylist');
      if(!/^\d{4}-\d\d-\d\d$/.test(date||'')||!['s1','s2','s3'].includes(stylist))return fail(res,400,'Invalid date or stylist.');
      const [rows]=await pool.execute("SELECT TIME_FORMAT(appointment_time,'%H:%i') AS time FROM appointments WHERE appointment_date=? AND stylist_id=? AND status<>'Cancelled'",[date,stylist]);
      return reply(res,200,{reserved:rows.map(row=>row.time)});
    }
    if(pathname==='/api/v1/bookings'&&req.method==='GET'){
      if(!actor)return fail(res,401,'Sign in to continue.');
      const [rows]=await pool.execute('SELECT id,customer_name,phone,service_id,stylist_id,DATE_FORMAT(appointment_date,\'%Y-%m-%d\') AS appointment_date,TIME_FORMAT(appointment_time,\'%H:%i\') AS appointment_time,status,payment_preference FROM appointments WHERE customer_id=? ORDER BY created_at DESC LIMIT 200',[actor.id]);
      return reply(res,200,{bookings:rows.map(bookingFromRow)});
    }
    if(pathname==='/api/v1/bookings'&&req.method==='POST'){
      if(!actor)return fail(res,401,'Sign in to book an appointment.');
      const {name,phone,service,stylist,date,time,payment}=body||{};
      if(typeof name!=='string'||name.trim().length<2||name.length>100||typeof phone!=='string'||!/^[+\d ()-]{9,22}$/.test(phone)||!Number.isInteger(service)||service<1||service>24||!['s1','s2','s3'].includes(stylist)||!/^\d{4}-\d\d-\d\d$/.test(date||'')||!/^\d\d:00$/.test(time||'')||Number(time.slice(0,2))<9||Number(time.slice(0,2))>16||!['Pay at salon','Online payment requested'].includes(payment))return fail(res,400,'Invalid booking details.');
      if(new Date(`${date}T${time}:00+02:00`).getTime()<=Date.now())return fail(res,400,'Choose a future time.');
      const id=crypto.randomUUID();
      try{
        await pool.execute('INSERT INTO appointments (id,customer_id,customer_name,phone,service_id,stylist_id,appointment_date,appointment_time,payment_preference) VALUES (?,?,?,?,?,?,?,?,?)',[id,actor.id,name.trim(),phone,service,stylist,date,time,payment]);
      }catch(error){if(error.code==='ER_DUP_ENTRY')return fail(res,409,'This stylist is already booked at that time.');throw error;}
      return reply(res,201,{booking:{id,name:name.trim(),phone,service,stylist,date,time,status:'Pending',payment}});
    }
    const statusMatch=/^\/api\/v1\/bookings\/([0-9a-f-]{36})\/status$/.exec(pathname);
    if(statusMatch&&req.method==='POST'){
      if(!actor)return fail(res,401,'Sign in to continue.');
      if(body?.status!=='Cancelled')return fail(res,403,'Only pending customer bookings can be cancelled.');
      const [result]=await pool.execute("UPDATE appointments SET status='Cancelled' WHERE id=? AND customer_id=? AND status='Pending'",[statusMatch[1],actor.id]);
      return result.affectedRows?reply(res,200,{ok:true}):fail(res,404,'Pending booking not found.');
    }
    return fail(res,404,'Unknown API endpoint.');
  }catch(error){
    if(error.code==='ER_DUP_ENTRY'&&pathname==='/api/auth/register')return fail(res,409,'An account with that email already exists.');
    console.error('MySQL API error:',error.message);
    return fail(res,500,'The database request could not be completed.');
  }
}