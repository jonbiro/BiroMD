# Clinical gallery publication checklist

Clinical image publication has two gates:

1. The production build renders only case IDs listed in the
   `GALLERY_AUTHORIZED_CASE_IDS` GitHub Actions repository variable.
2. Before Next.js builds the site, `scripts/prepare-gallery-assets.mjs` creates
   public, metadata-free image derivatives only for those IDs. After export,
   `scripts/prune-gallery-assets.mjs` rejects unknown IDs, removes any
   non-allowlisted export, and deletes the temporary public working directory.

Use a comma-separated allowlist, for example:

```text
lower-blepharoplasty,eyelid-trauma
```

Before adding a case ID, the practice owner must confirm and retain:

- signed authorization permitting public marketing use of the images and the
  accompanying clinical information;
- confirmation that the authorization covers this website and intended duration;
- approval of the exact procedure description and final composite;
- comparable before-and-after presentation without alteration that distorts the result;
- a removal process for revocation where applicable; and
- final review of the visible results-vary disclosure.

Do not store patient names, record numbers, authorization documents, or other
protected health information in this repository or its variables.

## Repository visibility limitation

The current GitHub repository is public. The source clinical images in
`clinical-assets/gallery/` and older copies in Git history can therefore be
accessed independently of the website allowlist. The export gate prevents an
unauthorized case from being deployed, but it is not a confidentiality control
for the repository itself.

For confidential source storage or stronger revocation, move clinical assets to
private access-controlled storage, make the repository private, remove the
images from public Git history through an approved incident-response process,
and have legal/privacy counsel validate the full workflow. Do not rewrite shared
Git history or change repository visibility without a coordinated migration and
verified deployment plan.
