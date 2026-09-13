import { formatUsd } from "@froggy/domain";
import { Badge } from "@froggy/ui/components/badge";
import { TicketPerforation } from "@froggy/ui/components/ticket";
import { cn } from "@froggy/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactElement } from "react";

import { walletAmounts } from "../../lib/wallet-view";
import { useWorkspace } from "../../lib/workspace-context";

/**
 * The balance on Home is a receipt: a pear ticket with the app's own
 * perforation, the figure in the body and a real machine fact on the stub:
 * how many receipts exist. Simulated money says so on the ticket.
 *
 * The whole ticket is the link to the wallet. Funding balances are not
 * holdings valuation or reservation-adjusted buying power; the wallet page
 * has the detail.
 */
export const BalanceTicket = ({
  className,
}: {
  readonly className?: string;
}): ReactElement => {
  const { app } = useWorkspace();
  const total = walletAmounts(app.wallet).totalUsdMicros;
  let amount = "Loading…";
  if (app.wallet !== null) {
    amount = total === null ? "Unavailable" : formatUsd(total);
  }
  const simulated = app.modes?.privy === "stub" || app.modes?.hedera === "stub";
  const receipts = app.receipts.length;
  return (
    <Link
      aria-label="Your money"
      className={cn(
        "ticket ticket--pear focus-visible:ring-ring/50 group block overflow-hidden outline-none focus-visible:ring-3",
        className
      )}
      to="/wallet"
    >
      <span className="short:px-4 short:pt-3 flex items-center justify-between gap-4 px-5 pt-4 pb-3">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-0.5">
            <span className="text-sm font-semibold whitespace-nowrap">
              Your money
            </span>
            {simulated ? (
              <Badge
                className="bg-card/70 short:hidden border-transparent"
                variant="outline"
              >
                Simulated
              </Badge>
            ) : null}
          </span>
          {simulated ? null : (
            <span className="text-foreground/70 short:hidden text-xs">
              Add money or take it out whenever you like.
            </span>
          )}
        </span>
        {/* A state word is not a balance: it steps down. A real figure stays big. */}
        <span
          className={
            total === null
              ? "text-foreground/70 shrink-0 text-lg font-semibold tracking-tight sm:text-xl"
              : "short:text-xl shrink-0 text-2xl font-bold tracking-tight tabular-nums sm:text-[2rem]"
          }
        >
          {amount}
        </span>
      </span>
      <TicketPerforation />
      <span
        className="text-machine short:py-2 flex items-center justify-between gap-3 px-5 py-2.5"
        data-slot="ticket-stub"
      >
        <span className="truncate uppercase">
          {receipts === 0
            ? "no receipts yet"
            : `${receipts} receipt${receipts === 1 ? "" : "s"}`}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium">
          Wallet
          <ArrowUpRightIcon
            aria-hidden
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </span>
      </span>
    </Link>
  );
};
