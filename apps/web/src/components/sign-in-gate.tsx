/** Loading and signed-out stay distinct while the identity provider starts. */

import { Button } from "@froggy/ui/components/button";
import { FrogMark } from "@froggy/ui/components/frog-mark";
import { Skeleton } from "@froggy/ui/components/skeleton";
import {
  Ticket,
  TicketBody,
  TicketPerforation,
  TicketStub,
} from "@froggy/ui/components/ticket";
import type { ReactElement, ReactNode } from "react";

import { useIdentity } from "../lib/privy";

const BEATS = [
  ["01", "Fund", "Add only what you want Froggy to use."],
  ["02", "Control", "Set the rules, pause the work, or say no."],
  ["03", "Follow", "Watch the task and keep every receipt."],
] as const;

const GateFrame = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactElement => (
  <main className="sign-in-page">
    <div className="sign-in-shell">{children}</div>
  </main>
);

const GateIntro = ({
  action,
}: {
  readonly action: ReactNode;
}): ReactElement => (
  <section className="sign-in-copy">
    <div className="sign-in-wordmark">
      <span className="sign-in-mark">
        <FrogMark className="size-full" compact />
      </span>
      <span>Froggy</span>
    </div>
    <div>
      <h1>Send Froggy out. Keep the final say.</h1>
      <p className="sign-in-lede">
        Give an agent a little room to work without losing sight of the task or
        the money behind it.
      </p>
    </div>
    <ol className="sign-in-rail">
      {BEATS.map(([number, title, text]) => (
        <li key={title}>
          <span className="sign-in-number">{number}</span>
          <span>
            <strong>{title}</strong>
            <span>{text}</span>
          </span>
        </li>
      ))}
    </ol>
    <div className="sign-in-action">{action}</div>
  </section>
);

const GateArt = (): ReactElement => (
  <aside aria-label="How Froggy keeps you in control" className="sign-in-art">
    <span aria-hidden="true" className="gate-frog">
      <FrogMark className="size-full" pose="idle" />
    </span>
    <Ticket className="sign-in-ticket sign-in-ticket--call" tone="asking">
      <TicketBody>
        <p className="sign-in-ticket-label">Your call</p>
        <h2>Froggy asks before the rules bend.</h2>
        <p>See what it wants to do and why before you answer.</p>
      </TicketBody>
      <TicketPerforation />
      <TicketStub className="sign-in-ticket-actions">
        <span>Not now</span>
        <span>Allow once</span>
      </TicketStub>
    </Ticket>
    <Ticket className="sign-in-ticket sign-in-ticket--receipt">
      <TicketBody>
        <p className="sign-in-ticket-label">Receipt kept</p>
        <h2>The record stays after the work is done.</h2>
      </TicketBody>
      <TicketPerforation />
      <TicketStub>amount · rule · result</TicketStub>
    </Ticket>
  </aside>
);

export const SignInGate = (): ReactElement => {
  const identity = useIdentity();

  if (identity.status === "failed") {
    return (
      <GateFrame>
        <GateIntro
          action={
            <>
              <p className="sign-in-error" role="alert">
                Sign-in couldn’t start. Retry to reconnect.
              </p>
              <Button
                className="w-full text-base"
                onClick={() => {
                  window.location.reload();
                }}
                size="lg"
                variant="push"
              >
                Retry sign-in
              </Button>
            </>
          }
        />
        <GateArt />
      </GateFrame>
    );
  }

  return (
    <GateFrame>
      <GateIntro
        action={
          identity.status === "loading" || !identity.ready ? (
            <output aria-label="Preparing sign-in" className="block h-12">
              <Skeleton aria-hidden className="h-12 w-full rounded-full" />
              <span className="sr-only">Preparing sign-in</span>
            </output>
          ) : (
            <Button
              className="w-full text-base"
              onClick={() => {
                identity.login();
              }}
              size="lg"
              variant="push"
            >
              Sign in with email or Google
            </Button>
          )
        }
      />
      <GateArt />
    </GateFrame>
  );
};
