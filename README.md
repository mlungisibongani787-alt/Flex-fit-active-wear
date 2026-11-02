# Flex Fit Active Wear — WEDE5020 Part 3 POE

**Student:** Phemelo Dithebe  
**Student number:** ST10502650  
**Module:** Web Development (Introduction) — WEDE5020  
**Business:** Flex Fit Active Wear

## Project overview

This is a responsive, multi-page website for Flex Fit Active Wear, a small women's activewear business based in Johannesburg, South Africa. The website is based on the supplied Flex Fit proposal and source website. It retains the business story, product photographs, product names, supplied prices, social media details and original video.

The visual design follows the colour direction in the proposal: neutral/cream, soft blue, peach, black and white. Calibri is the primary typeface.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home page, brand introduction, video showcase, featured products and FAQ accordion |
| `about.html` | Business background, mission, vision and target audience |
| `items.html` | Product catalogue, supplied prices and live product search |
| `images.html` | Product gallery with accessible image lightbox |
| `enquiry.html` | Enquiry form with validation, contextual confirmation and WhatsApp hand-off |
| `contact.html` | Contact information, approximate Johannesburg map, contact form and email-draft preparation |

## Main functionality

- Responsive navigation for desktop, tablet and mobile.
- Active navigation state and dynamic copyright year.
- Product catalogue loads asynchronously from `data/products.json` using the Fetch API (AJAX-style request); search filters catalogue items as the visitor types. Static HTML product cards remain as a fallback.
- FAQ accordion with keyboard-operable buttons and expanded-state attributes.
- Gallery lightbox opens and closes by button, backdrop click or Escape key.
- Enquiry form validates name, surname, email, South African phone number, product choice and message. It displays a tailored confirmation and prepares a WhatsApp message.
- Contact form validates name, email, subject and message. It prepares an email draft in the visitor's default email application. The visitor must add the business recipient address before sending.
- Embedded Google Maps search shows Johannesburg generally. No exact business street address was included in the supplied material, so the map must not be interpreted as a shop pin.
- SEO title, meta description, keywords, semantic headings, image alternative text, descriptive image filenames, robots file and XML sitemap are included.

## Important form and business limitations

This is a front-end introductory web-development project. It does not include a database, server-side form processing, automated email delivery, payment gateway, shopping cart checkout or stock management.

The original project supplied a phone number and Instagram handle, but no business email address or exact street address. The contact form therefore opens an email draft with a blank recipient field; the business email must be added before sending. Enquiries can alternatively be sent through the WhatsApp link. The map shows Johannesburg as a general area, not an exact shop location.

Product prices and sizes are copied from the supplied website content:
- Black two-piece set — R500
- Purple two-piece set — R500
- Short set — R450
- Black jumpsuit — R450

The proposal contains a broader estimated price range. Visitors are advised to confirm current prices, sizes, stock and fabric details with the business before ordering.

## How to run locally

1. Extract the complete ZIP file.
2. Open the `Flex_Fit_Active_Wear_Part3_Complete` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Navigate through all six pages using the main menu.
5. Test the product search, FAQ accordion, gallery lightbox, enquiry form and contact form.

No package installation or build process is required.

## Deployment

The project is a static HTML/CSS/JavaScript website and can be deployed using Netlify or GitHub Pages.

For Netlify:
1. Create a new site and upload the extracted project folder, or connect the GitHub repository.
2. Set the publish directory to `.` (the project root); no build command is required.
3. After Netlify assigns the final public URL, replace `YOUR-NETLIFY-SITE` in both `robots.txt` and `sitemap.xml` with the exact Netlify site name.
4. Commit and deploy the updated files.
5. Open `/robots.txt` and `/sitemap.xml` on the live website to confirm both load correctly.

## Part 3 requirements checklist

- [x] Multiple linked HTML pages.
- [x] Responsive CSS layout and navigation.
- [x] JavaScript interactivity and DOM updates.
- [x] Dynamic product catalogue loaded asynchronously from JSON (AJAX-style Fetch API) with live product search.
- [x] FAQ accordion.
- [x] Gallery lightbox.
- [x] Enquiry form controls and validation.
- [x] Contact form controls and validation.
- [x] Form feedback and message preparation.
- [x] Interactive map embed and external map link.
- [x] SEO page titles and meta descriptions.
- [x] Relevant meta keywords.
- [x] Descriptive image filenames and alt text.
- [x] `robots.txt` and `sitemap.xml` (deployment URL placeholder must be replaced).
- [x] README, changelog and references documentation.
- [ ] Replace the Netlify URL placeholder after deployment.
- [ ] Add the real business email address if the owner wants a pre-addressed email draft.
- [ ] Perform final browser tests on the deployed URL.

## Testing notes

Static checks were performed on the project structure, HTML parsing, local file references, sitemap XML and JavaScript syntax. Manual testing should still be completed in the target browser and on the final deployed URL. External services such as Google Maps, WhatsApp and Instagram require an internet connection.


## Source package note
The supplied archive was named as a Part 3 ZIP but its nested project folder was labelled Part 1. This updated project uses the supplied website content as the starting point. A separate lecturer feedback sheet or Part 2 mark breakdown was not included with the upload.
