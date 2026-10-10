# ABHISHEK WORKFORCE SOLUTIONS
## Full Production Deployment, Lead Pipeline & Go-Live Guide

Everything is tested and production-ready in `/dist` for **ABHISHEK WORKFORCE SOLUTIONS** (Govt MSME Reg: `UDYAM-UP-10-0044007`).

---

### 🛠️ Summary of Pre-Launch Fixes Implemented

1. **Vite Multi-Page Build (`vite.config.js`)**:
   - Both [index.html](file:///Users/user/Desktop/AWS/index.html) and [brochure.html](file:///Users/user/Desktop/AWS/brochure.html) are bundled cleanly into `/dist`.
   - The **"Company Profile (PDF)"** button now reliably opens the brochure in production with zero 404s.

2. **Bundled Asset & Image Imports in `app.js`**:
   - Statically imported `factory_workers.jpg`, `packing_team.jpg`, `hero_warehouse.jpg`, and `logo.png`.
   - Switching between "E-Commerce", "3PL Logistics", and "Factory Manufacturing" tabs now seamlessly renders high-resolution photos without broken image paths.

3. **High-Conversion Multi-Tier Lead Capture (No More `mailto:` Drop-off)**:
   - **Form 1: Primary "Hire Manpower" Wizard Modal**: Collects Category, Headcount, Start Date, Company, Contact Person, and Mobile Number.
   - **Form 2: Workforce Estimator Form**: Collects customized shift requirements PLUS Client Name and Phone number. Slider badge and headcount dynamically stay in sync.
   - **Form 3: Candidate Job Registration Form**: Collects Full Name (Aadhaar), Mobile Number, Hub Location, Preferred Role, and Experience.
   - **Form 4: Contact Desk Form**: Full inquiry capturing.
   - **Backend Dispatch**: Form submissions use a free AJAX dispatcher posting directly to **`asri.4247@gmail.com`**.
   - **Confirmation Modal with WhatsApp Quick-Connect**: Upon form submission, users see a branded confirmation dialog with their unique reference ticket (e.g., `AWS-829104` / `JOB-481920`) and a 1-tap **"Chat on WhatsApp Now"** button with their details pre-filled.

4. **SEO & Google Search Discovery**:
   - Added logo favicon `<link rel="icon" ...>` and Apple touch icons.
   - Added `LocalBusiness` / `EmploymentAgency` Schema.org JSON-LD structured data with your MSME registration, contact hotlines (`+91 9196359955` / `+91 7985259352`), and service regions.
   - Generated [`public/robots.txt`](file:///Users/user/Desktop/AWS/public/robots.txt) and [`public/sitemap.xml`](file:///Users/user/Desktop/AWS/public/sitemap.xml).
   - Added Open Graph & Twitter Cards with static social preview banners.

5. **Mobile Navigation UX**:
   - Tapping any navigation link on mobile now automatically collapses the mobile menu.

---

### 📩 Important: One-Time Form Activation (FormSubmit)

When your live website receives its **first form submission**, **FormSubmit** sends a single verification email to **`asri.4247@gmail.com`**:
1. Check your Gmail inbox for an email from FormSubmit.
2. Click the **"Activate Form"** button once.
3. From that moment on, every lead submitted on your website is instantly delivered straight to `asri.4247@gmail.com` in a clean summary table with no spam.

---

### 🚀 1-Click Live Deployment Options (Free SSL Hosting)

Your production-ready static bundle is generated in the [`/dist`](file:///Users/user/Desktop/AWS/dist) folder.

#### Option A: Netlify Drop (Easiest - 1 Minute)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `/Users/user/Desktop/AWS/dist` folder into your browser window.
3. Your website is instantly live with free HTTPS (e.g., `abhishekworkforce.netlify.app`).
4. (Optional) In Netlify settings, connect your custom domain (e.g., `abhishekworkforce.com`).

#### Option B: Vercel (Fastest Terminal Deploy)
Run from the workspace directory:
```bash
npx -y vercel --prod
```

#### Option C: Firebase Hosting
Run:
```bash
npx -y firebase-tools@latest deploy
```

---

### 📍 Client Acquisition & Local Business Launch Steps

To start receiving direct phone calls and contract inquiries from warehouse and plant managers:

1. **Google Business Profile**:
   - Go to [google.com/business](https://www.google.com/business/).
   - Business Name: **Abhishek Workforce Solutions**
   - Category: *Employment Agency* / *Labor Contractor*
   - Phone Numbers: `+91 9196359955` & `+91 7985259352`
   - Registration: `UDYAM-UP-10-0044007`
   - Website URL: Your live domain.
   - Service Area: Pune, Chakan MIDC, Talegaon, Bhosari, Ranjangaon, Bhiwandi.

2. **WhatsApp Business Setup**:
   - Profile Picture: Set to `assets/logo.png`.
   - Business Name: *Abhishek Workforce Solutions*.
   - Auto-Reply greeting: *"Hello! Welcome to Abhishek Workforce Solutions (Govt MSME Reg: UDYAM-UP-10-0044007). How many manpower workers do you require for your warehouse?"*
