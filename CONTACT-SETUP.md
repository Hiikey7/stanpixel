Contact form on Vercel
======================

The /api/contact Node.js function sends through smtp.gmail.com:465.
Sender and recipient: stano6823@gmail.com. Reply-To uses the visitor's email.

1. Enable Google 2-Step Verification and create an App Password for this website:
   https://myaccount.google.com/apppasswords
2. In Vercel Project Settings > Environment Variables, add GMAIL_APP_PASSWORD
   with that App Password for the deployment environments you use.
3. Deploy this project with the Other framework preset and repository root as
   its root directory. Vercel installs package.json dependencies automatically.
4. Redeploy after changing environment variables. Test the About page form on
   the deployed HTTPS URL and confirm receipt in Gmail.

Never put the password in HTML, JavaScript served to browsers, or source control.
Opening HTML through file:// does not run the server-side email function.
