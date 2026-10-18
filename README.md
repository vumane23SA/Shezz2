# SHEZZ Beauty Studio — installable salon web app (PWA)

Royal-blue and white React/Vite app with **all 6 original photos plus 18 photos from the latest WhatsApp ZIP**, Delft South, Cape Town, 7100 address, service gallery, stylist/time-slot selection, demo bookings, demo loyalty rewards, and a chat assistant.

## Run locally

Install Node.js 20+ and run:

```sh
npm install
npm run dev
```

For customer accounts and saved appointments, install MySQL 8 and initialize the schema with `mysql -u root -p < mysql.sql`. Copy `.env.example` to `.env` and set `MYSQL_PASSWORD` to your local MySQL root password. Then run `npm run build` and `npm start` for the full site and API. The Vite development server serves only the frontend. Keep `.env` private and never commit database credentials.

The app is configured to run on port 3000 locally, so use http://localhost:3000 for the live app. **For the chatbot endpoint, use the production server**:

```sh
npm run build
npm start
```

Then open http://localhost:3000. Without an API key, the chatbot answers from a built-in salon FAQ. To enable actual AI-generated responses, set `OPENAI_API_KEY` **on the server** (not in React or in the browser). The server uses the OpenAI Responses API and falls back to FAQ answers if the API is unavailable. Chatbot conversations are sent to the configured AI provider when enabled. Add appropriate consent and privacy notices before collecting customer information.

## Deploy on Render

1. Create a GitHub repository containing the files in this folder.
2. In Render, create a new **Web Service** from the repository or use the included `render.yaml` Blueprint.
3. Build command: `npm install && npm run build`; start command: `npm start`.
4. Set `MYSQL_HOST`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD` in Render to point to an externally hosted MySQL 8 database, and apply `mysql.sql` to it. Optionally add `OPENAI_API_KEY`. Never commit credentials or API keys.
5. Open the HTTPS URL supplied by Render. In supported browsers, choose **Install app / Add to Home Screen**. iPhone Safari: Share > Add to Home Screen.

The manifest, service worker, app icons and standalone display mode are included. Installation requires HTTPS (or localhost) and depends on browser support. Offline support is limited to previously visited pages/assets; appointments and chat require connectivity.

## Features and IMPORTANT limitations

- Responsive royal-blue and white layout; 24 supplied photos, including 18 new portfolio images.
- Customers can send the salon a hairstyle inspiration photo, description, and price offer; staff can accept or decline offers from the dashboard.
- Digital consultation and data-use consent is required and recorded before treatment selection, including consent wording, language, and timestamp. Customers can use English, isiXhosa, or Afrikaans in the booking, consent, and offer flows.
- Salon address shown as **Delft South, Cape Town, 7100**. Exact street address and phone number were not provided.
- Services, stylist names, prices, durations, and working days are **examples** and need salon confirmation.
- Chat assistant: real server-side AI when configured; otherwise FAQ fallback.
- Customer registration, login sessions, appointment availability, bookings, and cancellation use MySQL. Passwords are hashed and session tokens are stored hashed in MySQL. The staff demo PIN `2468`, reward progress, QR codes, and redemption remain browser-only demonstrations.
- Offers, customer images, and consent records also use **browser localStorage only**. They are not shared with staff on other devices and are not suitable for storing real customer consent or photos until server-side storage, access controls, and privacy safeguards are implemented.
- The online-payment choice is a **request only**. No payment provider is integrated; the app **cannot collect or verify real payments**.
- Demo loyalty stamps require staff-marked visits in that same browser, but are **not tamper-resistant**. Do not issue discounts based on demo rewards.
- Do **not** use the current version for live customer bookings, personal data, payment collection, or real loyalty redemptions.

## Production work required before commercial launch

1. Replace the local MySQL setup with a managed production database and add email verification / password reset, with consent and POPIA-compliant privacy notices.
2. Build authenticated staff roles, secure password reset and audit logging; remove the public demo PIN.
3. Persist bookings server-side and atomically prevent stylist/time overlap for the **full service duration**, not just the start time.
4. Record verified completed visits in a tamper-resistant server ledger; generate cryptographically random expiring single-use QR tokens; validate and redeem atomically with staff authentication.
5. Connect a South African supported payment provider (e.g. PayFast, Peach Payments or Paystack) using **hosted checkout and verified server-to-server webhooks**. Never process card numbers yourself. Provider accounts, credentials and business verification are required.
6. Configure real stylist schedules, service prices, refund/cancellation policy, address, phone, domain and notification service.

**This package is deployable and installable as a demonstration PWA, not a fully production-secure booking and payments platform.**

## Backend notes

Customers can browse the site without an account. `mysql-api.mjs` handles registration, login, session validation, public availability, and appointment persistence; `mysql.sql` creates the schema. Set database credentials in an uncommitted `.env` file. Offers, consent records, rewards, and staff access are still demonstrations and are not persisted to MySQL.

Set `OPENAI_API_KEY` only in the server environment to enable the live AI assistant. Without a key, the chatbot uses the built-in FAQ. Never place private keys in the frontend or commit them to GitHub.
