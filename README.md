# Splitzy (installable app)

## Put it online with GitHub Pages
1. Create a new repository on github.com (Public), e.g. `splitzy`.
2. Click **Add file → Upload files**, drag in everything from this folder
   (`index.html`, `sw.js`, `manifest.webmanifest`, and the `icons` folder), then **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source = **Deploy from a branch**,
   Branch = **main** and folder **/ (root)**, then **Save**.
4. After about a minute your app is live at `https://YOUR-USERNAME.github.io/splitzy/`.

## Install it on your phone (this is called a PWA)
Open that link in **Chrome** on Android → tap the **⋮ menu → Install app** (or **Add to Home screen**).
Open the app once while online; after that it works fully offline, including receipt scanning.

## Updating
Upload the new `index.html` and change `VERSION` in `sw.js` (e.g. `splitzy-v2`) so phones refresh.
