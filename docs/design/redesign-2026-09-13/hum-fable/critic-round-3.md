# Critic round 3 (final) · branch `redesign/hum-fable` · 13 Sep 2026

Critic: a fresh Claude Fable 5.1 session, screenshots only (`critic-prompt.md`). Inputs: Home at 1440 (rest and composer focused), 1024, 768, 390, 320x568. Built on commit `45fc724`.

## Score: 7/10

"The round-2 asks mostly landed (frog inside the grid, body-face caption, balance affordance everywhere, Simulated kept at 320, 1024 no longer clipped) and the bento now reads as Hum rather than a template, but a text collision at 390, a dropped action at 320, and inconsistent vertical rhythm between 1440 and 1024 keep it short of studio-ship."

## What works (critic)

- The off-centre hero with the frog inside the grid's right edge and the caption set small in the body face: the one character moment feels placed, not pasted.
- One big mint tile plus cyan and lavender small tiles under a full-width pear strip, flat at rest: four accents, one system, no three identical cards.
- The composer widened to the grid with a clear focus state.

## Punch list and what was done (one short pass, per the plan's three-round cap)

| # | Finding | Action |
| --- | --- | --- |
| 1 | 390: the Simulated badge runs into "Unavailable". | Fixed: below 640px the badge stacks under the label, and a state word ("Unavailable", "Loading…") steps down to a quiet 20px; a real dollar figure keeps the large size. |
| 2 | Vertical rhythm differs by width; suggests a fixed top pad and docking the composer 24px under the grid. | Fixed in part: the block now has a fixed top pad instead of centring, so the air falls in one place. The composer stays docked at the bottom of the pane: that is the spec the owner approved, so the first message does not jump the layout. Declined. |
| 3 | Small-tile titles wrap with the glyph floating; glyph styles mixed. | Fixed: glyphs top-align to the first line, all three are filled with the tile's deeper accent, and the coin is a solid coin. Titles keep their names because the tests and the intent pin them. |
| 4 | 320: the third tile is under the composer; the placeholder wraps. | Fixed: compact rows on short phones, and the phone placeholder is "Ask Froggy…" (the hint line still names `/`). |
| 5 | Strip says simulated twice; the arrow is unlabelled; "Unavailable" impersonates a balance. | Fixed: the note is "Receipts are still real.", the arrow is labelled "Wallet" from 640px up, and the state word is quiet (see 1). |

## AI tells named by the critic

Redundant labels (fixed), uniform radius on every container (tiles are flat and only the composer carries an edge; radius stays one system on purpose), a state word typeset as a hero number (fixed), an unlabelled arrow (fixed), viewport-centred block (fixed).

## Stop decision

Three rounds is the cap the plan set. The last punch list is addressed above except the composer re-docking, which the approved spec forbids. Final score before this pass: 7/10. The critic's own estimate was that items 1 to 3 would bring it to 8.
