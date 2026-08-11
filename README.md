# Muneeb Works — Freelance Services Studio Website

A premium, modern, single-page commercial website built for Muneeb Works. Designed to highlight high-end creative ad templates and custom web engineering with maximum quality at optimized project packages.

## Tech Stack
- **Structure**: Semantic HTML5 markup
- **Style**: Custom Vanilla CSS with Design Tokens & Variables (Warm Orange Palette)
- **Logic**: Vanilla ES6 JavaScript (No library bloat)

## Deployment Guides

### Option 1: Drag-and-Drop (Netlify / Vercel)
1. Zip the files or simply drag the project folder (`muneeb-works`) directly into the deployment deck.
2. Netlify: Go to [app.netlify.com](https://app.netlify.com) and drop the folder in the upload zone.
3. Vercel: Run `vercel` in the workspace terminal using the Vercel CLI.

### Option 2: Traditional Shared Hosting (Hostinger, Bluehost, etc.)
1. Log into your hosting control panel (cPanel / hPanel).
2. Open the File Manager and navigate to the `public_html` directory.
3. Upload `index.html`, `robots.txt`, the `css/` directory, and the `js/` directory.

## Action Items & Placeholders to Replace
Search for `[REPLACE WITH REAL LINK]` inside `index.html` to update the following live communication links:
- **Email Studio**: Line 600 - Update the mailto address (`muneeb@example.com`).
- **WhatsApp Chat**: Line 601 - Update with your active WhatsApp Business phone number (`923001234567`).
- **Upwork Profile**: Line 602 - Link your active Upwork freelancer profile.

## Performance & Optimization Notes
- **SSL/HTTPS**: Make sure to check that redirect rules are configured on your host to route all traffic via HTTPS to prevent security flags.
- **Minification**: For production deployment, you can run CSS and JS minification on `css/styles.css` and `js/main.js` to shrink HTTP load weight further.
- **Images**: Keep custom mockups or vector illustrations inside `.svg` format or compress raster images using WebP/AVIF formats to keep total load weight strictly under 3MB.
