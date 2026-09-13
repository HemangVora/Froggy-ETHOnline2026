import { formatUsd } from "@froggy/domain";
import { Badge } from "@froggy/ui/components/badge";
import { cn } from "@froggy/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { walletAmounts } from "../../lib/wallet-view";
import { useWorkspace } from "../../lib/workspace-context";

/**
 * The balance tile on Home. One figure, in dollars, and the truth about it:
 * simulated money says so, on the tile, in words.
 *
 * One row on a phone, a tall tile from the tablet up. Funding balances are
 * not holdings valuation or reservation-adjusted buying power; the wallet
 * page has the detail.
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
  return (
    <Link
      aria-label="Your money"
      className={cn(
        "tile tile--pear focus-visible:ring-ring/50 short:p-3 flex items-center justify-between gap-3 p-4 outline-none focus-visible:ring-3 sm:flex-col sm:items-stretch sm:gap-5 sm:p-5",
        className
      )}
      to="/wallet"
    >
      <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap">
            Your money
          </span>
          {simulated ? <Badge variant="outline">Simulated</Badge> : null}
        </span>
        <span className="text-muted-foreground short:hidden text-xs sm:hidden">
          {simulated ? "Play money. Real receipts." : "Dollars, in and out."}
        </span>
      </span>
      <span className="sm:text-money shrink-0 text-2xl font-semibold tracking-tight tabular-nums">
        {amount}
      </span>
      <span className="text-muted-foreground hidden text-xs sm:block">
        {simulated
          ? "Play money. Real receipts."
          : "Add money or take it out whenever you like."}
      </span>
    </Link>
  );
};
