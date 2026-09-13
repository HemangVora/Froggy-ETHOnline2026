# Critic round 2 · branch `redesign/hum-fable` · 13 Sep 2026

Critic: a fresh Claude Fable 5.1 session, screenshots only (`critic-prompt.md`). Inputs: Home at 1440 (rest and composer focused), 1024, 768, 390, 320x568; Settings 1440 (toggle only). Built on commit `11f6f7c`.

## Score: 6/10

"Desktop 1440 and tablet 768 now hold together, but 1024 and 320 both slice the bento behind the docked composer, the 320 strip drops the required Simulated badge, and the balance affordance only exists at desktop."

## What works (critic)

- The off-centre hero landed: left-set H1, the frog as the single character moment, no badge above the headline.
- The balance strip at 768 and 390 is the best-composed element in the set and should be the pattern everywhere.
- Palette discipline: each accent used once as a flat tile fill on cream, no gradients; the typed state reads clearly.

## Punch list and what was done

| # | Finding | Action |
| --- | --- | --- |
| 1 | 1024x768 clips the grid behind the composer. | Fixed: the tall tile is gone, the hero steps down at `lg` and only reaches full size at `xl`, so the column fits a 768-tall pane. |
| 2 | 320x568 loses the Simulated badge and slices the fourth tile. | Fixed: the badge stays at every width (it drops under the label on short phones); the small tiles become rows on short phones so all four clear the composer. |
| 3 | Balance affordance is desktop only. | Fixed: the strip is the pattern at every width, with the arrow after the figure everywhere. |
| 4 | Frog overhangs the grid; mono caption reads as a debug string. | Fixed: the bleed is two to three pixels of the gutter, not the grid; the caption is in the body face at 12px. Copy stays "Nothing needs you." because it is the shared state sentence the mascot uses everywhere, with tests. |
| 5 | Voids inside the wide tiles; suggests three equal tiles. | Fixed in the shape the system allows: a full-width balance strip, then one big and two small starters. Three equal cards in a row is a banned pattern and was not adopted. The composer now follows Home's width so its edges meet the grid. |
| 6 | Icon placement inconsistent; strokes too light. | Fixed: glyph inline with the title on every tile, 2px stroke, accent fill. |

Also from the critic's tells list: tiles are now flat tinted blocks at rest and only lift with a shadow on hover, so the composer is the one edged surface on the screen.

## Would the critic stop here? No.
