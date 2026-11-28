# DocVault

**Your Documents. One Secure Place.**

DocVault is a mobile-first document organizer planned as an installable web app (PWA), with a path to an Android build.

## Product goals
- Organize personal, education, finance, and vehicle documents.
- Scan documents and save them as PDFs.
- Search, preview, rename, and export files.
- Set expiry reminders for licences, insurance, passports, and other time-sensitive records.
- Work offline where supported.
- Protect sensitive files with encryption and an app lock.

## Initial project structure

```
docvault/
  README.md
  index.html
  manifest.webmanifest
  service-worker.js
  assets/
    icons/
    images/
  src/
    app/
    components/
    pages/
    services/
    styles/
    utils/
```

## Security principles
- Do not upload documents to a server by default.
- Encrypt sensitive data at rest; do not treat browser storage alone as secure.
- Never store PINs or encryption keys in plain text.
- Make backup/export behavior explicit to the user.
- Clearly explain browser/device limitations for biometric authentication and offline storage.

## Build phases
1. Responsive app shell, navigation, dashboard, and document categories.
2. Local document import, preview, search, and organization.
3. Scanner/PDF workflow and expiry reminders.
4. Offline PWA installation and app icons.
5. Security review, accessibility, testing, and Android packaging.

## Status
Workspace created. Application implementation has not started yet.
