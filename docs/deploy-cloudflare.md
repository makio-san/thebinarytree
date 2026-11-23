# Deploying to Cloudflare Pages

The site is the static demo build: `npm run build:demo` writes `dist-demo/`. There is no server, no functions and no environment secret. Cache headers live in `public/_headers`, which the build copies into `dist-demo/`. The Node version is pinned in `.node-version`.

Every push to `main` is one build. The free plan allows 500 builds a month, and the release merger pushes `main` at most once per run (twice a day), so a month uses about 60.

## One time setup

1. Sign in at dash.cloudflare.com (the free plan is enough).
2. **Workers & Pages → Create → Pages → Connect to Git.** Authorise GitHub for the `makio-san` account and give it access to `thebinarytree` only.
3. Build settings:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `npm run build:demo`
   - Build output directory: `dist-demo`
   - Root directory: empty
4. **Save and Deploy.** The first build gives an address like `thebinarytree.pages.dev`. Open it and check the tree, the Agents view and the Blog.
5. **Settings → Builds → Branch control:** set preview deployments to **None**. Agents push a dozen `agents/*` branches a day, and each one would otherwise be a build.
6. **Settings → Builds → Build watch paths:** include `*`, exclude `agents/*` and `.claude/*`. A push that only changes agent reports then costs no build.

## The domain

7. **Custom domains → Set up a custom domain:** add `thebinarytree.io`, then `www.thebinarytree.io`.
   - The root domain needs its DNS on Cloudflare. Cloudflare offers to add the site; follow it, then change the nameservers at the registrar to the two Cloudflare gives you. It usually takes minutes, sometimes a few hours.
   - Before switching, make sure every existing DNS record (mail in particular) has been copied into Cloudflare.
8. When `https://thebinarytree.io` serves the Cloudflare build, remove the site and the domain from Netlify, and uninstall the Netlify GitHub app from the repository, so nothing builds twice.

## Checks after the move

- `https://thebinarytree.io/og-image.png?v=3` loads, so link previews work. Run the address through LinkedIn's Post Inspector once.
- `curl -sI https://thebinarytree.io/assets/<any file>` shows `cache-control: public, max-age=31536000, immutable`.
- The Agents button still turns green when an agent runs (it reads a GitHub gist, which does not depend on the host).

## Other projects on the same Netlify team

The suspension covers every project on the Netlify team, so each one moves the same way: one Cloudflare Pages project per repository, connected from step 2.

| Repository | Build command | Output directory | Notes |
| --- | --- | --- | --- |
| `makio-san/thebinarytree` | `npm run build:demo` | `dist-demo` | Preview deployments None, exclude `agents/*` and `.claude/*` |
| `makio-san/makio.sh` | `npm run build` | `dist` | Preview deployments None. Was `makiosan.netlify.app`; the new address is `<project name>.pages.dev` unless a domain is added |

A project that exists only on Netlify (no repository here) can be moved by downloading its last deploy from Netlify and uploading the folder with **Workers & Pages → Create → Pages → Upload assets**.
