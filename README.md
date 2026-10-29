# StudyOS — project showcase

An independent English-language showcase for the IB study planner. A student project website with a Swiss-inspired grid, a warm-white reading area, a compact ash-grey navigation header drawn from the planner, four pages and a small illustrative review interaction.

## Open locally

Double-click `index.html`. All site assets are included, and the pages use relative paths. No installation, build, API key or database is needed.

For a local HTTP preview, run this command from this folder:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. Stop the preview with Control+C.

## Upload to GitHub Pages

1. Extract the ZIP and create a new GitHub repository, for example `studyos-showcase`. A public repository works with GitHub Free.
2. Upload the **contents** of this folder to the repository root. `index.html` must be at the root, beside `product.html`, `development.html`, `source.html` and the `assets` directory. Do not upload just the ZIP, and do not place everything inside another enclosing folder.
3. Commit the files to `main`.w
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/(root)**, then save.
6. Wait for the deployment to complete. Pages will show the published address, normally `https://YOUR-USERNAME.github.io/studyos-showcase/`.

The `.nojekyll` file is included for static publishing. Some browser upload interfaces hide dotfiles; these pages do not depend on Jekyll features or underscore-prefixed asset paths.

Official publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Files

- `index.html` — overview, planning illustration and product introduction.
- `product.html` — functions, an interactive review example and a development screenshot.
- `development.html` — design decisions, simplified architecture and data diagrams, building plan.
- `source.html` — frontend/backend GitHub links and an accessible guide to the code.
- `404.html` — fallback page.
- `assets/styles.css` — shared styling, responsive layouts, reduced-motion and print styles.
- `assets/main.js` — mobile menu, screenshot dialog and illustrative review example.
- `assets/favicon.svg` — project icon.
- `assets/images/` — bundled development screenshots.

## Editing the content

The page text is directly in each HTML file. Each page includes its own header/footer so the entire site works when opened from disk. Update shared navigation on all pages if adding a new page. Colours and type sizes are in `assets/styles.css`.

Source repository URLs appear in `source.html`:
- https://github.com/Dankey-py/sp
- https://github.com/Dankey-py/spback

These URLs were taken from local Git remotes. Verify public access and publish the intended code revision before sharing the showcase with reviewers.

## Evidence and scope

This package is separate from the StudyOS application. It neither starts nor modifies the frontend or backend, and makes no AI/API requests. The full planner requires its own server; GitHub Pages hosts this static showcase.

The review interaction uses illustrative data held only in the current page. Reset or reload clears it; confirmation does not save to the real planner.

Screenshots:
- `overview.png`: development capture from 8 October 2026.
- `plan-review.png`: development test-workspace capture from 28 October 2026.

A prominent Beta notice appears at the top of each page. Screenshot captions describe the function, while this README retains capture provenance. Screenshots are displayed in their original colours. The compact grey header and restrained warm accents connect this showcase to the application; the reading area remains light for longer descriptions. They represent dated development interfaces. Features and descriptions were checked against the local source; current local code may differ from the GitHub version. The simplified database map omits authentication, conversation and other supporting tables.

The site uses short first-person project descriptions. It contains no fabricated testimonials, adoption figures, grade improvements or personal anecdotes. Proposed evaluation work is labelled as proposed. The descriptions move from a concrete planning problem to the feature, the reason for the decision, and what still needs evaluating.

## Checks completed

- All four main pages inspected at 320px, 390px and 1280px viewport widths; no document-level horizontal overflow.
- Four icon navigation links checked on desktop and mobile.
- Review example: edit, confirm, reset and blank-name rejection exercised.
- Screenshot dialog opening and closing exercised.
- JavaScript syntax and local asset/link targets checked.

External AI, email and the full planner were not tested as part of this static-site delivery. No GitHub deployment was performed.

CSS and JavaScript URLs contain content-based version parameters. When changing either asset, update the corresponding version in all HTML pages to avoid mixed-version browser caches.
