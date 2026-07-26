# Clinical gallery publication checklist

The production build publishes only case IDs listed in the
`GALLERY_AUTHORIZED_CASE_IDS` GitHub Actions repository variable. Use a
comma-separated list, for example:

```text
lower-blepharoplasty,eyelid-trauma
```

Before adding a case ID, the practice owner must confirm and retain:

- a signed authorization permitting use of the patient's images and related
  clinical information for public marketing;
- confirmation that the authorization covers the website and intended duration;
- the exact procedure description shown with the photographs;
- comparable before-and-after presentation, without image alteration that could
  distort the result;
- approval of the final cropped composite and accompanying copy; and
- removal instructions in case the authorization is later revoked where
  applicable.

Do not store patient names, record numbers, authorization documents, or other
protected health information in this repository or in the repository variable.

After changing the allowlist, review the production deployment and confirm the
required results-vary disclosure is visible beside every published case.
