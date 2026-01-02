# Email Setup Instructions for RSVP Form

## Option 1: Formspree (Recommended - Already Integrated)

### Step-by-Step Setup:

1. **Create a Formspree Account:**

   - Go to https://formspree.io/
   - Sign up for a free account (free tier allows 50 submissions/month)

2. **Create a New Form:**

   - After logging in, click "New Form"
   - Give it a name like "Wedding RSVP - Michela & Alberto"
   - Copy the form ID

3. **Configure the Form:**

   - In your form settings, set the email where you want to receive RSVPs
   - Enable email notifications
   - (Optional) Set up auto-responder to thank guests

4. **Update the Code:**

   - Open `index.html`
   - Find line 292: `const formId = 'YOUR_FORM_ID';`
   - Replace `'YOUR_FORM_ID'` with your actual Formspree form ID

5. **Test the Form:**
   - Submit a test RSVP
   - Check your email inbox for the notification

### Formspree Free Tier Limits:

- 50 submissions per month
- Basic email notifications
- For more submissions, upgrade to a paid plan

---

## Option 2: EmailJS (Alternative)

If you prefer EmailJS, here's how to set it up:

### Step-by-Step Setup:

1. **Create an EmailJS Account:**

   - Go to https://www.emailjs.com/
   - Sign up for a free account (200 emails/month)

2. **Set Up Email Service:**

   - Go to "Email Services" in dashboard
   - Connect your email (Gmail, Outlook, etc.)
   - Create a service connection

3. **Create an Email Template:**

   - Go to "Email Templates"
   - Create a new template
   - Use this template:

     ```
     Subject: Nuovo RSVP Matrimonio - {{name}}

     Nuovo RSVP Matrimonio Michela & Alberto

     Nome e cognome: {{name}}
     Email: {{email}}
     Telefono: {{phone}}
     Numero di figli: {{children}}
     Allergie/intolleranze alimentari: {{dietary}}
     Messaggio: {{message}}
     Data/Ora: {{timestamp}}
     ```

4. **Get Your Credentials:**

   - Public Key (from Account settings)
   - Service ID (from Email Services)
   - Template ID (from Email Templates)

5. **Update the Code:**
   - Replace the Formspree code with EmailJS code
   - Add EmailJS script: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`
   - Update the sendEmailToSposi function

---

## Option 3: Custom Backend (Advanced)

For unlimited submissions and full control, you can:

- Set up a Node.js backend with Nodemailer
- Use AWS SES (Simple Email Service)
- Use SendGrid or Mailgun API
- Set up a serverless function (Vercel, Netlify Functions)

---

## Current Code Location

The email function is located in `index.html` around line 278:

- Function: `sendEmailToSposi(formData)`
- Form ID placeholder: Line 292
- Called from: Line 350 in the form submission handler

---

## Troubleshooting

1. **Emails not sending:**

   - Check browser console for errors
   - Verify form ID is correct
   - Check Formspree dashboard for submission logs
   - Ensure form is not in test mode (if using Formspree paid plan)

2. **CORS Errors:**

   - Formspree handles CORS automatically
   - If using custom backend, ensure CORS is enabled

3. **Spam Filter:**
   - Check spam/junk folder
   - Add Formspree/EmailJS to your email whitelist
   - Verify sender email in service settings

---

## Recommended: Formspree

Since the code is already set up for Formspree, we recommend using it:

- ✅ Easy setup (5 minutes)
- ✅ Free tier available
- ✅ No backend required
- ✅ Already integrated in your code
- ✅ Reliable and widely used

Just follow Option 1 steps above!
