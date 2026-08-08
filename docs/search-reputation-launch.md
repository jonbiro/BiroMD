# Search and Reputation Launch Checklist

The site supports Google Search Console and Bing Webmaster Tools verification at build time. Account owners still need to create or claim each property, copy the verification token, and submit the sitemap.

## 1. Add Verification Tokens

Create these GitHub Actions repository variables without the surrounding `<meta>` tag:

- `GOOGLE_SITE_VERIFICATION`: the value Google provides for `google-site-verification`
- `BING_SITE_VERIFICATION`: the value Bing provides for `msvalidate.01`

The deployment workflow places the values in the production metadata. After the next successful deployment, complete verification in each webmaster account.

## 2. Submit the Sitemap

Submit `https://biromd.com/sitemap.xml` to both services. The sitemap includes the homepage, About, offices, procedures, symptom guides, referring-clinician page, and authorized gallery case pages.

Request indexing first for:

- `https://biromd.com/`
- `https://biromd.com/about`
- `https://biromd.com/concerns`
- `https://biromd.com/locations/westlake-village`
- `https://biromd.com/locations/rancho-cucamonga`
- Each major procedure and symptom guide

Use each service's coverage and indexing reports to monitor excluded pages, crawl failures, structured-data warnings, and search queries.

## 3. Keep Physician Profiles Consistent

Audit these profiles quarterly and whenever an office, portrait, biography, phone number, or affiliation changes:

- Google Business Profile
- DLV Vision
- Pacific Eye Institute
- Healthgrades
- WebMD Care
- LinkedIn
- Zocdoc

Use the same current portrait, full name, credentials, specialty, BiroMD website, office details, and approved biography wherever the platform allows. The site currently connects verified DLV Vision, Pacific Eye Institute, Healthgrades, WebMD Care, and LinkedIn profiles through physician identity data.

Do not add Zocdoc to the site's identity data until the practice confirms that its affiliation and office information are current. Do not copy patient reviews or publish changing rating totals on BiroMD without permission.

## 4. Review After Launch

- Confirm that every sitemap URL returns `200` and its canonical URL matches.
- Inspect the homepage and major pages in Google Search Console.
- Check Google results for Dr. Nicolas Biro, each office, major procedures, and major symptom phrases.
- Record indexing status and search impressions monthly rather than making repeated cosmetic changes without outcome data.
