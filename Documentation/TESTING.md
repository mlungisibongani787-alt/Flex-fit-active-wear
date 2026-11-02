# Testing checklist

## Static checks completed
- All six HTML pages parse as HTML.
- Local CSS and JavaScript references resolve.
- Local image and video references resolve.
- Navigation targets exist.
- Sitemap XML is well-formed.
- JavaScript syntax check is run with Node.js where available.

## Manual browser tests to complete
- [ ] Home page loads and video controls work.
- [ ] Desktop navigation works.
- [ ] Mobile menu opens, closes and navigates.
- [ ] All six pages open without a 404.
- [ ] Product search filters by product name and colour.
- [ ] FAQ accordion opens and closes.
- [ ] Gallery image opens in lightbox; close button, backdrop and Escape key close it.
- [ ] Enquiry form rejects missing or invalid values.
- [ ] Valid enquiry shows confirmation and WhatsApp hand-off.
- [ ] Contact form rejects missing or invalid values.
- [ ] Valid contact form prepares email draft; add the actual business email before sending.
- [ ] Map opens and shows Johannesburg as a general location.
- [ ] Check layout at desktop, tablet and mobile widths.
- [ ] Check deployed robots.txt and sitemap.xml after replacing the Netlify placeholder.

## Scope note
The project does not send email automatically or store form submissions because no backend/database or business email recipient was supplied. The forms demonstrate front-end validation and message preparation.
