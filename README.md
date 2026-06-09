# STACKLAB — Interactive Compound Stack Visualizer

A fully static, client-side tool to visualize how peptide / supplement / compound stacks connect to target organs — with **live synergy (green)**, **clash (red)**, and **organ-stress** mapping. No backend, no accounts, no data leaves the browser.

## Features
- **Live network graph** (vis-network): compounds → target organs, with synergy/clash edges drawn in real time (clash edges are tiered — critical = bold, redundant = faint).
- **138-compound open database** across peptides, supplements, and oral/Rx — each with route, half-life, bioavailability, evidence grade, target-organ effects, dosing, blood-marker impact, cautions, cofactors, and named references.
- **Weighted stack intelligence** (the Live Blueprint):
  - **Stack-balance summary** — a support↔stress meter, peak-loaded organ, critical-clash & not-reversible counts.
  - **Organ-load heatmap** — weighted bars (a negative hit and severe wording weigh more than a mild caution), so four hepatotoxic items read "Liver: HIGH", one mild item reads "LOW".
  - **Net-balanced polypharmacy flags** — each axis (glucose, cardiac/HR-BP, sedation, stimulation, GH/IGF, bleeding) is scored by **signed magnitude**: things that raise an axis cancel things that lower it, so a stack that "balances out" is shown as balanced rather than double-flagged.
  - **Tiered clashes** — CRITICAL (e.g. additive hypoglycemia) vs CAUTION vs REDUNDANT render distinctly and sort by severity.
  - **Redundancy consolidation** — for redundant pairs it tells you which to **keep** (stronger evidence) and gives a one-click **drop** button for the other.
  - **Labs to monitor** — aggregates each compound's blood-marker impact into the panel of tests to run (IGF-1, ALT, lipids, hematocrit, estradiol…).
  - **Clean recommendations** — suggests supportive partners (incl. **supplements for each peptide**) and **never suggests anything that clashes with or is redundant to the current stack**.
- **Reversibility tags** — every compound is flagged `reversible` / `caution` / `not fully reversible`, with a **♻ reversible-only filter**.
- **Evidence filter** — narrow the list to A / A–B / A–C grades.
- **Food / drug interactions** — alcohol, grapefruit/CYP, caffeine, nitrates, anticoagulants, etc., surfaced both per-compound and as an aggregated **Food / Drug Watch** for the whole stack (danger-first).
- **Research links** — each compound lists real named trials/sources and an auto-generated **PubMed search** link (no fabricated DOIs).
- **Goal presets** — Longevity, General Health, Cognitive, Fat Loss, Muscle, Hormonal.

## Files
- `index.html` — the whole app (HTML + Tailwind via CDN + vanilla JS + vis-network graph).
- `compoundsData.js` — the editable, crowdsource-friendly compound database (138 entries).

## Run locally
Just **double-click `index.html`** — it works straight off the filesystem (`file://`), no server needed. (PubMed links open in a new tab.)

## Deploy (free)
**Live:** https://s8nm.github.io/stacklab/

- **GitHub Pages:** push this folder to a repo → Settings → Pages → deploy from branch (root). Done.
- **Vercel / Netlify:** drag the folder onto the dashboard, or `vercel`/`netlify deploy`. It's a static site, no build step.

## Add / edit compounds
Open `compoundsData.js` and add an object to `window.COMPOUNDS` (helpers `O/S/C/FD` keep it compact):
```js
{
  id:"my-compound", name:"My Compound", category:"peptide", // 'peptide' | 'supplement' | 'oral'
  route:"SubQ (weekly)", class:"...", halfLife:"...", bioavailability:"...",
  reversible:"yes",      // 'yes' | 'caution' | 'no'
  evidence:"B",          // 'A' | 'B' | 'C' | 'D' | 'X'
  desc:"...",
  targetOrgans:[ O("Liver","positive","note") ],   // effect: positive | caution | negative
  synergies:[ S("other-id","why") ],
  clashes:[ C("other-id","risk") ],
  bloodMarkerImpact:["..."],
  foodDrug:[ FD("Alcohol","worse GI + hypo risk") ],
  dosingInfo:"...", cautions:["..."], cofactor:null,
  refs:["SURMOUNT-1, NEJM 2022"]                    // accurate named trials only — the app builds the PubMed link
}
```
`organ` must be one of `window.ORGANS`. Add goal presets in `window.GOAL_PRESETS`.

### Validate after editing
```bash
node -e 'global.window={};require("./compoundsData.js");
const{COMPOUNDS,ORGANS}=window;const ids=new Set(COMPOUNDS.map(c=>c.id));
COMPOUNDS.forEach(c=>[...c.synergies,...c.clashes].forEach(x=>{if(!ids.has(x.id))console.log("BAD ref",c.id,"->",x.id)}));
console.log(COMPOUNDS.length,"compounds OK")'
```

## ⚠ Disclaimer
Education & peer-discussion only — **not medical advice**. Many entries are investigational or prescription-only. References and PubMed links are starting points; verify primary sources and consult a qualified clinician.
