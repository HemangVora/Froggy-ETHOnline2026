# 003 · Froggy home redesign: Hum ("Bubble") theme, two builds, two deploys

Written 13 Sep 2026. Status: **reviewed by Claude Fable 5.1 against the code (section 9), awaiting owner approval.** The owner dropped the Codex review step on 13 Sep because the Codex account was usage-limited.

## 0. What this plan is

Redesign the Froggy home experience so it reads as a made, warm consumer product instead of a generic chat shell, using:

1. **Hallmark** (`nutlope/hallmark`, v1.1.0) as the design discipline. Verb: `hallmark redesign apps/web (home scope) --mood hum`. Theme: **Hum**, the catalog theme behind the "Bubble, guided sourdough" example (`site/examples/hum-07`). The user calls this the "bubble-like theme".
2. **Lenny's Newsletter, "How to turn your AI into a world-class designer"** (Anshu Chimala) as the process: seed-string variety, ambitious briefs, a screenshot-only design critic scored out of 10, cut what doesn't add value, remove AI tells.
3. **Two independent builds of the same spec** on two branches: one by Claude Fable 5.1 in Claude Code, one by Codex. Both deployed to Railway. The owner compares links and screenshots.

Out of scope: any change to money, mandates, sockets, the agent loop, or `packages/wallet` / `packages/browser` / `packages/domain`. This is a visual and interaction layer change inside `apps/web` and `packages/ui/src/styles`.

## 1. Where the app is today (pre-flight, per Hallmark step 0)

| Signal | Finding | Where |
| --- | --- | --- |
| Framework | Vite 8 + React 19 + TanStack Router, Bun workspace, Tailwind 4 with `@theme inline` | `apps/web/package.json`, `packages/ui/src/styles/globals.css` |
| Font stack | Manrope Variable (display + body), IBM Plex Mono (labels, `--machine`) | `packages/ui/package.json` L21-22, `globals.css` L660-662 |
| Palette | "Passbook" light system: ground `#f5f6f2`, card `#fcfdfb`, forest green primary `#2f7a4c`, agent amber `#9a6314`, human blue `#3866d6`, decline red `#b3402f`, lime `#b4e04a` accent, frog skin `#4f9e63` | `globals.css` `:root` |
| Motion | `motion` 13 installed; tokens `--motion-feedback 125ms`, `--motion-panel 200ms`, `--ease-out`, `--ease-drawer`; keyboard-vs-pointer motion variants | `globals.css`, `apps/web/src/lib/motion.ts` |
| Spacing / radius | `--radius 16px`, `--radius-row 12px`, `--r-cta 10px`; Tailwind 4-pt scale | `globals.css` |
| Components | Ejected shadcn (`base-nova` style) in `packages/ui/src/components`, incl. `frog-mark`, `bubble`, `ticket`, `driving-ring`, `chrome-bar` | `apps/web/components.json` |
| Existing design direction | 8 Sep handoff: Passbook (light) chosen over Lilypad (dark); consumer language, no crypto words on screen; money always `$0.00` tabular | `docs/design/SCREENS_HANDOFF_FABLE51.md` |
| Theme switcher | Already exists: `passbook` / `lilypad` / `system`, stored in localStorage, applied as `data-theme` plus a `.dark` class before React mounts, previewable with `?theme=`. Settings shows a three-column toggle. | `apps/web/src/lib/theme.ts`, `components/settings/appearance-settings.tsx`, `e2e/themes.spec.ts` |
| Tests that pin Home copy | Four specs locate the H1 by its text "What can I help with?" and the region "Use Froggy here" | `e2e/welcome.spec.ts`, `e2e/ui-polish.spec.ts`, `e2e/agent-onboarding.spec.ts`, `e2e/themes.spec.ts` (default theme) |
| Sign-in gate reachability | Rendered only when `identity.status === "ready"` and unauthenticated, which needs a real `VITE_PRIVY_APP_ID`. No e2e spec renders it; `auth.spec.ts` tests the API, not the page. | `apps/web/src/components/app-shell.tsx`, `lib/privy.tsx` |
| Home today | Signed-in Home = `ChatPage` with `EmptyState` (mascot PNG left, "What can I help with?", three outline chips) + `HomeSummary` balance row + composer. Signed-out = `SignInGate` card (wordmark, three beats, one button). | `apps/web/src/routes/home-page.tsx`, `components/stream/empty-state.tsx`, `components/sign-in-gate.tsx` |

