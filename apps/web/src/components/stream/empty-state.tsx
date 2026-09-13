import { FrogMark } from "@froggy/ui/components/frog-mark";
import { Tile, tileVariants } from "@froggy/ui/components/tile";
import { cn } from "@froggy/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

const StarterMark = ({
  kind,
}: {
  readonly kind: "find" | "good" | "trip";
}): ReactElement => {
  if (kind === "find") {
    return (
      <svg aria-hidden="true" className="home-starter-mark" viewBox="0 0 48 48">
        <circle cx="20" cy="24" r="10" />
        <circle cx="31" cy="17" r="7" />
        <path d="M8 34c8 5 21 5 31-3" />
      </svg>
    );
  }
  if (kind === "trip") {
    return (
      <svg aria-hidden="true" className="home-starter-mark" viewBox="0 0 48 48">
        <circle cx="10" cy="35" r="3" />
        <circle cx="38" cy="13" r="3" />
        <path d="M13 34c15-1 8-17 22-20M27 9l9 5-3 9" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="home-starter-mark" viewBox="0 0 48 48">
      <path d="M12 18h24l-2 20H14L12 18Z" />
      <path d="M18 19c0-7 12-7 12 0M8 10h8M12 6v8M34 9h6" />
    </svg>
  );
};

const StarterWords = ({
  detail,
  label,
}: {
  readonly detail: string;
  readonly label: string;
}): ReactElement => (
  <span className="home-starter-words">
    <span className="home-starter-label">{label}</span>
    <span className="home-starter-detail">{detail}</span>
  </span>
);

export const EmptyState = ({
  disabled,
  onSend,
}: {
  readonly disabled: boolean;
  readonly onSend: (text: string) => void;
}): ReactElement => (
  <>
    <header className="home-hero" data-slot="home-intro">
      <div className="home-hero-copy">
        <h1>Where should Froggy go today?</h1>
        <p>
          Point Froggy at the useful thing. You can watch the work and stay in
          charge of the money.
        </p>
      </div>
      <span aria-hidden="true" className="home-frog">
        <FrogMark className="size-full" pose="idle" />
      </span>
    </header>
    <fieldset className="home-starters">
      <legend className="sr-only">Ways to start</legend>
      <Link
        aria-label="Find tokens"
        className={cn(
          tileVariants({ tone: "pear" }),
          "home-starter home-starter--big"
        )}
        data-slot="tile"
        search={{ discover: true }}
        to="/watchlist"
      >
        <StarterMark kind="find" />
        <StarterWords
          detail="See what is moving without spending a thing."
          label="Find tokens"
        />
      </Link>
      <Tile
        aria-label="Plan a trip"
        className="home-starter"
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me plan a trip. Ask where I want to go, my dates and budget first."
          );
        }}
        tone="cyan"
        type="button"
      >
        <StarterMark kind="trip" />
        <StarterWords
          detail="Start with dates and a budget."
          label="Plan a trip"
        />
      </Tile>
      <Tile
        aria-label="Find something good"
        className="home-starter"
        disabled={disabled}
        onClick={() => {
          onSend(
            "Help me find something worth buying. Ask what I have in mind and my budget first."
          );
        }}
        tone="mint"
        type="button"
      >
        <StarterMark kind="good" />
        <StarterWords
          detail="Compare the options before you buy."
          label="Find something good"
        />
      </Tile>
    </fieldset>
  </>
);
