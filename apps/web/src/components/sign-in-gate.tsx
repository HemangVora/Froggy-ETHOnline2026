/**
 * The front door. Loading and signed-out stay distinct while the identity
 * provider starts.
 *
 * Split in two: the promise on the left as three numbered steps, and on the
 * right what a task actually leaves behind, drawn with the same tickets the
 * conversation uses. The example amounts are the ones from the README's own
 * walkthrough and are labelled as an example.
 */

import { Badge } from "@froggy/ui/components/badge";
import { Button } from "@froggy/ui/components/button";
import { FrogMark } from "@froggy/ui/components/frog-mark";
import { Skeleton } from "@froggy/ui/components/skeleton";
import {
  Ticket,
  TicketBody,
  TicketPerforation,
  TicketStub,
} from "@froggy/ui/components/ticket";

import { useIdentity } from "../lib/privy";

const STEPS = [
  ["1.0", "Fund", "Add money for the work you want done. Dollars, in and out."],
  [
    "2.0",
    "Control",
    "Set what Froggy may spend per task and per day. Stop it any time.",
  ],
  [
    "3.0",
    "Follow",
    "Watch the page it is on, take it over mid-action, keep every receipt.",
  ],
] as const;

const Frame = ({
  children,
}: {
  readonly children: React.ReactNode;
}): React.ReactElement => (
  <div className="grid min-h-dvh place-items-center px-4 py-8 sm:p-8">
    <div className="bg-card shadow-card grid w-full max-w-4xl overflow-hidden rounded-[var(--radius)] md:grid-cols-[1.1fr_0.9fr]">
      {children}
    </div>
  </div>
);

const Wordmark = (): React.ReactElement => (
  <div className="mb-6 flex items-center gap-2.5">
    <FrogMark className="size-8" compact />
    <span className="font-display text-lg font-semibold tracking-tight">
      Froggy
    </span>
  </div>
);

/** What a task leaves behind: a paid receipt and a question, both static. */
const Example = (): React.ReactElement => (
  <figure
    aria-label="Example of a task in progress"
    className="bg-pear/20 flex flex-col justify-center gap-4 p-6 sm:p-8"
  >
    <FrogMark className="size-24 self-end sm:size-28" pose="working" />
    <Ticket>
      <TicketBody className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">Paid the oracle</span>
        <span className="text-money text-xl leading-6">$0.0040</span>
      </TicketBody>
      <TicketPerforation />
      <TicketStub className="flex items-center justify-between gap-2">
        <span>rule · tx · evidence</span>
        <span>Example</span>
      </TicketStub>
    </Ticket>
    <Ticket tone="asking">
      <TicketBody>
        <Badge className="mb-2" variant="outline">
          Your call
        </Badge>
        <p className="text-sm">
          <span className="font-semibold">$1.50</span> to a seller you have not
          paid before. Froggy waits for you.
        </p>
      </TicketBody>
      <TicketPerforation />
      <TicketStub className="flex items-center justify-between gap-2">
        <span>stop · no · yes, once</span>
        <span>Example</span>
      </TicketStub>
    </Ticket>
    <figcaption className="text-muted-foreground text-xs">
      Every payment is a ticket like these: what, why, and the proof.
    </figcaption>
  </figure>
);

export const SignInGate = (): React.ReactElement => {
  const identity = useIdentity();

  if (identity.status === "failed") {
    return (
      <Frame>
        <div className="p-6 sm:p-10">
          <Wordmark />
          <h1 className="text-greeting text-balance">
            A wallet for your agents.
          </h1>
          <p
            className="bg-refused-soft text-refused my-5 rounded-[var(--radius-row)] p-4 text-sm"
            role="alert"
          >
            Sign-in couldn’t start. Retry to reconnect.
          </p>
          <Button
            className="min-h-11 w-full"
            onClick={() => {
              window.location.reload();
            }}
            size="lg"
            variant="push"
          >
            Retry sign-in
          </Button>
        </div>
        <Example />
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="flex flex-col p-6 sm:p-10">
        <Wordmark />
        <h1 className="font-display text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[2.5rem]">
          A wallet for your agents.
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">
          Fund a task, follow the work, keep the receipts. Froggy spends only
          inside the limits you set.
        </p>
        <ol className="border-border my-7 flex flex-col gap-5 border-l border-dashed pl-5">
          {STEPS.map(([number, title, text]) => (
            <li className="relative" key={title}>
              <span
                aria-hidden
                className="bg-pear absolute top-1.5 -left-[1.4375rem] size-2.5 rounded-full"
              />
              <span className="text-machine text-muted-foreground">
                {number}
              </span>
              <span className="mt-0.5 block text-base font-semibold">
                {title}
              </span>
              <span className="text-muted-foreground block text-sm leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-auto">
          {identity.status === "loading" || !identity.ready ? (
            <output
              aria-label="Preparing sign-in"
              className="flex h-11 items-center"
            >
              <Skeleton
                aria-hidden
                className="h-11 w-full rounded-[var(--r-cta)]"
              />
              <span className="sr-only">Preparing sign-in</span>
            </output>
          ) : (
            <Button
              className="min-h-11 w-full text-base"
              onClick={() => {
                identity.login();
              }}
              size="lg"
              variant="push"
            >
              Sign in with email or Google
            </Button>
          )}
          <p className="text-muted-foreground mt-3 text-center text-xs">
            Bring your own agent, or start a task with Froggy.
          </p>
        </div>
      </div>
      <Example />
    </Frame>
  );
};
