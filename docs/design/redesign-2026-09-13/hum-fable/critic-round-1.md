# Critic round 1 · branch `redesign/hum-fable` · 13 Sep 2026

Critic: a fresh Claude Fable 5.1 session, screenshots only (`critic-prompt.md`). Inputs: Home at 1440 (rest and composer focused), 1024, 768, 390, 320x568; Settings 1440; Wallet 1440 (retint only). Note: the 768 screenshot the critic saw predates the balance-tile breakpoint fix committed in `7be933b`.

## Score: 6/10

"The 1440 home is a credible, on-brief Hum execution (off-centre hero, real multi-accent bento, one character moment, cream and soft lift), but the 768 layout clips text, the 320 layout collides with the composer, and the wide screen has a vacant lower third, so it would not leave a studio as is."

## What works (critic)

- Hero at 1440/1024: tight-tracked rounded H1, one-line subtitle, frog top-right with the mono caption reads as an off-centre composition, not a centred stack.
- The four tints are the card identity rather than stripes or gradients; the 390 arrangement is the best-thought-out breakpoint.
- The typed state: cyan focus ring and the send button turning solid is a clean state change; the four-way settings control is unambiguous.

## Punch list and what was done

| # | Finding | Action |
| --- | --- | --- |
| 1 | 768: badge clipped, "Unavailable" truncated, tiles too narrow. Suggests collapsing the sidebar below ~1000px. | Fixed before this round landed: the balance tile is a full-width row until `lg` (`7be933b`). Collapsing the rail is navigation chrome, out of scope; declined. |
| 2 | 320x568: last tile's second line sits under the composer. | Fixed: on short viewports the two small tiles become single rows with the glyph inline, so all four tiles clear the composer. |
| 3 | Vacant lower third at 1440; orphan "Nothing yet" line. | Fixed: the line is gone (no conversations renders nothing), the column widens to `max-w-5xl`, the hero steps up at `lg`, and the block centres vertically in tall panes. The composer stays docked at the bottom per the spec. |
| 4 | "Your money" is the biggest tile with the least content, no affordance. | Fixed in part: a bottom row with the honest line and an arrow to the wallet. A second interactive control inside the link is not valid HTML, so no inner button; the tile stays tall because it is the one money fact on the screen. |
| 5 | Placeholder shapes as icons. | Fixed: three drawn 24px glyphs in the frog's ink (coin, suitcase, bag), filled with the tile's accent. |
| 6 | Top-bar title and content column on two grids. | Declined: the top bar is shared chrome across every page; not in this scope. Noted for a follow-up. |
| 7 | "LOCAL IDENTITY" and "11 stubs" chips read as eyebrows, low contrast. | Declined: these are the loud-stub markers `AGENTS.md` requires. Contrast is a fair point; noted for a follow-up on the chip tokens. |
| 8 | Settings tab row has no active state; inputs have no edge. | Declined: the settings page is out of scope. Noted. |

## AI tells named by the critic

Eyebrow labels in the sidebar and top bar (shared chrome, out of scope); shapes as icons (fixed); uniform radius and one shadow on every container (tiles now lift to `--shadow-float` on hover and the composer keeps its own edge; the rest is shared chrome); the redundant "Nothing yet" line (removed); wallet-page icon-in-circle and centred empty state (wallet not in scope).

## Would the critic stop here? No.