Reference screenshot of Home at 1440: `design/concepts/2026-09-13/workspace-ux/home-1440.png`. It is competent and empty: a centred stack (eyebrow, H1, subhead, three equal outline chips), a flat balance row, and a lot of unused ground. Hallmark's slop test would flag the centred hero stack, the three-equal-chips row, and the uniform radius + one shadow on every card.

**Deploy facts that shape the plan.** Every integration, including Privy and Postgres, has a stub selected when its variable holds the `.env.example` placeholder (`apps/server/src/environment.ts`). With no variables set, the image boots in stub mode and the browser lands on the **signed-in Home with a local identity**, never on the sign-in gate. So reviewers of the deployed links will see Home first. The sign-in gate is still redesigned because it is the real front door in production.

## 2. Design brief (the spec both builders receive)

### 2.1 Audience, use case, tone (Hallmark step 1, inferred and stated)

- **Audience.** A person who has agreed to let an AI spend a little of their money on their behalf and wants to feel it is safe, watchable and honest. Not a crypto native; the 8 Sep handoff already removed chain words from the UI and this redesign keeps that.
- **Use case.** One action: start a task, either by typing into the composer or by tapping a starter. Everything else on Home (balance, recent conversations) supports that.
- **Tone.** _Playful_, in the Hum register: "the room is warm and someone smart is smiling." Warm, casual, direct, sentence case, verbs over nouns. Never cute at the expense of clarity about money.

### 2.2 Theme: Hum, adapted, not copied

Hum becomes a **third named theme**, not a replacement. `Theme` in `apps/web/src/lib/theme.ts` gains `"hum"`, it becomes the default light theme, and the Settings toggle grows to four columns (Hum, Passbook, Lilypad, System). `system` resolves to Hum in light and Lilypad in dark. Passbook stays selectable so the 8 Sep direction is never lost, and any page that looks wrong under Hum has a one-click comparison. Hum's tokens (`hum-07/tokens.css`) are written as a `:root[data-theme="hum"]` block in `packages/ui/src/styles/globals.css`, mapped onto the existing semantic names so every shadcn component picks them up without edits:

| Role | Hum value | Maps to |
| --- | --- | --- |
| Paper | `oklch(97% 0.012 95)` cream, `paper-2` `94%`, `paper-3` `91%` | `--background`, `--muted`, `--paper-deep` |
| Card | cream, not white (Hum bans pure white) | `--card` |
| Ink | `oklch(20% 0.012 250)`, ink-2 `28%`, muted `52%` | `--foreground`, `--secondary-foreground`, `--muted-foreground` |
| Primary CTA | **mint** `oklch(80% 0.16 150)` face, mint-deep edge | `--primary`, `--primary-lo`; ink on mint, not white |
| Pear | `oklch(86% 0.18 95)` | the character colour, starter tiles, "your money" tile |
| Cyan | `oklch(66% 0.18 235)` | recent conversations, "what people did" surfaces |
| Coral | `oklch(68% 0.24 18)` | the single emphatic moment: an approval waiting, the star-burst |
| Agent / human / declined | keep amber, blue, red as roles; re-tune lightness to sit on cream | `--drive-agent`, `--drive-human`, `--destructive` |
| Radius | card 20, pill 999, input 12 | `--radius`, `--radius-row`, `--r-cta` |
| Shadows | contact + ambient pair, varied by elevation | `--shadow-card`, `--shadow-float` |
| Fonts | Plus Jakarta Sans (display + body), JetBrains Mono uppercase labels | `--font-display`, `--font-sans`, `--machine`, via `@fontsource-variable/plus-jakarta-sans` and `@fontsource/jetbrains-mono` (self-hosted, no runtime CDN). Fonts are CSS imports, so `tools/graph.ts` `mayUse` (a TypeScript import allowlist) needs no change; Manrope is already declared the same way. Under `data-theme="hum"` the font tokens switch; Passbook and Lilypad keep Manrope. |

