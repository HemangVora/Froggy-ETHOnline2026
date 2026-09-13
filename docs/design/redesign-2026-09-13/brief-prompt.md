# Froggy Home redesign: the brief as a prompt

Written 13 Sep 2026 so the design can be rebuilt or reviewed by anyone from one page.

You are redesigning the home screen of Froggy, a web app described as "a wallet for your agents."

## What Froggy is

A person adds a little money, tells Froggy (an AI agent drawn as a friendly green frog) to do a task, and watches the agent do it in a shared browser they can take over at any moment. Every payment the agent makes is checked against spending rules the person set, and every payment leaves a receipt. The app never uses crypto words on screen: money is dollars with two decimals, payments are receipts, refusals are "declined" with a reason. In demo mode every integration is a stub, so the balance reads "Unavailable" and is labelled "Simulated"; that honesty must stay visible.

## Audience and job

A non-technical person who has agreed to let an AI spend a little of their money and wants to feel it is safe, watchable and honest. The home screen has one job: start a task, by typing into the composer or by tapping one of three starters (Find tokens, Plan a trip, Find a deal). The balance and recent conversations support that job.

## Visual register: Hallmark "Hum" (the theme behind the "Bubble, guided sourdough" example)

- Cream paper, never white: `oklch(97% 0.012 95)`. Ink, never black: `oklch(20% 0.012 250)`.
- Five accents, each owning its own surface, never blended into gradients: pear `oklch(86% 0.18 95)`, mint `oklch(80% 0.16 150)` as the primary action colour, cyan `oklch(66% 0.18 235)`, lavender `oklch(74% 0.16 305)`, coral `oklch(68% 0.24 18)` reserved for the one emphatic moment.
- Type: Plus Jakarta Sans for display and body (display extra-bold, tight tracking), JetBrains Mono only for machine facts on receipt stubs. No serif, no italic headings, no all-caps eyebrow labels.
- Big rounded everything: cards 20 to 24px, actions are pills, inputs 12px.
- Push-button physics: a solid darker-accent bottom edge (`box-shadow: 0 4px 0`), lift 2px on hover, press down 3px on click. No `scale()`, no glow, no blur shadow at rest.
- One drawn character moment: the frog (the existing SVG mark with poses) with a cream speech bubble that carries the state sentence ("Nothing needs you."), leaning in when the composer takes focus.
- One coral four-point star bursts from the send button when a task starts. All motion collapses under `prefers-reduced-motion`.

## The Home composition (first use, signed in)

1. Off-centre hero: the headline "Where should Froggy go today?" set large at left, a one-sentence lede under it, the frog and its speech bubble at right. Never a centred stack, never a badge above the headline.
2. The balance as a receipt: a full-width solid pear ticket with a dashed perforation and edge notches. Body: "Your money", a "Simulated" chip when stubbed, the figure at right (a real dollar figure large; a state word like "Unavailable" quiet). Stub in mono: the receipt count ("No receipts yet") on the left, "Wallet ↗" on the right. The whole ticket links to the wallet.
3. Three starters as toy tiles: one big mint tile (Find tokens) and two small ones (cyan Plan a trip, lavender Find a deal), each with a hand-drawn glyph in the frog's ink filled with the tile's deeper accent (a coin, a suitcase, a bag) inline with a bold title and a one-line description. Never three identical cards.
4. A numbered rail of the four stages a task goes through, on a dashed line: 1 Ask, 2 Watch it live, 3 Approve each spend, 4 Keep the receipt. Pear number discs, one colour. Shown from tablet width up, anchored just above the composer.
5. Recent conversations as one dense strip with dashed dividers, only when there are any. Empty means nothing is drawn, not a sentence.
6. The composer stays docked at the bottom of the pane and widens to the grid on this screen. The send button is a mint push button.

## Responsive rules

- 320x568 must show the headline, the ticket and all three starters above the composer: the ticket collapses to two rows, tiles become single rows, the frog and lede hide.
- 390: the headline spans the full width, the frog sits beside the lede, tiles are title-only.
- 768 and 1024: nothing may tuck under the docked composer; tiles go title-only at the 1024 tier.
- 1440: the full composition with the rail.
- No horizontal scroll anywhere, no clickable text wrapping to two lines, visible keyboard focus (cyan ring), every interactive element styled for hover, focus, active and disabled.

## Technical boundaries

React 19, Vite, Tailwind 4, an ejected shadcn component set. Hum is a third theme selectable next to Passbook (light) and Lilypad (dark), and the default; it is implemented as a token block under `data-theme="hum"` so every existing component picks it up. Only semantic tokens in components, no hex literals. Accessible names the tests pin: one h1 "Where should Froggy go today?", a link "Your money", a link "Find tokens", buttons "Plan a trip" and "Find a deal", a region "Use Froggy here", a "Send" button, and the frog mark with `data-pose="idle"`.

## What to avoid (these read as generated)

Centred hero stacks, badge-above-headline, three equal cards in a row, accent stripes on card edges, gradients between accents, glows, emoji as icons, uniform radius plus one shadow on everything, eyebrow labels on every section, invented numbers or testimonials, decorative containers with nothing in them, redundant labels saying the same fact twice.

## Done means

It looks like a made thing from a studio that does warm consumer software, not a template: a person would remember the receipt ticket and the talking frog. A screenshot-only critic scoring it against "how a top consumer studio would execute Hum for this product" gives it 9/10.
