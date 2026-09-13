/**
 * Home before the first message: the frog, one question, five tiles.
 *
 * The composer below is the product; this column gives it a room. The hero
 * sits off-centre with the frog bleeding to the edge, the starters are one
 * big tile and two small ones rather than a row of equal chips, and the
 * balance keeps its own tile because money is the thing this app is honest
 * about. Recent conversations are the one dense strip on the screen.
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

const dayOf = (iso: number): string =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

/** The last few conversations, one line each. Nothing to show is a sentence, not a skeleton. */
const RecentStrip = (): ReactElement | null => {
  const history = useHistoryPage("/api/conversations?limit=4&q=");
  if (history.isPending || history.isError) {
    return null;
  }
  const recent = history.records.filter(
    (record): record is Conversation => record.kind === "conversation"
  );
  return (
    <section
      aria-label="Recent conversations"
      className="border-border mt-2 border-t border-dashed pt-3"
    >
      {recent.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Nothing yet. Your first conversation starts below.
        </p>
      ) : (
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
      )}
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
    className="short:gap-3 flex flex-col gap-4 py-1 sm:gap-6"
  >
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:gap-6">
      <div className="min-w-0">
        <h1 className="font-display short:text-2xl text-[1.75rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[2.5rem] lg:text-[2.875rem]">
          Where should Froggy go today?
        </h1>
        {/* A short phone keeps the question and the starters above the composer. */}
        <p className="text-muted-foreground short:hidden mt-2 max-w-md text-sm leading-relaxed sm:mt-3 sm:text-base">
          A little research. A trip to plan. Something worth finding. Say the
          word and watch it happen, receipts included.
        </p>
      </div>
      <figure className="-mr-4 flex shrink-0 flex-col items-center gap-1 sm:-mr-6">
        <FrogMark
          className="short:size-14 size-20 sm:size-32 lg:size-40"
          data-slot="home-frog"
          pose={poseForHome(waiting, busy)}
        />
        <figcaption className="text-machine text-muted-foreground hidden sm:block">
          {copyForHome(waiting, busy)}
        </figcaption>
      </figure>
    </div>
    <div className="short:gap-2 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
      <BalanceTile className="col-span-2 sm:row-span-2" />
      <Link
        aria-label="Find tokens"
        className={`${TILE} tile--mint col-span-2 sm:col-span-4`}
        search={{ discover: true }}
        to="/watchlist"
      >
        <span className="flex items-center gap-3">
          <span aria-hidden className="tile-mark tile-mark--coin" />
          <span className="text-base font-semibold sm:text-lg">
            Find tokens
          </span>
        </span>
        <span className="text-muted-foreground short:hidden max-w-sm text-sm leading-relaxed">
          Ask what is moving, keep a watchlist, and buy only when you say so.
        </span>
      </Link>
      <button
        aria-label="Plan a trip"
        className={`${TILE} tile--cyan col-span-1 sm:col-span-2`}
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me plan a trip. Ask where I want to go, my dates and budget first."
          );
        }}
        type="button"
      >
        <span aria-hidden className="tile-mark tile-mark--trip" />
        <span className="text-sm font-semibold sm:text-base">Plan a trip</span>
        <span className="text-muted-foreground hidden text-sm sm:block">
          Dates and budget first, then the booking pages, live.
        </span>
      </button>
      <button
        aria-label="Find something good"
        className={`${TILE} tile--lavender col-span-1 sm:col-span-2`}
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me find something worth buying. Ask what I have in mind and my budget first."
          );
        }}
        type="button"
      >
        <span aria-hidden className="tile-mark tile-mark--find" />
        <span className="text-sm font-semibold sm:text-base">
          Find something good
        </span>
        <span className="text-muted-foreground hidden text-sm sm:block">
          Name a budget. Froggy shops, you approve.
        </span>
      </button>
    </div>
    <RecentStrip />
  </section>
);
