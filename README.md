HIGH ROAD V21

V21 adds a lightweight local enquiry tracker.

Replace/upload all files in this package if you want the complete V21 version. Minimum required files:
- script.js
- style.css
- plan.html
- rentals.html
- contact.html
- admin.html

Open admin.html on the same browser/device used to submit enquiries.

Important: this is a local browser tracker, not a cloud CRM. Customer data is not uploaded to a server. Export CSV regularly for backup.


V22: Supabase cloud enquiry storage is enabled. Customer enquiries are written to the Supabase `public.enquiries` table while WhatsApp and the local browser tracker continue to work. The public site is allowed to INSERT enquiries only; viewing/updating enquiries requires authenticated access.