Keep from Froggy: the frog mascot (`FrogMark` is a CSS/SVG mark, which is exactly Hum's "character built in CSS" rule; its skin green stays), the amber/blue/red role colours, tabular dollar amounts, the Passbook language rules. The lime accent is retired in favour of pear for "the interface asks something of you", since Hum already has a yellow.

Hum's `.btn` press system (solid colour edge + cast shadow, lift on hover, press down on active) is ported as a `push` variant of the existing `Button`, used for exactly one primary action per screen.

### 2.3 Macrostructure and chrome

- **Home (signed-in): Workbench.** The composer is the product. It stays anchored where `ComposerStack` already lives (the bottom of the column) so the first send does not jump the layout; the Workbench is the first-use column above it, which fills the height instead of leaving it empty. In that column, an off-centre hero: greeting text left, the frog character right, bleeding past the content edge (the required asymmetric moment). Starters are **one big + two small** tinted tiles (pear, cyan, mint), each with its own drawn mark, never three equal chips. The balance is a pear tile with the amount as the single large figure; "Simulated" stays visible when stubbed (the loud-stub rule). Recent conversations are a compact dense strip (the one deliberately dense section). Empty ground on a 1440 display is used, not tolerated.
- **Sign-in gate: split-screen.** Value text left, the frog and a real product moment right (a receipt ticket and a "your call" ticket drawn with existing `Ticket` components, static). One push button. The three beats (Fund, Control, Follow) become a numbered narrative rail, Bubble's best move, instead of a bulleted list.
- **Nav.** The rail (desktop) and pill nav (mobile) keep their structure; they are retinted by tokens and get Hum's hover treatment. No new archetype, since the app's navigation is not in scope.
- **Character moment.** The frog blinks at rest (existing `frog-pose`), reacts on composer focus, and a coral star-burst fires once from the send button when a task starts. Reduced motion disables all three.
- **Designed exception.** One deadpan, self-aware line under the balance when stubbed ("Play money. Real receipts."), and the frog peeking from the corner of the recent-conversations strip on wide screens.
- **Density rhythm.** Airy hero, dense recents, airy composer.

### 2.4 Copy

Home: "Where should Froggy go today?" as the H1 (verbs, not "What can I help with?"). Starters keep their current intents (find tokens, plan a trip, find something good) with warmer labels. All money in dollars with two decimals. No "USDC + HBAR" on the balance tile; it moves to the wallet page detail where it already lives. Max one em-dash per paragraph; prefer none.

### 2.5 Hard rules (from AGENTS.md and Hallmark)

- Use semantic tokens only; no hex literals in components.
- Screencast frames never touch React state (untouched here).
- Accessible names, visible focus, `prefers-reduced-motion` respected, 320 to 1440 widths.
- No serif anywhere, no pure white, no pure black, no accent-to-accent gradients, no badge above the H1, no 3-identical-cards row, no accent stripe on card edges, no emoji as icons.
- Honest metrics only. No invented numbers on the gate.

## 3. Process (from the Lenny article), applied to each build

1. **Seed string.** Each builder generates a random 24-char string at the start and derives two small choices from it (which tile is big, which accent carries the character's reaction, a 2 to 4 degree tilt on one element or none). The seed is stamped in the CSS comment. Two builds from one spec will differ on purpose.
2. **Ambitious brief.** Section 2 is the brief. Builders do not invent a safer version of it.
3. **Design critic loop.** The critic sees only screenshots (1440, 1024, 390, plus the composer in focus and a reduced-motion pass), never the code. It scores 1 to 10 against "how a top consumer design studio would execute Hum for this product", penalises AI tells by name, and returns a ranked punch list. **The critic for both branches is a fresh Claude Fable 5.1 session** that has not seen either build's code (the owner dropped Codex from review duty; Codex still builds branch B). Stop at 9/10 or after three rounds, whichever first. Each round's score and punch list is kept in `docs/design/redesign-2026-09-13/<branch>/critic-round-N.md`. The critic prompt is identical for both branches and is committed alongside the rounds so the comparison is auditable.
4. **Cut.** Before the final round, each builder removes anything that only decorates: glows, extra containers, redundant labels.
5. **Remove AI tells.** Run Hallmark's slop test (`references/slop-test.md`) and record the pass in the stamp.

Image and video generation from the article are skipped: no API keys are configured for them and the frog is already a drawn character.

## 4. Branches, sessions, and who does what

|  | Branch | Builder | Critic |
| --- | --- | --- | --- |
| A | `redesign/hum-fable` | Claude Fable 5.1, Claude Code, started in `/Volumes/Vora/OpenSource/Froggy-ETHOnline2026` | fresh Claude Fable 5.1 session, screenshots only |
| B | `redesign/hum-codex` | Codex CLI (`gpt-5.6-sol`, `xhigh`), available again after 12:15 IST on 13 Sep | fresh Claude Fable 5.1 session, screenshots only |

Both branch from the same base commit of `main`. Both receive this file and the Hallmark skill directory as read-only inputs. Neither reads the other's branch until both are deployed.

**Model note.** The request names "GPT 6". The installed Codex CLI (0.153.1) lists `gpt-5.4`, `gpt-5.5`, `gpt-5.6-luna`, `gpt-5.6-sol`, `gpt-5.6-terra`; there is no `gpt-6`. The plan uses `gpt-5.6-sol` (the configured default). If a `gpt-6` model appears in `codex` before the build starts, switch to it.

**Session note.** The planning session runs inside a Drishti worktree whose sandbox refuses git commands aimed at other repositories. The build, review, and deploy sessions must therefore be started from the Froggy checkout itself so `git`, `bun`, `railway` and `gh` all act on the right repo.

## 5. Build steps (identical for A and B)

0. Prerequisites, done 13 Sep: Bun upgraded from 1.3.6 to 1.4.2 stable (the exact pin in `.bun-version` and `engines`). The registry in `~/.npmrc` returns 404 for `@hiero-ledger/proto@2.31.0` although the official registry has it, so the local install is `bun install --frozen-lockfile --registry https://registry.npmjs.org` (done, 1159 packages, lockfile untouched). Railway's Docker build uses the official registry and is unaffected. The Docker daemon is not running, so the image is only verified by the Railway build itself; start Docker Desktop if a local `docker build .` is wanted first.
1. `bun install`, `bun dev`, confirm Home renders in stub mode; take "before" screenshots at 1440 and 390 with the gstack browse daemon.
2. Add Hum tokens and fonts to `packages/ui` (section 2.2); add `"hum"` to `theme.ts` (default, `system` light target), and the fourth Settings column. Verify the whole app retints without layout breakage (walk Home, Wallet, Explore, Inbox, Settings at 1440 and 390) and that Passbook and Lilypad still render as before.
3. Add `push` variant to `Button`; add a `StarBurst` primitive and a `Tile` (tinted, colour-shift on hover) to `packages/ui`.
4. Rebuild `EmptyState`, `HomeSummary`, `RecentConversations` placement, and the Home composition in `chat-page.tsx` for the first-use case only. Conversation rendering after the first message is untouched.
5. Rebuild `SignInGate`.
6. Character moments and reduced-motion branches.
7. `bun run check:fast`, then `bun run check`, then `bun run e2e` for `welcome`, `ui-polish`, `agent-onboarding`, `themes`, `navigation` and `screens`; update the four specs that locate the H1 by "What can I help with?" and the region "Use Froggy here" to the new accessible names, and the `themes` default-theme assertion from `passbook` to `hum`. Nothing else in e2e should need to change; if it does, that is a scope leak to report.
8. Critic rounds (section 3.3), then the cut pass, then the slop test.
9. Stamp `apps/web/src/styles` (or the top of the new CSS) with `/* Hallmark · macrostructure: Workbench · theme: Hum · nav: rail (kept) · seed: … */` and append `.hallmark/log.json`.
10. Commit in small steps with conventional messages; push the branch to the owner's fork.

## 6. Deploy

- Fork `grmkris/Froggy-ETHOnline2026` to `HemangVora/Froggy-ETHOnline2026` with `gh repo fork`; push both branches there.
- One new Railway project `froggy-redesign` (owner's account, region `europe-west4`), two services `hum-fable` and `hum-codex`, each a GitHub-connected service on its branch, built from the repo `Dockerfile`. One variable each, `APP_ORIGIN` set to the service's public URL: the server only accepts its WebSocket upgrades from that origin and answers 403 otherwise (found on the first live deploy on 13 Sep, where the page rendered but the app socket was refused). Everything else stays stub. `PORT` is read by the server; Railway injects it.
- The repo's `.railway/railway.ts` is not applied (it targets the upstream project and `main`); the two services are created with the CLI. `railway` CLI 5.30.1 is installed; upgrade to 5.54 first if service creation flags are missing.
- Health: `GET /health` on each URL reports every mode as `stub`.
- Deliverable: two public URLs, plus screenshots of each at 1440 and 390 (Home, composer focused, and the Settings appearance toggle showing Hum selected), stored under `docs/design/redesign-2026-09-13/` and sent to the owner.
- **The sign-in gate cannot be shown on the stub deploys**: without a Privy app id the app admits a local identity and never renders the gate. Gate screenshots come from a local run with `VITE_PRIVY_APP_ID` set to a Privy app id the owner supplies (a free Privy app takes a few minutes to create). If none is supplied, the gate is still built and reviewed by the critic from a local render with a temporary app id from the builder's own Privy account, or omitted from the deliverable with that gap stated. It is never faked with a dev-only route in product code.

## 7. Verification and done criteria

- Both branches: `bun run check` green, `bun run e2e` green for the touched specs, app boots with no console errors, Home and gate exercised by hand at 390 and 1440, keyboard-only pass, reduced-motion pass.
- Critic score 9 or above, or three rounds with the last punch list addressed or explicitly declined with a reason.
- Slop test recorded as passed in the stamp.
- Two live URLs answer `/health`, and the screenshots match what the URLs serve.
- Nothing outside `apps/web`, `packages/ui`, `docs/design`, `plans`, `.hallmark` is modified. `bun run graph` proves the dependency boundaries are intact.

## 8. Risks and the calls already made

- **Manrope is dropped for Plus Jakarta Sans.** Hum requires the rounded-sans register. Cost: one font swap across the app. Reversible by changing two tokens.
- **Mint as primary instead of Froggy's forest green.** Forest green stays on the mascot only. If the owner wants the green kept as primary, Hum's single-accent sibling (Coral) is the honest theme and the plan should say so rather than mixing.
- **Retinting reaches every page.** Under the Hum theme every page gets the new palette but no structural work; anything that breaks visibly there is fixed, anything that is merely "old-shaped" is left for a later plan. Because Passbook remains one click away, a bad Hum page is a comparison, not a regression.
- **Two builders, one spec** will converge on similar layouts. The seed string, the cross-model critic, and the variety levers in Hum's not-AI discipline are the countermeasures. If they still land near-identical, that is a finding worth reporting, not hiding.
- **Deploy without a database** means no persistence between restarts on the demo links (`apps/server/src/services.ts` keeps the stub ledger in process and reports `database=stub` on `/health`). Acceptable for a design review; noted on the deliverable.

## 9. Review record (Claude Fable 5.1, 13 Sep 2026)

Reviewed against the checkout, not from memory. Each finding names what changed in the plan.

| # | Finding | Evidence | Resolution |
| --- | --- | --- | --- |
| 1 | The draft proposed a global retheme, but a theme switcher already exists and the 8 Sep handoff chose Passbook deliberately. A global swap would delete that choice and break `themes.spec.ts`. | `apps/web/src/lib/theme.ts`, `e2e/themes.spec.ts` | Hum is a third theme and the new default; Passbook and Lilypad stay. Settings grows to four columns. (§2.2, §5.2) |
| 2 | Four e2e specs find Home by the literal H1 "What can I help with?" and the region name "Use Froggy here". Changing the copy without updating them fails CI, and the Railway IaC skips deploys on red CI. | `e2e/welcome.spec.ts:41`, `ui-polish.spec.ts:30`, `agent-onboarding.spec.ts:154` | Listed as a required edit. (§5.7) |
| 3 | The draft said the gate could be reached "by clearing the local identity". False: with no Privy app id the identity is `local` and the gate never renders. | `apps/web/src/components/app-shell.tsx`, `lib/privy.tsx` L17-26 | Gate screenshots need a Privy app id; otherwise the gap is stated. No dev-only route. (§6) |
| 4 | Local `bun install --frozen-lockfile` failed twice: Bun 1.3.6 rejected the 1.4.2 lockfile, then the registry in `~/.npmrc` returned 404 for `@hiero-ledger/proto@2.31.0`. | `bun install` output; `npm view --registry https://registry.npmjs.org` returns 2.31.0 | Bun upgraded to 1.4.2 stable; install against the official registry. Railway unaffected. (§5.0) |
| 5 | Moving the composer into the page for first use would give it two positions and a layout jump on the first message. | `apps/web/src/routes/chat-page.tsx` L300-362: `ComposerStack` is shared by both branches of `firstUse` | Composer stays anchored; the Workbench is the first-use column above it. (§2.3) |
| 6 | Same-model critic for both branches is weaker than cross-model. | Owner dropped Codex from review | Mitigated: fresh session, screenshots only, one committed critic prompt for both branches, rounds recorded. Named as a limitation. (§3.3) |
| 7 | Fonts added to `packages/ui` might trip the `mayUse` allowlist in `tools/graph.ts`. | `tools/graph.ts` L167-183 lists TypeScript imports only; Manrope is a CSS import today and passes | No graph change needed. (§2.2) |
| 8 | Zero-env boot claim needed proof. | `apps/server/src/environment.ts` L57 (`databaseUrl: ""` placeholder), L99-104 `modeOf`; `services.ts` L471 in-process stub ledger | Confirmed by a live boot on 13 Sep with no `.env`: `Froggy listening on http://localhost:3911/` after 7 s and `/health` returned `status: ok` with `database`, `privy`, `hedera`, `graph`, `model`, `browser` and `telegram` all `stub`. |
| 9 | `.railway/railway.ts` pins `grmkris/Froggy-ETHOnline2026` and `main`, with `checkSuites: true`. Applying it from the fork would try to manage the upstream project. | `.railway/railway.ts` L30-35 | Not applied; the two services are created with the CLI against a new project. (§6) |
| 10 | Dependency boundaries: the plan touches `apps/web`, `packages/ui`, docs and plans only. `packages/ui` may import nothing from the workspace and that stays true. | `tools/graph.ts` | `bun run graph` is in the done criteria. (§7) |

Open items the owner decides: whether to supply a Privy app id for gate screenshots (§6), and whether mint or forest green is the primary (§8, second bullet).
