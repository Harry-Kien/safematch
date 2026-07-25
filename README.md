# SafeMatch

A framework proposal for making online dating in Vietnam verifiable, observable
and reportable — presented as a static site with a working prototype flow.

**This is an academic project, not a service.** SafeMatch is not affiliated with
or endorsed by any Vietnamese government body, it does not process real identity
documents, and every name, ID number, case number and figure in the demo is
fabricated for illustration.

## The proposal

Four controls, grouped by when they run:

| Code | When | Control |
| --- | --- | --- |
| A.1 | At sign-up | National ID capture — read the citizen ID chip, check it with the issuing authority |
| A.2 | At sign-up | Face match against the chip portrait, plus three randomised liveness challenges |
| B.1 | While chatting | On-device scam detection — a local model scores the conversation against known fraud patterns |
| C.1 | After harm | One-tap reporting to the cyber security authorities with the evidence attached |

Section 05 of the site sets out the limits these controls operate under —
on-device analysis, badge-not-identity disclosure, biometric destruction after
match, user-controlled evidence release, and an append-only audit log.

## Files

| File | Role |
| --- | --- |
| `index.html` | The proposal — problem, controls, sequence, architecture, safeguards, FAQ |
| `demo.html` | Six-step prototype: ID scan → face match → liveness → credential → risk console → case filing |
| `style.css` | All styling for both pages |
| `script.js` | Navigation, FAQ disclosure and scroll reveal for the proposal page |
| `demo.js` | State machine and simulated timings for the prototype |
| `logo.png` | Mark and favicon |

No build step, no dependencies. Fonts load from Google Fonts and fall back to
Georgia / Segoe UI / Consolas when offline.

## Running it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8080
```

## Deploying

The site is static with `index.html` at the root, so Vercel needs no
configuration — import the repository at [vercel.com/new](https://vercel.com/new)
and deploy.

## Before presenting this as evidence

Two figures in the "problem" section are marked *illustrative* and are
placeholders. Replace them with cited statistics — for example from the Ministry
of Public Security or VNCERT/CC — before using this work to make a factual
claim.
