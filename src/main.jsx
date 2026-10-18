import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import QRCode from "qrcode";
import {
  CalendarDays,
  Clock3,
  Gift,
  Menu,
  X,
  CheckCircle2,
  Scissors,
  Star,
  ArrowRight,
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  Send,
  ShieldCheck,
  Wallet,
  ChevronLeft,
  ChevronRight,
  UserRound,
  LockKeyhole,
  Plus,
  Minus,
  ImagePlus,
} from "lucide-react";
import "./style.css";
import "./theme.css";
const portfolio = Array.from(
  { length: 18 },
  (_, i) =>
    "/images/portfolio/style-" + String(i + 1).padStart(2, "0") + ".jpg",
);
const pics = [
  "IMG_0155.jpeg",
  "IMG_0154.jpeg",
  "IMG_0153.jpeg",
  "IMG_0156.jpeg",
  "IMG_0157.jpeg",
  "IMG_0158.jpeg",
].map((x) => "/images/" + x);
const services = [
  ["Goddess Cornrows", "Braids", 450, 180, pics[0], "Detailed feed-in braids with a polished finish."],
  ["Bohemian Braids", "Braids", 650, 240, pics[1], "Long, free-flowing braids with a soft, relaxed finish."],
  ["Salon Style Consultation", "Beauty", 150, 30, pics[3], "Talk through the style, length, and finish you have in mind."],
  ["Creative Cornrows", "Braids", 350, 150, pics[4], "Neat cornrows with a pattern made to stand out."],
  ["Soft Locs & Extensions", "Hair", 600, 210, pics[2], "Protective loc styling with a soft, natural finish."],
  ["Gel Manicure", "Nails", 250, 75, pics[5], "Nail shaping, cuticle care and a glossy gel finish."],
  ["Braids & Nail Combo", "Beauty", 950, 300, portfolio[6], "A head-turning braid and nail pairing, shown at R950."],
  ["Brow Shape & Finish", "Beauty", 180, 45, portfolio[0], "A clean, defined brow finish to frame your features."],
  ["Braided Ponytail", "Braids", 500, 180, portfolio[1], "Sculpted braids gathered into a statement ponytail."],
  ["Patterned Feed-in Braids", "Braids", 450, 180, portfolio[2], "Intricate feed-in braids with a custom pattern."],
  ["Loc Retwist & Style", "Hair", 500, 180, portfolio[3], "A tidy retwist and considered finish for your locs."],
  ["Braided Bun Ponytail", "Braids", 600, 210, portfolio[4], "A high braided ponytail finished in a full, elegant bun."],
  ["Soft Twist Locs", "Hair", 650, 240, portfolio[5], "Textured loc styling with a relaxed, wearable shape."],
  ["Beauty Treatment Combo", "Beauty", 680, 210, portfolio[7], "A coordinated hair and beauty treatment combo, shown at R680."],
  ["Extension Installation", "Hair", 750, 240, portfolio[8], "A tailored extension install for added length and volume."],
  ["Sculpted Cornrows", "Braids", 400, 150, portfolio[9], "Smooth, detailed cornrows shaped to your style."],
  ["Long Passion Twists", "Hair", 700, 270, portfolio[10], "Long, soft twists with a beautifully full finish."],
  ["Braids, Nails & Brows Combo", "Beauty", 950, 300, portfolio[11], "A complete beauty look with braids, nails and brow styling."],
  ["Kids' Cornrows", "Braids", 300, 120, portfolio[12], "Gentle, neat cornrows for a fresh everyday style."],
  ["Glam Braided Updo", "Braids", 650, 180, portfolio[13], "An elevated braided updo with a camera-ready finish."],
  ["Sleek Ponytail", "Hair", 350, 90, portfolio[14], "A smooth, sleek ponytail for an effortlessly polished look."],
  ["Braided Bun Updo", "Braids", 500, 150, portfolio[15], "A graceful braided updo styled into a neat bun."],
  ["Classic Ponytail", "Hair", 350, 90, portfolio[16], "A clean, smooth ponytail with a soft, glossy finish."],
  ["Signature Ponytail", "Hair", 450, 120, portfolio[17], "A salon-finished ponytail styled for your next occasion."],
].map(([name, category, price, duration, img, desc], index) => ({
  id: index + 1,
  name,
  category,
  price,
  duration,
  img,
  desc,
}));
const stylists = [
  {
    id: "s1",
    name: "Braiding Specialist",
    role: "Braids & cornrows",
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "s2",
    name: "Hair Specialist",
    role: "Locs & protective styling",
    days: [2, 3, 4, 5, 6],
  },
  {
    id: "s3",
    name: "Nail Technician",
    role: "Manicures & nail art",
    days: [1, 2, 3, 4, 5, 6],
  },
];
const load = (k, f) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? f;
  } catch {
    return f;
  }
};
const money = (n) => "R" + n.toLocaleString("en-ZA");
const fmt = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const daynum = (d) => new Date(d + "T12:00:00").getDay();
const translations = {
  en: {
    home: "Home",
    services: "Services",
    book: "Book Appointment",
    appointments: "My Bookings",
    offers: "Make an Offer",
    offersTag: "SHEZZ STYLE OFFERS",
    offerWelcome: "Your next look starts with an idea.",
    offerWelcomeText: "Found a style you love? Share your inspiration and the price you have in mind. Our team will take a look and get back to you.",
    offerStepDetails: "A little about you",
    offerPhotoCaption: "Bring your inspiration to life",
    offerStyleBadge: "Your style, your way",
    offerStepStyle: "Tell us about your look",
    offerStepPrice: "Your offer",
    offerPriceHelp: "The salon will confirm the final price before anything is booked.",
    offerPhotoHelp: "Choose a clear photo of the look you have in mind. JPG or PNG, up to 8 MB.",
    offerAsideTitle: "Let’s create a look that feels like you.",
    offerAsideText: "Your inspiration helps our stylists understand the details, so they can let you know what’s possible.",
    offerAsideStep1: "Share a photo and describe your style",
    offerAsideStep2: "Suggest the price that works for you",
    offerAsideStep3: "Wait for the salon to respond",
    offerDecisionNote: "No appointment is booked until you and the salon confirm the details.",
    reviewOffers: "Review customer offers",
    noCustomerOffers: "No customer offers yet.",
    consentRecord: "Consent recorded",
    rewards: "Rewards",
    consentTitle: "Before you choose a treatment",
    consentIntro:
      "Please read and record your consent before selecting a treatment.",
    consentHeading: "Digital consultation consent",
    consentText:
      "I understand that I will discuss the treatment, possible risks, alternatives and aftercare with my stylist before it begins. I can ask questions, choose not to proceed, or withdraw my consent at any time. This general consent does not replace treatment-specific consent.",
    privacyText:
      "I agree that SHEZZ may record my name, contact details, consent wording, language and the time I gave consent to manage this appointment request.",
    consentButton: "Record consent & continue",
    consentNote: "Your consent is recorded with the selected language and time. This demo stores it in this browser only. Discuss treatment-specific risks and consent with your stylist before the procedure.",
    consentName: "Full name",
    consentPhone: "Mobile number",
    consentEmail: "Email (optional)",
    offersTitle: "Make a style offer",
    offersIntro:
      "Share an inspiration photo, describe the look and offer your price. The salon can accept or decline your request.",
    offerName: "Your name",
    offerPhone: "Mobile number",
    offerDescription: "Describe the look you want",
    offerPrice: "Your price offer (R)",
    offerPhoto: "Inspiration photo",
    offerNote: "The salon will review your photo and price and update the status here. Sending an offer is a request, not a confirmed booking. This demo saves it in this browser only.",
    submitOffer: "Send offer to salon",
    myOffers: "Your offers",
    accept: "Accept offer",
    decline: "Decline",
    pending: "Awaiting salon response",
    accepted: "Accepted",
    declined: "Declined",
    noOffers: "No offers found for this phone number yet.",
    choosePhoto: "Choose an image",
    bookingTag: "YOUR BEAUTY APPOINTMENT",
    bookTitle: "Book your moment.",
    bookingIntro: "A few quick steps and you're on your way to your next favourite look.",
    chooseTreatment: "Choose your treatment",
    chooseStylist: "Select a stylist",
    dateTime: "Date & available time",
    appointmentDate: "Appointment date",
    availableSlots: "Available time slots",
    noSlots: "No slots available for this stylist on this date. Try another day.",
    yourDetails: "Your details",
    fullName: "Full name",
    email: "Email (optional)",
    paymentPreference: "Payment preference",
    payAtSalon: "Pay at salon",
    onlinePayment: "Request online payment",
    onlinePaymentNote: "Online payment is not connected. No card details will be collected or charged.",
    requestBooking: "Request booking",
    yourAppointment: "YOUR APPOINTMENT",
    selectTime: "Select a time",
    startingFrom: "Starting from",
    bookingConfirmation: "Booking requests require salon confirmation.",
  },
  xh: {
    home: "Ekhaya",
    services: "Iinkonzo",
    book: "Bhukisha",
    appointments: "Iibhukisho zam",
    offers: "Yenza isithembiso",
    offersTag: "IZITHEMBISO ZESITAYILE SE-SHEZZ",
    offerWelcome: "Inkangeleko yakho entsha iqala ngombono.",
    offerWelcomeText: "Ubonile isitayile osithandayo? Yabelana ngefoto nangexabiso ocinga ngalo. Iqela lethu liza kujonga lize likuphendule.",
    offerStepDetails: "Sixelele ngawe",
    offerPhotoCaption: "Yenza isitayile osifunayo siphile",
    offerStyleBadge: "Isitayile sakho, ngendlela yakho",
    offerStepStyle: "Chaza isitayile osifunayo",
    offerStepPrice: "Ixabiso lakho",
    offerPriceHelp: "Isaluni iza kuqinisekisa ixabiso lokugqibela ngaphambi kokubhukisha.",
    offerPhotoHelp: "Khetha ifoto ecacileyo yesitayile osifunayo. JPG okanye PNG, ukuya kwi-8 MB.",
    offerAsideTitle: "Masenze isitayile esikufaneleyo.",
    offerAsideText: "Ifoto yakho inceda abalungisi baqonde iinkcukacha ukuze bakuxelele into enokwenzeka.",
    offerAsideStep1: "Yabelana ngefoto uze uchaze isitayile",
    offerAsideStep2: "Cebisa ngexabiso elikufaneleyo",
    offerAsideStep3: "Lindela impendulo yesaluni",
    offerDecisionNote: "Akukho dinga libhukishwayo de wena nesaluni niqinisekise iinkcukacha.",
    reviewOffers: "Jonga izithembiso zabathengi",
    noCustomerOffers: "Akukho zithembiso zabathengi okwangoku.",
    consentRecord: "Imvume irekhodwe",
    rewards: "Imivuzo",
    consentTitle: "Ngaphambi kokukhetha unyango",
    consentIntro:
      "Nceda ufunde uze urekhode imvume yakho ngaphambi kokukhetha unyango.",
    consentHeading: "Imvume yothethwano yedijithali",
    consentText:
      "Ndiyaqonda ukuba ndiza kuthetha nomlungisi ngeenkcukacha zonyango, imingcipheko, ezinye iindlela kunye nendlela yokunyamekela emva koko ngaphambi kokuba luqale. Ndingabuza imibuzo, ndikhethe ukungaqhubeki okanye ndirhoxise imvume yam nangaliphi na ixesha. Le mvume jikelele ayithathi indawo yemvume yonyango oluthile.",
    privacyText:
      "Ndiyavuma ukuba iSHEZZ irekhode igama lam, iinkcukacha zam zoqhagamshelwano, amazwi emvume, ulwimi nexesha lemvume ukuze ilawule isicelo sam sedinga.",
    consentButton: "Rekhoda imvume uze uqhubeke",
    consentNote: "Imvume yakho irekhodwa ngolwimi olukhethileyo nangexesha. Le demo iyigcina kule bhrawuza kuphela. Thetha nomlungisi ngemingcipheko yonyango oluthile uze unike imvume ngaphambi kwenkqubo.",
    consentName: "Amagama apheleleyo",
    consentPhone: "Inombolo yeselula",
    consentEmail: "I-imeyile (ayinyanzelekanga)",
    offersTitle: "Yenza isithembiso sesitayile",
    offersIntro:
      "Thumela ifoto yomzekelo, chaza isitayile uze unike ixabiso. Isaluni ingasamkela okanye isale isicelo sakho.",
    offerName: "Igama lakho",
    offerPhone: "Inombolo yeselula",
    offerDescription: "Chaza isitayile osifunayo",
    offerPrice: "Ixabiso olinikelayo (R)",
    offerPhoto: "Ifoto yomzekelo",
    offerNote: "Isaluni iza kujonga ifoto nexabiso lakho ize ihlaziye imeko yesicelo apha. Ukuthumela isithembiso akulilo idinga eliqinisekisiweyo. Le demo iyigcina kule bhrawuza kuphela.",
    submitOffer: "Thumela isithembiso kwisaluni",
    myOffers: "Izithembiso zakho",
    accept: "Yamkela isithembiso",
    decline: "Yala",
    pending: "Ilindele impendulo yesaluni",
    accepted: "Samkelwe",
    declined: "Saliwe",
    noOffers: "Akukho zithembiso zifunyenweyo kule nombolo.",
    choosePhoto: "Khetha ifoto",
    bookingTag: "IDINGA LAKHO LOBUHLE",
    bookTitle: "Bhukisha ixesha lakho.",
    bookingIntro: "Landela amanyathelo ambalwa ukuze ulungiselele isitayile osithandayo.",
    chooseTreatment: "Khetha unyango",
    chooseStylist: "Khetha umlungisi",
    dateTime: "Umhla nexesha elifumanekayo",
    appointmentDate: "Umhla wedinga",
    availableSlots: "Amaxesha akhoyo",
    noSlots: "Akukho xesha likhoyo kulo mhla kulo mlungisi. Zama omnye umhla.",
    yourDetails: "Iinkcukacha zakho",
    fullName: "Amagama apheleleyo",
    email: "I-imeyile (ayinyanzelekanga)",
    paymentPreference: "Indlela yokuhlawula",
    payAtSalon: "Hlawula esaluni",
    onlinePayment: "Cela intlawulo ye-intanethi",
    onlinePaymentNote: "Intlawulo ye-intanethi ayikasebenzi. Akukho nkcukacha zekhadi ziya kuqokelelwa okanye kuhlawuliswa.",
    requestBooking: "Cela idinga",
    yourAppointment: "IDINGA LAKHO",
    selectTime: "Khetha ixesha",
    startingFrom: "Ixabiso liqala ku",
    bookingConfirmation: "Izicelo zamadinga kufuneka ziqinisekiswe sisaluni.",
  },
  zu: {
    home: "Ekhaya",
    services: "Amasevisi",
    book: "Bhukha i-aphoyintimenti",
    appointments: "Ama-aphoyintimenti ami",
    offers: "Yenza isithembiso",
    offersTag: "IZITHEMBISO ZESITAYELA ZESHEZZ",
    offerWelcome: "Isitayela sakho esisha siqala ngombono.",
    offerWelcomeText: "Ubone isitayela osithandayo? Yabelana ngesithombe sento oyithandayo kanye nenani ocabanga ngalo. Ithimba lethu lizobheka bese likuphendula.",
    offerStepDetails: "Sitshele ngawe",
    offerPhotoCaption: "Yenza umbono wakho ubonakale",
    offerStyleBadge: "Isitayela sakho, ngendlela yakho",
    offerStepStyle: "Sitshele ngesitayela osifunayo",
    offerStepPrice: "Isithembiso sakho",
    offerPriceHelp: "Isaluni izoqinisekisa inani lokugcina ngaphambi kokubhukha.",
    offerPhotoHelp: "Khetha isithombe esicacile sesitayela osifunayo. JPG noma PNG, esingeqi ku-8 MB.",
    offerAsideTitle: "Masidale isitayela esikufanele.",
    offerAsideText: "Isithombe sakho sisiza abalungisi bethu baqonde imininingwane ukuze bakutshele okungenzeka.",
    offerAsideStep1: "Yabelana ngesithombe bese uchaza isitayela sakho",
    offerAsideStep2: "Phakamisa inani elikulungele",
    offerAsideStep3: "Lindela impendulo yesaluni",
    offerDecisionNote: "I-aphoyintimenti ayibhukhiwe kuze kube wena nesaluni niqinisekisa imininingwane.",
    reviewOffers: "Buyekeza izithembiso zamakhasimende",
    noCustomerOffers: "Azikho izithembiso zamakhasimende okwamanje.",
    consentRecord: "Imvume iqoshiwe",
    rewards: "Imiklomelo",
    consentTitle: "Ngaphambi kokukhetha ukwelashwa",
    consentIntro: "Sicela ufunde futhi uqophe imvume yakho ngaphambi kokukhetha ukwelashwa.",
    consentHeading: "Imvume yokubonisana yedijithali",
    consentText: "Ngiyaqonda ukuthi ngaphambi kokuba ukwelashwa kuqale, ngizoxoxa nomlungisi wami ngokwelashwa, izingozi ezingaba khona, ezinye izindlela nokunakekelwa kwangemva kwalokho. Ngingabuza imibuzo, ngikhethe ukungaqhubeki, noma ngihoxise imvume yami noma nini. Le mvume ejwayelekile ayithathi indawo yemvume ethile yokwelashwa.",
    privacyText: "Ngiyavuma ukuthi iSHEZZ iqophe igama lami, imininingwane yokuxhumana, umbhalo wemvume, ulimi nesikhathi enginike ngaso imvume ukuze iphathe isicelo sami se-aphoyintimenti.",
    consentButton: "Qopha imvume uqhubeke",
    consentNote: "Imvume yakho iqoshwa ngolimi olukhethile nangesikhathi. Le demo iyigcina kule browser kuphela. Xoxa nomlungisi ngezingozi zempatho ethile nemvume ngaphambi kokuqala.",
    consentName: "Amagama aphelele",
    consentPhone: "Inombolo yeselula",
    consentEmail: "I-imeyili (akuphoqelekile)",
    offersTitle: "Yenza isithembiso sesitayela",
    offersIntro: "Yabelana ngesithombe esikukhuthazayo, uchaze isitayela bese uphakamisa inani lakho. Isaluni ingasamukela noma isenqabe isicelo sakho.",
    offerName: "Igama lakho",
    offerPhone: "Inombolo yeselula",
    offerDescription: "Chaza isitayela osifunayo",
    offerPrice: "Inani oliphakamisayo (R)",
    offerPhoto: "Isithombe esikukhuthazayo",
    offerNote: "Isaluni izobuyekeza isithombe nenani lakho bese ibuyekeza isimo lapha. Ukuthumela isithembiso akusho ukuthi i-aphoyintimenti isiqinisekisiwe. Le demo igcina lokhu kule browser kuphela.",
    submitOffer: "Thumela isithembiso esaluni",
    myOffers: "Izithembiso zakho",
    accept: "Yamukela isithembiso",
    decline: "Yenqaba",
    pending: "Kulindelwe impendulo yesaluni",
    accepted: "Samukelwe",
    declined: "Senqatshiwe",
    noOffers: "Azikho izithembiso ezitholakele kule nombolo okwamanje.",
    choosePhoto: "Khetha isithombe",
    bookingTag: "I-APHOYINTIMENTI YAKHO YOBUHLE",
    bookTitle: "Bhukha isikhathi sakho.",
    bookingIntro: "Landela izinyathelo ezimbalwa ukuze ulungiselele isitayela osithandayo.",
    chooseTreatment: "Khetha ukwelashwa",
    chooseStylist: "Khetha umlungisi",
    dateTime: "Usuku nesikhathi esikhona",
    appointmentDate: "Usuku lwe-aphoyintimenti",
    availableSlots: "Izikhathi ezikhona",
    noSlots: "Azikho izikhathi zalo mlungisi ngalolu suku. Zama olunye usuku.",
    yourDetails: "Imininingwane yakho",
    fullName: "Amagama aphelele",
    email: "I-imeyili (akuphoqelekile)",
    paymentPreference: "Indlela yokukhokha",
    payAtSalon: "Khokha esaluni",
    onlinePayment: "Cela ukukhokha nge-inthanethi",
    onlinePaymentNote: "Ukukhokha nge-inthanethi akukaxhunywa. Imininingwane yekhadi ngeke iqoqwe noma kukhokhiswe.",
    requestBooking: "Cela ukubhukha",
    yourAppointment: "I-APHOYINTIMENTI YAKHO",
    selectTime: "Khetha isikhathi",
    startingFrom: "Iqala ku",
    bookingConfirmation: "Izicelo zokubhukha zidinga ukuqinisekiswa yisaluni.",
  },
  af: {
    home: "Tuis",
    services: "Dienste",
    book: "Bespreek afspraak",
    appointments: "My besprekings",
    offers: "Maak 'n aanbod",
    offersTag: "SHEZZ-STYLAANBIEDINGE",
    offerWelcome: "Jou volgende voorkoms begin met 'n idee.",
    offerWelcomeText: "Het jy 'n styl gesien waarvan jy hou? Deel jou inspirasie en die prys wat jy in gedagte het. Ons span sal daarna kyk en jou antwoord.",
    offerStepDetails: "'n Bietjie oor jou",
    offerPhotoCaption: "Bring jou inspirasie tot lewe",
    offerStyleBadge: "Jou styl, jou manier",
    offerStepStyle: "Vertel ons van jou styl",
    offerStepPrice: "Jou aanbod",
    offerPriceHelp: "Die salon bevestig die finale prys voordat enigiets bespreek word.",
    offerPhotoHelp: "Kies 'n duidelike foto van die styl wat jy wil hê. JPG of PNG, tot 8 MB.",
    offerAsideTitle: "Kom ons skep 'n voorkoms wat by jou pas.",
    offerAsideText: "Jou inspirasie help ons stiliste om die besonderhede te verstaan en jou te vertel wat moontlik is.",
    offerAsideStep1: "Deel 'n foto en beskryf jou styl",
    offerAsideStep2: "Stel 'n prys voor wat vir jou werk",
    offerAsideStep3: "Wag vir die salon se antwoord",
    offerDecisionNote: "Geen afspraak word bespreek totdat jy en die salon die besonderhede bevestig nie.",
    reviewOffers: "Hersien kliënte-aanbiedinge",
    noCustomerOffers: "Geen kliënte-aanbiedinge nog nie.",
    consentRecord: "Toestemming aangeteken",
    rewards: "Belonings",
    consentTitle: "Voordat jy 'n behandeling kies",
    consentIntro:
      "Lees en teken asseblief jou toestemming aan voordat jy 'n behandeling kies.",
    consentHeading: "Digitale konsultasietoestemming",
    consentText:
      "Ek verstaan dat ek die behandeling, moontlike risiko's, alternatiewe en nabehandeling met my stilis sal bespreek voordat dit begin. Ek kan vrae vra, besluit om nie voort te gaan nie, of my toestemming enige tyd terugtrek. Hierdie algemene toestemming vervang nie behandeling-spesifieke toestemming nie.",
    privacyText:
      "Ek stem in dat SHEZZ my naam, kontakbesonderhede, toestemmingswoording, taal en die tyd van my toestemming aanteken om hierdie afspraakversoek te hanteer.",
    consentButton: "Teken toestemming aan en gaan voort",
    consentNote: "Jou toestemming word met die gekose taal en tyd aangeteken. Hierdie demo stoor dit net in hierdie blaaier. Bespreek behandelingspesifieke risiko's en toestemming met jou stilis voor die prosedure.",
    consentName: "Volle naam",
    consentPhone: "Selfoonnommer",
    consentEmail: "E-pos (opsioneel)",
    offersTitle: "Maak 'n styl-aanbod",
    offersIntro:
      "Deel 'n inspirasiefoto, beskryf die styl en bied jou prys aan. Die salon kan jou versoek aanvaar of afwys.",
    offerName: "Jou naam",
    offerPhone: "Selfoonnommer",
    offerDescription: "Beskryf die styl wat jy wil hê",
    offerPrice: "Jou prysaanbod (R)",
    offerPhoto: "Inspirasiefoto",
    offerNote: "Die salon sal jou foto en prys nagaan en die status hier bywerk. 'n Aanbod is 'n versoek, nie 'n bevestigde bespreking nie. Hierdie demo stoor dit net in hierdie blaaier.",
    submitOffer: "Stuur aanbod na salon",
    myOffers: "Jou aanbiedinge",
    accept: "Aanvaar aanbod",
    decline: "Wys af",
    pending: "Wag op salon se antwoord",
    accepted: "Aanvaar",
    declined: "Afgewys",
    noOffers: "Geen aanbiedinge vir hierdie nommer gevind nie.",
    choosePhoto: "Kies 'n prent",
    bookingTag: "JOU SKOONHEIDSAFSPRAAK",
    bookTitle: "Bespreek jou oomblik.",
    bookingIntro: "Volg 'n paar eenvoudige stappe om jou volgende gunsteling voorkoms te bespreek.",
    chooseTreatment: "Kies jou behandeling",
    chooseStylist: "Kies 'n stilis",
    dateTime: "Datum en beskikbare tyd",
    appointmentDate: "Afspraakdatum",
    availableSlots: "Beskikbare tye",
    noSlots: "Geen tye is op hierdie datum by dié stilis beskikbaar nie. Probeer 'n ander dag.",
    yourDetails: "Jou besonderhede",
    fullName: "Volle naam",
    email: "E-pos (opsioneel)",
    paymentPreference: "Betaalvoorkeur",
    payAtSalon: "Betaal by die salon",
    onlinePayment: "Versoek aanlynbetaling",
    onlinePaymentNote: "Aanlynbetaling is nie gekoppel nie. Geen kaartbesonderhede word ingesamel of gehef nie.",
    requestBooking: "Versoek bespreking",
    yourAppointment: "JOU AFSPRAAK",
    selectTime: "Kies 'n tyd",
    startingFrom: "Begin vanaf",
    bookingConfirmation: "Besprekingsversoeke vereis salonbevestiging.",
  },
  st: {
    home: "Lehae",
    services: "Litšebeletso",
    book: "Beha nako",
    appointments: "Linako tsa ka",
    offers: "Etsa tlhahiso",
    offersTag: "LITLHAHISO TSA SETAELE SA SHEZZ",
    offerWelcome: "Ponahalo ea hao e ncha e qala ka mohopolo.",
    offerWelcomeText: "U bone setaele seo u se ratang? Arolelana foto le theko eo u e nahanneng. Sehlopha sa rona se tla e sheba ebe se u araba.",
    offerStepDetails: "Re bolelle hanyane ka uena",
    offerPhotoCaption: "Phethahatsa mohopolo oa hao",
    offerStyleBadge: "Setaele sa hao, ka tsela ea hao",
    offerStepStyle: "Re bolelle ka ponahalo eo u e batlang",
    offerStepPrice: "Tlhahiso ea hao",
    offerPriceHelp: "Salune e tla netefatsa theko ea ho qetela pele ho behoa nako.",
    offerPhotoHelp: "Khetha foto e hlakileng ea setaele seo u se batlang. JPG kapa PNG, boholo bo fihlang ho 8 MB.",
    offerAsideTitle: "Ha re etse ponahalo e u tšoanelang.",
    offerAsideText: "Mohlala oa hao o thusa litsebi tsa rona ho utloisisa lintlha le ho u bolella se ka etsoang.",
    offerAsideStep1: "Arolelana foto 'me u hlalose setaele sa hao",
    offerAsideStep2: "Fana ka theko e u loketseng",
    offerAsideStep3: "Emela karabo ea salune",
    offerDecisionNote: "Nako ha e so behoe ho fihlela uena le salune le netefatsa lintlha.",
    reviewOffers: "Hlahloba litlhahiso tsa bareki",
    noCustomerOffers: "Ha ho litlhahiso tsa bareki hajoale.",
    consentRecord: "Tumello e tlalehiloe",
    rewards: "Meputso",
    consentTitle: "Pele u khetha kalafo",
    consentIntro: "Ka kopo bala 'me u tlalehe tumello ea hao pele u khetha kalafo.",
    consentHeading: "Tumello ea puisano ea dijithale",
    consentText: "Kea utloisisa hore pele kalafo e qala, ke tla buisana le setsebi sa ka ka kalafo, likotsi tse ka bang teng, mekhoa e meng le tlhokomelo ea kamorao. Nka botsa lipotso, ka khetha ho se tsoele pele, kapa ka hula tumello ea ka neng kapa neng. Tumello ena e akaretsang ha e nke sebaka sa tumello e khethehileng ea kalafo.",
    privacyText: "Ke lumela hore SHEZZ e tlalehe lebitso la ka, lintlha tsa puisano, mantsoe a tumello, puo le nako eo ke faneng ka tumello ka eona ho tsamaisa kopo ena ea nako.",
    consentButton: "Tlaleha tumello 'me u tsoele pele",
    consentNote: "Tumello ea hao e tlalehoa ka puo le nako tseo u li khethileng. Demo ena e e boloka ho sebatli sena feela. Buisana le setsebi ka likotsi le tumello ea kalafo e itseng pele e qala.",
    consentName: "Mabitso a felletseng",
    consentPhone: "Nomoro ea selefouno",
    consentEmail: "Imeile (ha e qobelloe)",
    offersTitle: "Etsa tlhahiso ea setaele",
    offersIntro: "Arolelana foto e u susumelitseng, hlalosa ponahalo 'me u fane ka theko ea hao. Salune e ka amohela kapa ea hana kopo ea hao.",
    offerName: "Lebitso la hao",
    offerPhone: "Nomoro ea selefouno",
    offerDescription: "Hlalosa ponahalo eo u e batlang",
    offerPrice: "Theko eo u e sisinyang (R)",
    offerPhoto: "Foto e u susumelitseng",
    offerNote: "Salune e tla hlahloba foto le theko ea hao ebe e ntlafatsa boemo mona. Ho romela tlhahiso ha se ho netefatsa nako. Demo ena e boloka lintlha ho sebatli sena feela.",
    submitOffer: "Romela tlhahiso saluneng",
    myOffers: "Litlhahiso tsa hao",
    accept: "Amohela tlhahiso",
    decline: "Hana",
    pending: "E emetse karabo ea salune",
    accepted: "E amohetsoe",
    declined: "E hannoe",
    noOffers: "Ha ho litlhahiso tse fumanoeng nomorong ena hajoale.",
    choosePhoto: "Khetha foto",
    bookingTag: "NAKO EA HAO EA BOTLE",
    bookTitle: "Beha nako ea hao.",
    bookingIntro: "Latela mehato e seng mekae hore u itokisetse setaele seo u se ratang.",
    chooseTreatment: "Khetha kalafo",
    chooseStylist: "Khetha setsebi",
    dateTime: "Letsatsi le nako e fumanehang",
    appointmentDate: "Letsatsi la kopano",
    availableSlots: "Linako tse fumanehang",
    noSlots: "Ha ho linako tse fumanehang ho setsebi sena letsatsing lena. Leka letsatsi le leng.",
    yourDetails: "Lintlha tsa hao",
    fullName: "Mabitso a felletseng",
    email: "Imeile (ha e qobelloe)",
    paymentPreference: "Mokhoa oa ho lefa",
    payAtSalon: "Lefa saluneng",
    onlinePayment: "Kopa tefo ea inthanete",
    onlinePaymentNote: "Tefo ea inthanete ha e so hokeloe. Lintlha tsa karete li ke ke tsa bokelloa kapa tsa lefisoa.",
    requestBooking: "Kopa ho beha nako",
    yourAppointment: "NAKO EA HAO",
    selectTime: "Khetha nako",
    startingFrom: "E qala ho",
    bookingConfirmation: "Likopo tsa ho beha nako li hloka netefatso ea salune.",
  },
};
const dateISO = (d) => {
  let y = d.getFullYear(),
    m = String(d.getMonth() + 1).padStart(2, "0"),
    a = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${a}`;
};
const onboardingSlides = [
  {
    title: "Book in minutes",
    copy: "Choose your service, stylist, and preferred time in a few taps.",
    accent: "#153baf",
  },
  {
    title: "Style your way",
    copy: "Save your favourite looks, compare services, and send inspiration photos.",
    accent: "#7b3db4",
  },
  {
    title: "Reward every visit",
    copy: "Track completed visits, redeem your loyalty perk, and keep coming back for more glow.",
    accent: "#d08d2b",
  },
];
function App() {
  const [chatOpen, setChatOpen] = useState(false),
    [chatInput, setChatInput] = useState(""),
    [chatBusy, setChatBusy] = useState(false),
    [chatMessages, setChatMessages] = useState([
      {
        role: "assistant",
        content:
          "Hi, welcome to SHEZZ. Tell me what look you have in mind, or ask about services, bookings, and rewards.",
      },
    ]),
    [page, setPage] = useState("home"),
    [menu, setMenu] = useState(false),
    [category, setCategory] = useState("All"),
    [chosen, setChosen] = useState(services[0].id),
    [stylist, setStylist] = useState("s1"),
    [date, setDate] = useState(dateISO(new Date())),
    [time, setTime] = useState(""),
    [customer, setCustomer] = useState(""),
    [phone, setPhone] = useState(""),
    [email, setEmail] = useState(""),
    [account, setAccount] = useState(null),
    [loginRole, setLoginRole] = useState("customer"),
    [authMode, setAuthMode] = useState("login"),
    [authBusy, setAuthBusy] = useState(false),
    [authReturnPage, setAuthReturnPage] = useState("appointments"),
    [loginEmail, setLoginEmail] = useState(""),
    [loginPhone, setLoginPhone] = useState(""),
    [loginName, setLoginName] = useState(""),
    [loginPassword, setLoginPassword] = useState(""),
    [bookings, setBookings] = useState([]),
    [reservedSlots, setReservedSlots] = useState([]),
    [slotsLoading, setSlotsLoading] = useState(false),
    [notice, setNotice] = useState(""),
    [rewardPhone, setRewardPhone] = useState(""),
    [qr, setQr] = useState(""),
    [staffPin, setStaffPin] = useState(""),
    [staffMode, setStaffMode] = useState(false),
    [staffAuth, setStaffAuth] = useState(false),
    [showSplash, setShowSplash] = useState(true),
    [showOnboarding, setShowOnboarding] = useState(() => !load("shezz_onboarded", false)),
    [onboardingStep, setOnboardingStep] = useState(0),
    [language, setLanguage] = useState(() => {
      const savedLanguage = load("shezz_language", "en");
      return ["en", "xh", "zu", "af", "st"].includes(savedLanguage) ? savedLanguage : "en";
    }),
    [activeConsent, setActiveConsent] = useState(null),
    [consents, setConsents] = useState(() => load("shezz_consents", [])),
    [offers, setOffers] = useState(() => load("shezz_offers", [])),
    [offerName, setOfferName] = useState(""),
    [offerPhone, setOfferPhone] = useState(""),
    [offerDescription, setOfferDescription] = useState(""),
    [offerPrice, setOfferPrice] = useState(""),
    [offerImage, setOfferImage] = useState(""),
    [offerImageName, setOfferImageName] = useState(""),
    [consentChecked, setConsentChecked] = useState(false),
    [privacyChecked, setPrivacyChecked] = useState(false),
    [rewardCode, setRewardCode] = useState(""),
    [payment, setPayment] = useState("Pay at salon"),
    [rewardDiscount, setRewardDiscount] = useState(10),
    [installPrompt, setInstallPrompt] = useState(null);
  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("shezz_token");
    if (!token) return;
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Session expired.");
        setAccount({ ...data.user, role: "customer" });
        setCustomer(data.user.fullName || "");
        setPhone(data.user.phone || "");
        setEmail(data.user.email || "");
        setRewardPhone(data.user.phone || "");
        const bookingsResponse = await fetch("/api/v1/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsData = await bookingsResponse.json();
        if (bookingsResponse.ok) setBookings(bookingsData.bookings || []);
      })
      .catch(() => localStorage.removeItem("shezz_token"));
  }, []);
  useEffect(() => {
    let active = true;
    setSlotsLoading(true);
    fetch(`/api/v1/slots?date=${encodeURIComponent(date)}&stylist=${encodeURIComponent(stylist)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load availability.");
        if (active) setReservedSlots(data.reserved || []);
      })
      .catch(() => {
        if (active) setReservedSlots(null);
      })
      .finally(() => {
        if (active) setSlotsLoading(false);
      });
    return () => { active = false; };
  }, [date, stylist]);
  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };
  useEffect(
    () => localStorage.setItem("shezz_consents", JSON.stringify(consents)),
    [consents],
  );
  useEffect(
    () => localStorage.setItem("shezz_offers", JSON.stringify(offers)),
    [offers],
  );
  useEffect(
    () => localStorage.setItem("shezz_language", JSON.stringify(language)),
    [language],
  );
  const t = translations[language] || translations.en;
  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(splashTimer);
  }, []);
  useEffect(() => {
    if (!notice) return;
    let t = setTimeout(() => setNotice(""), 5500);
    return () => clearTimeout(t);
  }, [notice]);
  const finishOnboarding = () => {
    localStorage.setItem("shezz_onboarded", JSON.stringify(true));
    setShowOnboarding(false);
    setPage("home");
  };
  const go = (p) => {
    if (p === "book") {
      setActiveConsent(null);
      setConsentChecked(false);
      setPrivacyChecked(false);
    }
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  function signOut() {
    const token = localStorage.getItem("shezz_token");
    if (token) fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    localStorage.removeItem("shezz_token");
    setAccount(null);
    setBookings([]);
    setStaffAuth(false);
    setStaffPin("");
    setNotice("You have signed out.");
    go("home");
  }
  async function signIn(event) {
    event.preventDefault();
    if (loginRole === "staff") {
      if (staffPin !== "2468") {
        setNotice("Incorrect demo PIN.");
        return;
      }
      setAccount({ role: "staff" });
      setStaffAuth(true);
      setNotice("Welcome to the SHEZZ staff dashboard.");
      go("admin");
      return;
    }
    setAuthBusy(true);
    try {
      const response = await fetch(`/api/auth/${authMode === "register" ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: loginName, email: loginEmail, phone: loginPhone, password: loginPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      localStorage.setItem("shezz_token", data.token);
      setAccount({ ...data.user, role: "customer" });
      setCustomer(data.user.fullName || "");
      setPhone(data.user.phone || "");
      setEmail(data.user.email || "");
      setRewardPhone(data.user.phone || "");
      setStaffAuth(false);
      const bookingsResponse = await fetch("/api/v1/bookings", { headers: { Authorization: `Bearer ${data.token}` } });
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsResponse.ok ? bookingsData.bookings || [] : []);
      setNotice(authMode === "register" ? "Your SHEZZ account is ready." : "Welcome back. Your appointments are ready.");
      go(authReturnPage);
      setAuthReturnPage("appointments");
      setLoginPassword("");
    } catch (error) {
      setNotice(error.message || "Unable to connect to the account service.");
    } finally {
      setAuthBusy(false);
    }
  }
  const service = services.find((s) => s.id === chosen);
  const filtered =
    category === "All"
      ? services
      : services.filter((s) => s.category === category);
  const slots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];
  const staff = stylists.find((s) => s.id === stylist);
  const available = staff.days.includes(daynum(date)) && Array.isArray(reservedSlots)
    ? slots.filter(
        (t) =>
          !reservedSlots.includes(t) &&
          new Date(date + "T" + t) > new Date(),
      )
    : [];
  const clientBookings = bookings.filter(
    (b) =>
      b.phone.replace(/\D/g, "") === rewardPhone.replace(/\D/g, "") &&
      rewardPhone.replace(/\D/g, "").length >= 9,
  );
  const completed = clientBookings.filter(
    (b) => b.status === "Completed",
  ).length;
  const redeemed = clientBookings.filter((b) => b.rewardRedeemed).length;
  const eligible = completed >= 3 * (redeemed + 1);
  const pending = clientBookings.filter((b) => b.status === "Pending");
  const customerOffers = offers.filter(
    (offer) =>
      offer.phone.replace(/\D/g, "") === offerPhone.replace(/\D/g, "") &&
      offerPhone.replace(/\D/g, "").length >= 9,
  );
  async function sendChat() {
    const question = chatInput.trim();
    if (!question || chatBusy) return;
    setChatInput("");
    setChatMessages((v) => [...v, { role: "user", content: question }]);
    setChatBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await r.json();
      setChatMessages((v) => [
        ...v,
        { role: "assistant", content: data.reply || "Please try again." },
      ]);
    } catch {
      setChatMessages((v) => [
        ...v,
        {
          role: "assistant",
          content:
            "I can help with bookings, braids, nails and rewards. Our address is Delft South, Cape Town, 7100.",
        },
      ]);
    } finally {
      setChatBusy(false);
    }
  }
  async function book() {
    if (account?.role !== "customer") {
      setAuthReturnPage("book");
      go("login");
      return;
    }
    if (!activeConsent) {
      setNotice("Please record your consent before selecting a treatment.");
      return;
    }
    if (!customer.trim() || phone.replace(/\D/g, "").length < 9 || !time) {
      setNotice(
        "Please enter your name, valid phone number and an available time.",
      );
      return;
    }
    if (!available.includes(time)) {
      setNotice("That time is no longer available. Please choose another.");
      return;
    }
    const token = localStorage.getItem("shezz_token");
    try {
      const response = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: customer.trim(), phone: phone.trim(), service: chosen, stylist, date, time, payment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save booking.");
      setBookings((current) => [...current, data.booking]);
      setRewardPhone(phone);
      setActiveConsent(null);
      setNotice("Booking request saved to SHEZZ. Your appointment is pending salon confirmation.");
      go("appointments");
    } catch (error) {
      setNotice(error.message || "Could not connect to the booking service.");
    }
  }
  async function generateQR() {
    if (!eligible) {
      setNotice("You need three verified visits to unlock your reward.");
      return;
    }
    let code =
      "SHZ-REWARD-" +
      rewardPhone.replace(/\D/g, "").slice(-6) +
      "-" +
      (redeemed + 1);
    setRewardCode(code);
    setQr(
      await QRCode.toDataURL(code, {
        width: 220,
        margin: 2,
        color: { dark: "#102a80", light: "#ffffff" },
      }),
    );
  }
  async function updateBooking(id, status) {
    try {
      const response = await fetch(`/api/v1/bookings/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("shezz_token")}` },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update appointment.");
      setBookings((v) => v.map((b) => (b.id === id ? { ...b, status } : b)));
      setNotice("Appointment cancelled.");
    } catch (error) {
      setNotice(error.message || "Unable to update appointment.");
    }
  }
  function recordConsent() {
    if (!customer.trim() || phone.replace(/\D/g, "").length < 9) {
      setNotice("Enter your name and a valid phone number to record consent.");
      return;
    }
    if (!consentChecked || !privacyChecked) {
      setNotice("Please confirm both consent statements before continuing.");
      return;
    }
    const consent = {
      id: "SHZ-CONSENT-" + Date.now().toString(36).toUpperCase(),
      name: customer.trim(),
      phone: phone.trim(),
      email: email.trim(),
      language,
      consentText: t.consentText,
      privacyText: t.privacyText,
      recordedAt: new Date().toISOString(),
      version: "1.0",
    };
    setConsents((v) => [...v, consent]);
    setActiveConsent(consent);
    setNotice("Your consent has been recorded. You can now choose a treatment.");
  }
  function handleOfferPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
      setNotice("Choose an image smaller than 8 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setNotice("The image could not be read. Please try another.");
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => setNotice("The selected file is not a readable image.");
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        if (!context) {
          setNotice("Your browser could not prepare this image.");
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let compressed = canvas.toDataURL("image/jpeg", 0.62);
        if (compressed.length > 900_000) {
          compressed = canvas.toDataURL("image/jpeg", 0.42);
        }
        if (compressed.length > 900_000) {
          setNotice("This image is too large to save in the demo. Please choose a smaller image.");
          return;
        }
        setOfferImage(compressed);
        setOfferImageName(file.name);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }
  function submitOffer(event) {
    event.preventDefault();
    if (!offerName.trim() || offerPhone.replace(/\D/g, "").length < 9 || !offerDescription.trim() || Number(offerPrice) <= 0) {
      setNotice("Enter your name, a valid phone number, a description and a price above zero.");
      return;
    }
    if (!offerImage) {
      setNotice("Please add an inspiration photo to your offer.");
      return;
    }
    const offer = {
      id: "SHZ-OFFER-" + Date.now().toString(36).toUpperCase(),
      name: offerName.trim(),
      phone: offerPhone.trim(),
      description: offerDescription.trim(),
      price: Number(offerPrice),
      image: offerImage,
      imageName: offerImageName,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setOffers((v) => [...v, offer]);
    setRewardPhone(offerPhone.trim());
    setOfferDescription("");
    setOfferPrice("");
    setOfferImage("");
    setOfferImageName("");
    setNotice("Your offer has been sent to the salon for review.");
  }
  function updateOffer(id, status) {
    setOffers((v) => v.map((offer) => offer.id === id ? { ...offer, status } : offer));
    setNotice(`Offer ${status.toLowerCase()}.`);
  }
  function redeem() {
    if (!staffAuth) return;
    let match = bookings.filter(
      (b) =>
        b.phone.replace(/\D/g, "") === rewardPhone.replace(/\D/g, "") &&
        b.status === "Completed",
    );
    let used = match.filter((b) => b.rewardRedeemed).length;
    if (
      match.length < 3 * (used + 1) ||
      rewardCode !==
        `SHZ-REWARD-${rewardPhone.replace(/\D/g, "").slice(-6)}-${used + 1}`
    ) {
      setNotice("Invalid or ineligible reward code.");
      return;
    }
    let target = match.filter((b) => !b.rewardRedeemed).at(-1);
    setBookings((v) =>
      v.map((b) => (b.id === target.id ? { ...b, rewardRedeemed: true } : b)),
    );
    setQr("");
    setRewardCode("");
    setNotice("Reward marked redeemed! Apply the discount at checkout.");
  }
  const btn = (label, action, cls = "primary") => (
    <button className={"btn " + cls} onClick={action}>
      {label}
      <ArrowRight size={17} />
    </button>
  );
  if (showSplash) {
    return (
      <div className="splashScreen">
        <div className="splashCard">
          <div className="splashLogo">S</div>
          <span className="kicker light">SHEZZ BEAUTY STUDIO</span>
          <h1>Glow with us.</h1>
        </div>
      </div>
    );
  }
  if (showOnboarding) {
    const slide = onboardingSlides[onboardingStep];
    return (
      <div className="onboardingScreen">
        <div className="onboardingGlow" />
        <div className="onboardingContent">
          <span className="kicker light">WELCOME TO SHEZZ</span>
          <div className="onboardingCard" style={{ borderColor: slide.accent }}>
            <div className="onboardingBadge" style={{ background: slide.accent }}>
              0{onboardingStep + 1}
            </div>
            <h2>{slide.title}</h2>
            <p>{slide.copy}</p>
          </div>
          <div className="onboardingDots">
            {onboardingSlides.map((_, i) => (
              <button
                key={i}
                className={i === onboardingStep ? "active" : ""}
                onClick={() => setOnboardingStep(i)}
                aria-label={`Go to onboarding step ${i + 1}`}
              />
            ))}
          </div>
          <div className="onboardingActions">
            {onboardingStep > 0 && (
              <button className="btn outline" onClick={() => setOnboardingStep((current) => Math.max(0, current - 1))}>
                Back
              </button>
            )}
            <button
              className="btn primary"
              onClick={() =>
                onboardingStep === onboardingSlides.length - 1
                  ? finishOnboarding()
                  : setOnboardingStep((current) => current + 1)
              }
            >
              {onboardingStep === onboardingSlides.length - 1 ? "Get started" : "Next"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="topbar">
        YOUR BEAUTY. YOUR TIME. YOUR SHEZZ. <span>✦</span> BOOKINGS MADE EASY
      </div>
      <header>
        <div className="container nav">
          <button className="brand" onClick={() => go("home")}>
            SHEZZ<span>BEAUTY STUDIO</span>
          </button>
          <nav className={menu ? "open" : ""}>
            {[
              ["home", t.home],
              ["services", t.services],
              ["book", t.book],
              ["appointments", t.appointments],
              ["offers", t.offers],
              ["rewards", t.rewards],
              ...(account?.role === "staff" ? [["admin", "Dashboard"]] : []),
              ["login", account ? "Sign out" : "Sign in"],
            ].map(([p, t]) => (
              <button
                className={page === p ? "active" : ""}
                key={p}
                onClick={() =>
                  p === "login" && account ? signOut() : go(p)
                }
              >
                {t}
              </button>
            ))}
          </nav>
          <button
            className="navcta"
            onClick={() =>
              account?.role === "staff"
                ? go("admin")
                : account?.role === "customer"
                  ? go("appointments")
                  : go("login")
            }
          >
            {account?.role === "staff"
              ? "Dashboard"
              : account?.role === "customer"
                ? "My bookings"
                : "Sign in"} <ArrowRight size={16} />
          </button>
          <label className="languagePicker">
            <span className="srOnly">Language</span>
            <select
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
                if (!activeConsent) {
                  setConsentChecked(false);
                  setPrivacyChecked(false);
                }
              }}
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="xh">isiXhosa</option>
              <option value="zu">isiZulu</option>
              <option value="af">Afrikaans</option>
              <option value="st">Sesotho</option>
            </select>
          </label>
          <button className="hamburger" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {notice && (
        <div className="toast">
          <CheckCircle2 size={18} />
          {notice}
          <button onClick={() => setNotice("")}>
            <X size={15} />
          </button>
        </div>
      )}
      {installPrompt && !window.matchMedia("(display-mode: standalone)").matches && (
        <div className="installBanner">
          <div>
            <strong>Install SHEZZ</strong>
            <span>Keep your salon bookings on your home screen like a mobile app.</span>
          </div>
          <button className="btn primary" onClick={handleInstall}>Install app</button>
        </div>
      )}
      <nav className="mobileNav" aria-label="Main mobile navigation">
        {[
          ["home", "Home"],
          ["services", "Services"],
          ["book", "Book"],
          ["offers", "Offers"],
          ["rewards", "Rewards"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={page === key ? "active" : ""}
            onClick={() => go(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </nav>
      {page === "login" && (
        <main className="container section loginPage">
          <div className="loginLayout">
            <div className="loginWelcome">
              <span className="kicker">YOUR SHEZZ ACCOUNT</span>
              <h1>Good to see you <em>again.</em></h1>
              <p>
                Sign in to keep your appointments and your SHEZZ visits close
                at hand.
              </p>
              <img
                src={pics[1]}
                alt="Braided style created at SHEZZ Beauty Studio"
              />
            </div>
            <section className="loginPanel" aria-labelledby="login-title">
              <h2 id="login-title">{authMode === "register" ? "Create your account" : "Sign in"}</h2>
              <p className="loginSubheading">
                {authMode === "register" ? "Save your bookings and keep your SHEZZ visits together." : "Sign in to manage your appointments."}
              </p>
              <div className="loginRoles" aria-label="Choose account type">
                <button
                  type="button"
                  className={loginRole === "customer" ? "selected" : ""}
                  aria-pressed={loginRole === "customer"}
                  onClick={() => setLoginRole("customer")}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={loginRole === "staff" ? "selected" : ""}
                  aria-pressed={loginRole === "staff"}
                  onClick={() => setLoginRole("staff")}
                >
                  Staff
                </button>
              </div>
              {loginRole === "customer" && (
                <div className="authModes" aria-label="Customer account action">
                  <button type="button" className={authMode === "login" ? "selected" : ""} onClick={() => setAuthMode("login")}>Sign in</button>
                  <button type="button" className={authMode === "register" ? "selected" : ""} onClick={() => setAuthMode("register")}>Create account</button>
                </div>
              )}
              <form className="loginForm" onSubmit={signIn}>
                {loginRole === "customer" ? (
                  <>
                    {authMode === "register" && (
                      <label>
                        Full name
                        <input
                          type="text"
                          autoComplete="name"
                          value={loginName}
                          onChange={(event) => setLoginName(event.target.value)}
                          required
                        />
                      </label>
                    )}
                    <label>
                      Email address
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        required
                      />
                    </label>
                    {authMode === "register" && (
                      <label>
                        Mobile number
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="e.g. 082 123 4567"
                          value={loginPhone}
                          onChange={(event) => setLoginPhone(event.target.value)}
                          required
                        />
                      </label>
                    )}
                    <label>
                      Password
                      <input
                        type="password"
                        autoComplete={authMode === "register" ? "new-password" : "current-password"}
                        minLength={authMode === "register" ? 8 : undefined}
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        required
                      />
                    </label>
                    <small>
                      {authMode === "register" ? "Your password must contain at least 8 characters." : "Your appointments are linked to your account."}
                    </small>
                    <button className="btn primary full" type="submit" disabled={authBusy}>
                      {authBusy ? "Please wait..." : authMode === "register" ? "Create account" : "Sign in"} <ArrowRight size={17} />
                    </button>
                  </>
                ) : (
                  <>
                    <label>
                      Staff PIN
                      <input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter staff PIN"
                        value={staffPin}
                        onChange={(event) => setStaffPin(event.target.value)}
                        required
                      />
                    </label>
                    <small>
                      Demo staff access uses PIN 2468. This is not secure
                      production authentication.
                    </small>
                    <button className="btn primary full" type="submit">
                      Sign in to dashboard <ArrowRight size={17} />
                    </button>
                  </>
                )}
              </form>
            </section>
          </div>
        </main>
      )}
      {page === "offers" && (
        <main className="container section offerPage">
          <section className="offerHero">
            <div className="offerHeroCopy">
              <span className="kicker">{t.offersTag}</span>
              <h1>{t.offerWelcome}</h1>
              <p>{t.offerWelcomeText}</p>
              <div className="offerHeroNote">
                <ShieldCheck size={18} />
                <span>{t.offerDecisionNote}</span>
              </div>
            </div>
            <div className="offerHeroImage">
              <img src={portfolio[5]} alt="Braided style inspiration at SHEZZ Beauty Studio" />
              <div className="offerImageCaption">
                <span className="offerImageMark"><ImagePlus size={18} /></span>
                <span>{t.offerPhoto}<small>{t.offerPhotoCaption}</small></span>
              </div>
            </div>
          </section>
          <div className="offerLayout">
            <form className="formCard offerForm" onSubmit={submitOffer}>
              <span className="offerFormEyebrow">01&nbsp; / &nbsp;{t.offerStepDetails}</span>
              <div className="offerContactFields">
                <label>
                  {t.offerName}
                  <input
                    value={offerName}
                    onChange={(event) => setOfferName(event.target.value)}
                    autoComplete="name"
                    placeholder={t.offerName}
                    required
                  />
                </label>
                <label>
                  {t.offerPhone}
                  <input
                    type="tel"
                    value={offerPhone}
                    onChange={(event) => setOfferPhone(event.target.value)}
                    autoComplete="tel"
                    placeholder="e.g. 082 123 4567"
                    required
                  />
                </label>
              </div>
              <div className="offerDivider" />
              <span className="offerFormEyebrow">02&nbsp; / &nbsp;{t.offerStepStyle}</span>
              <label>
                {t.offerDescription}
                <textarea
                  value={offerDescription}
                  onChange={(event) => setOfferDescription(event.target.value)}
                  rows="3"
                  maxLength="500"
                  placeholder={t.offerDescription}
                  required
                />
              </label>
              <label className="offerUploadLabel">{t.offerPhoto}
                <span className="offerUpload">
                  <span className="offerUploadIcon"><ImagePlus size={21} /></span>
                  <span><strong>{offerImageName || t.choosePhoto}</strong><small>{t.offerPhotoHelp}</small></span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOfferPhoto}
                    required={!offerImage}
                    aria-label={t.offerPhoto}
                  />
                </span>
              </label>
              {offerImage && (
                <div className="offerPreview">
                  <img src={offerImage} alt="Your inspiration for the requested style" />
                  <span>{offerImageName}</span>
                </div>
              )}
              <div className="offerDivider" />
              <span className="offerFormEyebrow">03&nbsp; / &nbsp;{t.offerStepPrice}</span>
              <label>
                {t.offerPrice}
                <span className="offerPriceInput">
                  <span>R</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={offerPrice}
                    onChange={(event) => setOfferPrice(event.target.value)}
                    placeholder="0"
                    required
                  />
                </span>
                <small className="offerFieldHint">{t.offerPriceHelp}</small>
              </label>
              <p className="fineprint">{t.offerNote}</p>
              <button className="btn primary full" type="submit">
                {t.submitOffer} <ArrowRight size={18} />
              </button>
            </form>
            <aside className="offerAside">
              <div className="offerAsidePhoto">
                <img src={portfolio[10]} alt="A finished hairstyle created at SHEZZ" />
                <span><Star size={14} fill="currentColor" /> {t.offerStyleBadge}</span>
              </div>
              <div className="offerAsideCopy">
                <span className="kicker">A LITTLE INSPIRATION</span>
                <h2>{t.offerAsideTitle}</h2>
                <p>{t.offerAsideText}</p>
                <ol>
                  <li><span>1</span>{t.offerAsideStep1}</li>
                  <li><span>2</span>{t.offerAsideStep2}</li>
                  <li><span>3</span>{t.offerAsideStep3}</li>
                </ol>
              </div>
            </aside>
          </div>
          <section className="offerHistory">
            <div className="offerHistoryHeading">
              <div><span className="kicker">{t.offersTag}</span><h2>{t.myOffers}</h2></div>
              <p>{t.offerDecisionNote}</p>
            </div>
            {customerOffers.length ? (
              customerOffers.slice().reverse().map((offer) => (
                <article className="offerCard" key={offer.id}>
                  <img src={offer.image} alt="Customer inspiration" />
                  <div className="offerCardBody">
                    <strong>{money(offer.price)}</strong>
                    <p>{offer.description}</p>
                    <small>{new Date(offer.createdAt).toLocaleString(({ en: "en-ZA", xh: "xh-ZA", zu: "zu-ZA", af: "af-ZA", st: "st-ZA" })[language] || "en-ZA")}</small>
                    <span className={"status " + offer.status.toLowerCase()}>
                      {offer.status === "Pending" ? t.pending : offer.status === "Accepted" ? t.accepted : t.declined}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p className="empty">{t.noOffers}</p>
            )}
          </section>
        </main>
      )}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="container heroGrid">
              <div className="heroCopy">
                <div className="eyebrow">
                  <span className="dot" /> WELCOME TO SHEZZ BEAUTY STUDIO
                </div>
                <h1>
                  Come as you are.
                  <br />
                  <em>Leave glowing.</em>
                </h1>
                <p>
                  Take a breath, settle in, and let us care for your style. From
                  thoughtful braids to beautiful little details, your next SHEZZ
                  moment starts with a warm welcome.
                </p>
                <div className="heroButtons">
                  {btn("Book Your Appointment", () => go("book"))}
                  {btn("Explore Services", () => go("services"), "outline")}
                </div>
                <div className="heroPerks">
                  <span>
                    <CheckCircle2 size={17} /> Made for your texture
                  </span>
                  <span>
                    <CheckCircle2 size={17} /> A little time just for you
                  </span>
                </div>
              </div>
              <div className="heroVisual">
                <img
                  className="heroMainImage"
                  src={pics[1]}
                  alt="Long braids styled at SHEZZ Beauty Studio"
                />
                <img
                  className="heroInsetImage"
                  src={portfolio[14]}
                  alt="Sleek ponytail finished at SHEZZ"
                />
                <div className="floatCard">
                  <div className="circleIcon">
                    <Star size={19} fill="currentColor" />
                  </div>
                  <div>
                    <strong>Your next favourite look</strong>
                    <small>Made with care at SHEZZ</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="featureStrip">
            <div className="container stripGrid">
              <div>
                <CalendarDays />
                <span>
                  <strong>Easy Booking</strong>
                  <small>Your schedule, your choice</small>
                </span>
              </div>
              <div>
                <Scissors />
                <span>
                  <strong>Expert Styling</strong>
                  <small>Beauty crafted with care</small>
                </span>
              </div>
              <div>
                <Gift />
                <span>
                  <strong>Rewards That Matter</strong>
                  <small>Every visit brings more</small>
                </span>
              </div>
              <div>
                <ShieldCheck />
                <span>
                  <strong>Reward Validation</strong>
                  <small>Staff-confirmed redemption</small>
                </span>
              </div>
            </div>
          </section>
          <section className="section container">
            <div className="sectionHead">
              <div>
                <span className="kicker">DISCOVER YOUR NEXT LOOK</span>
                <h2>
                  Services you'll <em>love.</em>
                </h2>
                <p>
                  Find your signature style from our favourite salon services.
                </p>
              </div>
              <button className="textlink" onClick={() => go("services")}>
                View all services <ArrowRight size={18} />
              </button>
            </div>
            <div className="serviceGrid">
              {services.slice(0, 4).map((s) => (
                <ServiceCard
                  key={s.id}
                  s={s}
                  onClick={() => {
                    go("book");
                  }}
                />
              ))}
            </div>
          </section>
          <section className="rewardsBanner">
            <div className="container rewardSplit">
              <div>
                <span className="kicker light">THE SHEZZ LOYALTY CLUB</span>
                <h2>
                  A little love.
                  <br />
                  <em>A lovely reward.</em>
                </h2>
                <p>
                  Every completed visit counts. Visit us three times and unlock
                  a little thank-you from the SHEZZ team.
                </p>
                {btn("Explore Rewards", () => go("rewards"), "white")}
              </div>
              <div className="stampCard">
                <div className="stampTop">
                  <Gift />
                  <span>SHEZZ REWARDS</span>
                </div>
                <h3>3 visits = a treat for you</h3>
                <div className="stamps">
                  {[1, 2, 3].map((n) => (
                    <div key={n}>
                      <Star size={28} />
                      <small>VISIT {n}</small>
                    </div>
                  ))}
                </div>
                <div className="stampBottom">
                  YOUR BEAUTY DESERVES REWARDS <Star size={16} />
                </div>
              </div>
            </div>
          </section>
          <section className="welcomeSection">
            <div className="container welcomeSectionInner">
              <div>
                <span className="kicker">YOUR CHAIR IS WAITING</span>
                <h2>
                  Beauty feels better when you <em>feel at home.</em>
                </h2>
                <p>
                  Come in for a fresh style, stay for the care. We’ll help you
                  find a look that feels like you.
                </p>
                <button className="textlink" onClick={() => go("services")}>
                  Find your look <ArrowRight size={18} />
                </button>
              </div>
              <div className="welcomeImagePair">
                <img src={portfolio[9]} alt="Detailed cornrow styling" />
                <img src={pics[5]} alt="A fresh manicure at SHEZZ" />
              </div>
            </div>
          </section>
        </>
      )}
      {page === "services" && (
        <main className="container section">
          <PageHead
            tag="OUR BEAUTY MENU"
            title={
              <>
                Find your next <em>favourite.</em>
              </>
            }
            subtitle="Browse our services, get inspired, and book your look."
          />
          <div className="chips">
            {["All", "Braids", "Hair", "Nails", "Beauty"].map((c) => (
              <button
                className={category === c ? "selected" : ""}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="serviceGrid">
            {filtered.map((s) => (
              <ServiceCard
                key={s.id}
                s={s}
                onClick={() => {
                  go("book");
                }}
              />
            ))}
          </div>
          <p className="fineprint">
            Prices are illustrative starting prices. Confirm exact pricing and
            service duration with the salon before payment.
          </p>
        </main>
      )}
      {page === "book" && (
        <main className="container section">
          <PageHead
            tag={t.bookingTag}
            title={t.bookTitle}
            subtitle={t.bookingIntro}
          />
          {account?.role !== "customer" ? (
            <section className="formCard bookingAccountGate">
              <UserRound size={30} />
              <h2>Your next appointment starts here.</h2>
              <p>Sign in or create a free customer account to request a booking and keep track of it. You can continue browsing the website without an account.</p>
              <button className="btn primary" onClick={() => { setAuthReturnPage("book"); go("login"); }}>
                Sign in or create account <ArrowRight size={17} />
              </button>
            </section>
          ) : !activeConsent ? (
            <section className="consentPanel" aria-labelledby="consent-title">
              <div className="consentIcon"><ShieldCheck size={30} /></div>
              <h2 id="consent-title">{t.consentTitle}</h2>
              <p className="muted">{t.consentIntro}</p>
              <div className="consentForm">
                <h3>{t.consentHeading}</h3>
                <label>
                  {t.consentName}
                  <input
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  {t.consentPhone}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label>
                  {t.consentEmail}
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                  />
                </label>
                <div className="consentStatement">{t.consentText}</div>
                <label className="consentCheck">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(event) => setConsentChecked(event.target.checked)}
                  />
                  <span>{t.consentText}</span>
                </label>
                <label className="consentCheck">
                  <input
                    type="checkbox"
                    checked={privacyChecked}
                    onChange={(event) => setPrivacyChecked(event.target.checked)}
                  />
                  <span>{t.privacyText}</span>
                </label>
                <p className="fineprint">
                  {t.consentNote}
                </p>
                <button className="btn primary full" onClick={recordConsent}>
                  {t.consentButton} <ArrowRight size={18} />
                </button>
              </div>
            </section>
          ) : (
          <div className="bookingLayout">
            <div className="formCard">
              <h3>
                <span className="step">01</span> {t.chooseTreatment}
              </h3>
              <div className="serviceSelect">
                {services.map((s) => (
                  <button
                    key={s.id}
                    className={chosen === s.id ? "chosen" : ""}
                    onClick={() => {
                      setChosen(s.id);
                      setTime("");
                    }}
                  >
                    <span>
                      {s.name}
                      <small>{s.duration} min</small>
                    </span>
                    <b>{money(s.price)}</b>
                  </button>
                ))}
              </div>
              <h3>
                <span className="step">02</span> {t.chooseStylist}
              </h3>
              <div className="stylistGrid">
                {stylists.map((s) => (
                  <button
                    key={s.id}
                    className={stylist === s.id ? "chosen" : ""}
                    onClick={() => {
                      setStylist(s.id);
                      setTime("");
                    }}
                  >
                    <UserRound size={23} />
                    <strong>{s.name}</strong>
                    <small>{s.role}</small>
                  </button>
                ))}
              </div>
              <h3>
                <span className="step">03</span> {t.dateTime}
              </h3>
              <label className="fieldLabel">{t.appointmentDate}</label>
              <input
                type="date"
                min={dateISO(new Date())}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
              />
              <p className="fieldLabel">{t.availableSlots}</p>
              <div className="slots">
                {slotsLoading ? (
                  <p className="muted">Loading availability...</p>
                ) : !Array.isArray(reservedSlots) ? (
                  <p className="muted">Availability is unavailable right now. Please try again shortly.</p>
                ) : available.length ? (
                  available.map((t) => (
                    <button
                      key={t}
                      className={time === t ? "selected" : ""}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))
                ) : (
                  <p className="muted">
                    {t.noSlots}
                  </p>
                )}
              </div>
              <h3>
                <span className="step">04</span> {t.yourDetails}
              </h3>
              <div className="twoFields">
                <label>
                  {t.fullName} *
                  <input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  {t.offerPhone} *
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                  />
                </label>
              </div>
              <label>
                {t.email}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <h3>
                <span className="step">05</span> {t.paymentPreference}
              </h3>
              <div className="paymentChoices">
                <button
                  className={payment === "                  {t.payAtSalon}" ? "chosen" : ""}
                  onClick={() => setPayment("Pay at salon")}
                >
                  <Wallet /> Pay at salon
                </button>
                <button
                  className={
                    payment === "Online payment requested" ? "chosen" : ""
                  }
                  onClick={() => setPayment("Online payment requested")}
                >
                  <LockKeyhole /> {t.onlinePayment}
                </button>
              </div>
              <p className="fineprint">
                {t.onlinePaymentNote}
              </p>
              <button className="btn primary full" onClick={book}>
                {t.requestBooking} <ArrowRight size={18} />
              </button>
            </div>
            <aside className="summary">
              <img src={service.img} />
              <div className="summaryInner">
                <span className="kicker">{t.yourAppointment}</span>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <div className="summaryLine">
                  <Scissors size={17} /> {staff.name}
                </div>
                <div className="summaryLine">
                  <CalendarDays size={17} /> {fmt(date)}
                </div>
                <div className="summaryLine">
                  <Clock3 size={17} /> {time || t.selectTime} ·{" "}
                  {service.duration} min
                </div>
                <hr />
                <div className="total">
                  <span>{t.startingFrom}</span>
                  <strong>{money(service.price)}</strong>
                </div>
                <small>{t.bookingConfirmation}</small>
              </div>
            </aside>
          </div>
          )}
        </main>
      )}
      {page === "appointments" && (
        <main className="container section narrow">
          <PageHead
            tag="STAY ON TOP OF YOUR PLANS"
            title={
              <>
                My <em>appointments.</em>
              </>
            }
            subtitle="Check the status of your booking or cancel a pending appointment."
          />
          {account?.role !== "customer" ? (
            <div className="empty">
              <p>Sign in or create an account to view your appointments.</p>
              <button className="btn primary" onClick={() => { setAuthReturnPage("appointments"); go("login"); }}>Sign in <ArrowRight size={17} /></button>
            </div>
          ) : <>
          <div className="formCard">
            <label>
              Enter your booking phone number
              <input
                value={rewardPhone}
                onChange={(e) => setRewardPhone(e.target.value)}
                placeholder="e.g. 082 123 4567"
              />
            </label>
          </div>
          {clientBookings.length ? (
            clientBookings
              .slice()
              .reverse()
              .map((b) => (
                <div className="bookingItem" key={b.id}>
                  <div>
                    <small>{b.id}</small>
                    <h3>{services.find((s) => s.id === b.service)?.name}</h3>
                    <p>
                      {fmt(b.date)} at {b.time} ·{" "}
                      {stylists.find((s) => s.id === b.stylist)?.name}
                    </p>
                    <span className={"status " + b.status.toLowerCase()}>
                      {b.status}
                    </span>
                  </div>
                  {b.status === "Pending" && (
                    <button
                      className="btn outline"
                      onClick={() => updateBooking(b.id, "Cancelled")}
                    >
                      Cancel booking
                    </button>
                  )}
                </div>
              ))
          ) : (
            <div className="empty">
              {account?.role === "customer" ? (
                <>
                  <p>No appointments found for this number yet.</p>
                  <button className="textlink" onClick={() => go("book")}>
                    Book your first appointment <ArrowRight size={17} />
                  </button>
                </>
              ) : (
                "Enter your phone number to find your appointments."
              )}
            </div>
          )}
          </>}
        </main>
      )}
      {page === "rewards" && (
        <main className="container section narrow">
          <PageHead
            tag="SHEZZ LOYALTY CLUB"
            title={
              <>
                Your beauty <em>pays off.</em>
              </>
            }
            subtitle="Three verified salon visits unlock a reward. Present your QR code or reward code to our team."
          />
          <div className="rewardPanel">
            <div className="rewardPanelHead">
              <Gift size={32} />
              <div>
                <span>YOUR REWARDS CARD</span>
                <h3>Every visit is worth it.</h3>
              </div>
            </div>
            <label>
              Phone number used for bookings
              <input
                value={rewardPhone}
                onChange={(e) => {
                  setRewardPhone(e.target.value);
                  setQr("");
                  setRewardCode("");
                }}
                placeholder="Enter your phone number"
              />
            </label>
            <div className="progressStamps">
              {[1, 2, 3].map((n) => (
                <div
                  className={completed - 3 * redeemed >= n ? "filled" : ""}
                  key={n}
                >
                  <Star
                    size={25}
                    fill={
                      completed - 3 * redeemed >= n ? "currentColor" : "none"
                    }
                  />
                  <small>VISIT {n}</small>
                </div>
              ))}
            </div>
            <div className="rewardStats">
              <span>
                <b>{completed}</b> verified visits
              </span>
              <span>
                <b>{redeemed}</b> rewards redeemed
              </span>
            </div>
            <p className="rewardMessage">
              {eligible
                ? "Congratulations! Your reward is unlocked. Generate your QR code to redeem at the salon."
                : `${Math.max(0, 3 - (completed - 3 * redeemed))} more verified visit(s) until your next reward.`}
            </p>
            <button
              className="btn primary full"
              disabled={!eligible}
              onClick={generateQR}
            >
              <Gift size={18} /> Generate Reward QR
            </button>
            {qr && (
              <div className="qrBox">
                <img src={qr} alt="Reward QR code" />
                <strong>{rewardCode}</strong>
                <p>
                  Show this to an authorised salon staff member. The staff
                  member must validate and redeem it.
                </p>
              </div>
            )}
          </div>
          <div className="infoBox">
            <ShieldCheck />
            <div>
              <strong>How does verification work?</strong>
              <p>
                Only staff can mark visits completed. After every third verified
                visit, a reward becomes available. Staff must verify and redeem
                your single-use reward code. This prototype uses local browser
                storage; production rewards require a secure server.
              </p>
            </div>
          </div>
        </main>
      )}
      {page === "admin" && (
        <main className="container section">
          <PageHead
            tag="SHEZZ TEAM PORTAL"
            title={
              <>
                Salon <em>dashboard.</em>
              </>
            }
            subtitle="Manage bookings and confirm completed appointments."
          />
          {!staffAuth ? (
            <div className="formCard narrow adminLogin">
              <LockKeyhole size={36} />
              <h3>Staff access required</h3>
              <p>Sign in with your staff PIN to manage appointments.</p>
              <button
                className="btn primary full"
                onClick={() => {
                  setLoginRole("staff");
                  go("login");
                }}
              >
                Continue to staff sign-in <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              <div className="adminStats">
                <div>
                  <CalendarDays />
                  <strong>{bookings.length}</strong>
                  <small>Total bookings</small>
                </div>
                <div>
                  <Clock3 />
                  <strong>
                    {bookings.filter((b) => b.status === "Pending").length}
                  </strong>
                  <small>Pending requests</small>
                </div>
                <div>
                  <CheckCircle2 />
                  <strong>
                    {bookings.filter((b) => b.status === "Completed").length}
                  </strong>
                  <small>Completed visits</small>
                </div>
              </div>
              <div className="adminGrid">
                <div className="formCard">
                  <h3>Manage appointments</h3>
                  {bookings.length ? (
                    bookings
                      .slice()
                      .reverse()
                      .map((b) => (
                        <div className="adminBooking" key={b.id}>
                          <div>
                            <strong>{b.name}</strong>
                            <small>
                              {b.phone} ·{" "}
                              {services.find((s) => s.id === b.service)?.name}
                            </small>
                            <small>
                              {fmt(b.date)} {b.time} · {b.payment}
                            </small>
                            {(() => {
                              const consent = consents.find((item) => item.id === b.consentId);
                              return consent ? (
                                <details className="consentRecord">
                                  <summary>
                                    {t.consentRecord} · {consent.language.toUpperCase()} ·{" "}
                                    {new Date(consent.recordedAt).toLocaleString()}
                                  </summary>
                                  <p>{consent.consentText}</p>
                                  <p>{consent.privacyText}</p>
                                </details>
                              ) : null;
                            })()}
                            <span
                              className={"status " + b.status.toLowerCase()}
                            >
                              {b.status}
                            </span>
                          </div>
                          <div className="adminActions">
                            {b.status === "Pending" && (
                              <button
                                onClick={() => updateBooking(b.id, "Confirmed")}
                              >
                                Confirm
                              </button>
                            )}
                            {b.status === "Confirmed" && (
                              <button
                                onClick={() => updateBooking(b.id, "Completed")}
                              >
                                Complete visit
                              </button>
                            )}
                            {!["Cancelled", "Completed"].includes(b.status) && (
                              <button
                                className="danger"
                                onClick={() => updateBooking(b.id, "Cancelled")}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="muted">No bookings yet.</p>
                  )}
                </div>
                <div className="formCard">
                  <h3>{t.reviewOffers}</h3>
                  {offers.length ? (
                    offers.slice().reverse().map((offer) => (
                      <article className="adminOffer" key={offer.id}>
                        <img src={offer.image} alt="Customer style inspiration" />
                        <div className="adminOfferDetails">
                          <strong>{offer.name} · {money(offer.price)}</strong>
                          <small>{offer.phone}</small>
                          <p>{offer.description}</p>
                          <span className={"status " + offer.status.toLowerCase()}>
                            {offer.status === "Pending" ? t.pending : offer.status === "Accepted" ? t.accepted : t.declined}
                          </span>
                          {offer.status === "Pending" && (
                            <div className="adminActions adminOfferActions">
                              <button onClick={() => updateOffer(offer.id, "Accepted")}>
                                {t.accept}
                              </button>
                              <button
                                className="danger"
                                onClick={() => updateOffer(offer.id, "Declined")}
                              >
                                {t.decline}
                              </button>
                            </div>
                          )}
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="muted">{t.noCustomerOffers}</p>
                  )}
                </div>
                <div className="formCard">
                  <h3>
                    <ShieldCheck size={22} /> Redeem a reward
                  </h3>
                  <p className="muted">
                    Enter the customer's phone and single-use reward code. A
                    verified reward must be available.
                  </p>
                  <label>
                    Customer phone
                    <input
                      value={rewardPhone}
                      onChange={(e) => setRewardPhone(e.target.value)}
                      placeholder="Customer phone"
                    />
                  </label>
                  <label>
                    Reward code
                    <input
                      value={rewardCode}
                      onChange={(e) => setRewardCode(e.target.value)}
                      placeholder="SHZ-REWARD-..."
                    />
                  </label>
                  <button className="btn primary full" onClick={redeem}>
                    Validate & Redeem
                  </button>
                  <p className="fineprint">
                    The demo validates typed QR payloads. Camera scanning and
                    server-side single-use validation are production upgrades.
                  </p>
                  <button
                    className="textlink"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      )}
      <footer>
        <div className="container footerGrid">
          <div>
            <div className="footerBrand">
              SHEZZ<span>BEAUTY STUDIO</span>
            </div>
            <p>
              More than a look. It's a feeling.
              <br />
              Your beauty journey starts here.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            {[
              ["services", "Our Services"],
              ["book", "Book Appointment"],
              ["rewards", "Loyalty Rewards"],
            ].map(([p, t]) => (
              <button key={p} onClick={() => go(p)}>
                {t}
              </button>
            ))}
          </div>
          <div>
            <h4>Get in touch</h4>
            <p>
              <MapPin size={16} /> Delft South, Cape Town, 7100
            </p>
            <p>
              <Phone size={16} /> Contact number to be added
            </p>
            <p>
              <Instagram size={16} /> Follow SHEZZ on social media
            </p>
          </div>
        </div>
        <div className="container footerBottom">
          © {new Date().getFullYear()} SHEZZ Beauty Studio. Made for beautiful
          moments.{" "}
           <span>
             Demo bookings and rewards are saved on this device
           </span>
        </div>
      </footer>
      <button
        className="chatLauncher"
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Open SHEZZ chat"
      >
        <MessageCircle size={24} />
      </button>
      {chatOpen && (
        <div className="chatPanel">
          <div className="chatHeader">
            <div>
              <strong>SHEZZ Beauty Assistant</strong>
              <small>Ask about services, appointments & rewards</small>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
          <div className="chatMessages">
            {chatMessages.map((m, i) => (
              <div key={i} className={"chatBubble " + m.role}>
                {m.content}
              </div>
            ))}
            {chatBusy && <div className="chatBubble assistant">Typing…</div>}
          </div>
          <form
            className="chatForm"
            onSubmit={(e) => {
              e.preventDefault();
              sendChat();
            }}
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask SHEZZ anything…"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={chatBusy || !chatInput.trim()}
              aria-label="Send"
            >
              <Send size={19} />
            </button>
          </form>
          <small className="chatNote">
            AI replies may be inaccurate. Confirm prices and availability with
            the salon.
          </small>
        </div>
      )}
    </>
  );
}
function ServiceCard({ s, onClick }) {
  return (
    <article className="serviceCard">
      <div className="serviceImage">
        <img src={s.img} alt={s.name} />
        <span>{s.category}</span>
      </div>
      <div className="serviceBody">
        <h3>{s.name}</h3>
        <p>{s.desc}</p>
        <div className="serviceMeta">
          <span>
            <Clock3 size={14} /> {s.duration} min
          </span>
          <strong>From {money(s.price)}</strong>
        </div>
        <button onClick={onClick}>
          Book this look <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
function PageHead({ tag, title, subtitle }) {
  return (
    <div className="pageHead">
      <span className="kicker">{tag}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
