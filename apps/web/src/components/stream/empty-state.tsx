/**
 * Home before the first message: the frog, one question, five tiles.
 *
 * The composer below is the product; this column gives it a room. The hero
 * sits off-centre with the frog bleeding to the edge, the starters are one
 * big tile and two small ones rather than a row of equal chips, and the
 * balance keeps its own tile because money is the thing this app is honest
 * about. Recent conversations are the one dense strip on the screen, and
 * only when there are some: an empty strip is nothing, not a sentence.
 */

import type { Conversation } from "@froggy/domain";
import { FrogMark } from "@froggy/ui/components/frog-mark";
import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { copyForHome, poseForHome } from "../../lib/frog-pose";
import { useHistoryPage } from "../../lib/history-client";
import { BalanceTile } from "../chat/home-summary";

const TILE =
  "tile focus-visible:ring-ring/50 short:gap-2 short:p-3 flex flex-col gap-3 p-4 outline-none focus-visible:ring-3 sm:p-5";

/** On a short phone the two small tiles become rows so all four clear the composer. */
const SMALL_TILE = `${TILE} short:col-span-2 short:py-2.5 col-span-1 sm:col-span-2 lg:col-span-1`;

const dayOf = (iso: number): string =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

/**
 * Three marks drawn in the frog's ink and filled with the tile's own accent:
 * a coin, a suitcase, a bag. Not an icon set; the same three primitives the
 * mascot is built from.
 */
const Glyph = ({ kind }: { readonly kind: "coin" | "trip" | "find" }) => {
  const shared = {
    "aria-hidden": true,
    className: "size-6 shrink-0",
    fill: "var(--tile-deep)",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };
  if (kind === "coin") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="9" />
        <path
          d="M12 8v8M9.5 10.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"
          fill="none"
        />
      </svg>
    );
  }
  if (kind === "trip") {
    return (
      <svg {...shared}>
        <rect height="12" rx="3" width="18" x="3" y="8" />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" fill="none" />
        <path d="M8 12v4M16 12v4" fill="none" />
      </svg>
    );
  }
  return (
    <svg {...shared}>
      <path d="M5 9h14l-1.2 10.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 9Z" />
      <path d="M9 9V7.5a3 3 0 0 1 6 0V9" fill="none" />
    </svg>
  );
};

/** The last few conversations, one line each. None means nothing is drawn. */
const RecentStrip = (): ReactElement | null => {
  const history = useHistoryPage("/api/conversations?limit=4&q=");
  if (history.isPending || history.isError) {
    return null;
  }
  const recent = history.records.filter(
    (record): record is Conversation => record.kind === "conversation"
  );
  if (recent.length === 0) {
    return null;
  }
  return (
    <section
      aria-label="Recent conversations"
      className="border-border mt-2 border-t border-dashed pt-3"
    >
      <ul className="divide-border flex flex-col divide-y divide-dashed">
        {recent.map((conversation) => (
          <li key={conversation.id}>
            <Link
              className="hover:bg-muted focus-visible:ring-ring/50 -mx-2 flex min-h-11 items-center gap-3 rounded-[var(--radius-row)] px-2 outline-none focus-visible:ring-3"
              params={{ conversationId: conversation.id }}
              to="/chat/$conversationId"
            >
              <span
                aria-hidden
                className="bg-cyan size-2 shrink-0 rounded-full"
              />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {conversation.title}
              </span>
              <time
                className="text-machine text-muted-foreground shrink-0"
                dateTime={new Date(conversation.updatedAt).toISOString()}
              >
                {dayOf(conversation.updatedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const EmptyState = ({
  busy,
  disabled,
  onSend,
  waiting,
}: {
  readonly busy: boolean;
  readonly disabled: boolean;
  readonly onSend: (text: string) => void;
  /** Approval questions open. */
  readonly waiting: number;
}): ReactElement => (
  <section
    aria-label="Use Froggy here"
    data-slot="home-intro"
    className="short:gap-2 flex flex-col gap-4 pt-1 sm:gap-5 sm:pt-4 lg:pt-8 xl:gap-6"
  >
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:gap-6">
      <div className="min-w-0">
        <h1 className="font-display short:text-xl text-[1.75rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]">
          Where should Froggy go today?
        </h1>
        {/* A short phone keeps the question and the starters above the composer. */}
        <p className="text-muted-foreground short:hidden mt-2 max-w-md text-sm leading-relaxed sm:mt-3 sm:text-base lg:text-lg">
          A little research. A trip to plan. Something worth finding. Say the
          word and watch it happen, receipts included.
        </p>
      </div>
      <figure className="short:hidden -mr-2 flex shrink-0 flex-col items-center gap-1 sm:-mr-3">
        <FrogMark
          className="size-20 sm:size-32 lg:size-36 xl:size-40"
          data-slot="home-frog"
          pose={poseForHome(waiting, busy)}
        />
        <figcaption className="text-muted-foreground hidden text-xs sm:block">
          {copyForHome(waiting, busy)}
        </figcaption>
      </figure>
    </div>
    <div className="short:gap-2 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <BalanceTile className="col-span-2 sm:col-span-4" />
      <Link
        aria-label="Find tokens"
        className={`${TILE} tile--mint col-span-2 sm:col-span-4 lg:col-span-2`}
        search={{ discover: true }}
        to="/watchlist"
      >
        <span className="flex items-start gap-3">
          <Glyph kind="coin" />
          <span className="text-base leading-6 font-semibold sm:text-lg">
            Find tokens
          </span>
        </span>
        <span className="text-muted-foreground short:hidden max-w-sm text-sm leading-relaxed">
          Ask what is moving, keep a watchlist, and buy only when you say so.
        </span>
      </Link>
      <button
        aria-label="Plan a trip"
        className={`${SMALL_TILE} tile--cyan`}
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me plan a trip. Ask where I want to go, my dates and budget first."
          );
        }}
        type="button"
      >
        <span className="flex items-start gap-3">
          <Glyph kind="trip" />
          <span className="text-sm leading-6 font-semibold sm:text-base">
            Plan a trip
          </span>
        </span>
        <span className="text-muted-foreground hidden text-sm sm:block">
          Dates and budget first, then the booking pages, live.
        </span>
      </button>
      <button
        aria-label="Find a deal"
        className={`${SMALL_TILE} tile--lavender`}
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me find something worth buying. Ask what I have in mind and my budget first."
          );
        }}
        type="button"
      >
        <span className="flex items-start gap-3">
          <Glyph kind="find" />
          <span className="text-sm leading-6 font-semibold sm:text-base">
            Find a deal
          </span>
        </span>
        <span className="text-muted-foreground hidden text-sm sm:block">
          Name a budget. Froggy shops, you approve.
        </span>
      </button>
    </div>
    <RecentStrip />
  </section>
);
