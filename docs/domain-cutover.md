# biromd.com GitHub Pages cutover

The repository's GitHub Pages custom domain is configured as `biromd.com`, and
the application builds for the root of that domain.

The domain provider must use DNS records rather than URL forwarding. At
Squarespace Domains:

1. Remove the forwarding rule that redirects `biromd.com` to
   `https://jonbiro.github.io/BiroMD`.
2. Add apex `A` records for `@` pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add a `CNAME` record for `www` pointing to `jonbiro.github.io`.
4. Remove conflicting apex `A`, `AAAA`, `ALIAS`, `ANAME`, or forwarding records.
5. After DNS resolves to GitHub Pages and the certificate is issued, enable
   **Enforce HTTPS** in the repository's Pages settings.

DNS changes can take up to 24 hours to propagate. Verify both the apex and `www`
hostnames before relying on the redirects.

Reference:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
