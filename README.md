# Naomi Cole — coach/consultant landing page template

An executive coaching personal-brand landing page, built as the reusable
base template for future coach/consultant clients.

## Structure
```
index.html      Page markup + SEO meta tags + Person schema
css/style.css   All styles
js/main.js      Mobile nav, FAQ accordion, demo discovery-call form
media/          Headshot photo, favicon.ico, og-image.jpg go here
sitemap.xml     Single-page sitemap (update domain before deploying)
robots.txt      Points crawlers to the sitemap
```

## Reusing this for a new coach/consultant client
1. Find-and-replace: name, credentials, and the
   `--ink / --cream / --rose / --plum / --gold / --stone` color variables
   at the top of `css/style.css` with the new brand palette.
2. Update every URL in the `<head>` (canonical, og:url, og:image,
   twitter:image), `sitemap.xml`, and `robots.txt` to the client's real domain.
3. Update the `Person` JSON-LD block — name, jobTitle, description, sameAs —
   to the new client's details.
4. Swap the abstract portrait SVG for a real headshot via `media/` once
   the client provides one.
5. Rewrite section copy — bio, services/programs, process, testimonials, FAQ.

## SEO baseline included
Meta title/description, canonical URL, robots meta, Open Graph + Twitter
Card tags, Person JSON-LD, sitemap.xml, robots.txt, semantic heading
hierarchy, image-free hero (fast load).

## Portal tool
`testimonial-request-tool.jsx` (delivered separately) is the client-portal
companion tool: paste in details about a client win or session outcome and
get a natural-sounding message the coach can send to request a testimonial.
