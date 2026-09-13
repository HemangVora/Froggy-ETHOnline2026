import { formatUsd } from "@froggy/domain";
import { Badge } from "@froggy/ui/components/badge";
import { cn } from "@froggy/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactElement } from "react";

import { walletAmounts } from "../../lib/wallet-view";
import { useWorkspace } from "../../lib/workspace-context";

/**
 * The balance tile on Home. One figure, in dollars, and the truth about it:
 * simulated money says so, on the tile, in words.
 *
 * One row up to the tablet, a tall tile on a wide screen. The whole tile is
 * the link to the wallet, so the arrow is a sign, not a second control.
 * Funding balances are not holdings valuation or reservation-adjusted buying
 * power; the wallet page has the detail.
 */
export const BalanceTile = ({
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
  const note = simulated
    ? "Play money. Real receipts."
    : "Add money or take it out whenever you like.";
  return (
    <Link
      aria-label="Your money"
      className={cn(
        "tile tile--pear focus-visible:ring-ring/50 short:p-3 group flex items-center justify-between gap-3 p-4 outline-none focus-visible:ring-3 sm:p-5 lg:flex-col lg:items-stretch lg:gap-4",
        className
      )}
      to="/wallet"
    >
      <span className="flex min-w-0 flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap">
            Your money
          </span>
          {simulated ? (
            <Badge className="short:hidden" variant="outline">
              Simulated
            </Badge>
          ) : null}
        </span>
        <span className="text-muted-foreground short:hidden text-xs lg:hidden">
          {simulated ? "Play money. Real receipts." : "Dollars, in and out."}
        </span>
      </span>
      <span className="short:text-lg lg:text-money shrink-0 text-2xl font-semibold tracking-tight tabular-nums lg:my-auto">
        {amount}
      </span>
      <span className="hidden items-end justify-between gap-3 text-xs lg:flex">
        <span className="text-muted-foreground">{note}</span>
        <span className="text-brand inline-flex items-center gap-1 font-semibold whitespace-nowrap">
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
