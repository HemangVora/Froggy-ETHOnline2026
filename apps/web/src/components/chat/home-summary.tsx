import { formatUsd } from "@froggy/domain";
import { Badge } from "@froggy/ui/components/badge";
import { cn } from "@froggy/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactElement } from "react";

import { walletAmounts } from "../../lib/wallet-view";
import { useWorkspace } from "../../lib/workspace-context";

/**
 * The balance strip on Home. One figure, in dollars, and the truth about it:
 * simulated money says so, on the strip, in words, at every width.
 *
 * The whole strip is the link to the wallet, so the arrow is a sign, not a
 * second control. Funding balances are not holdings valuation or
 * reservation-adjusted buying power; the wallet page has the detail.
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
        "tile tile--pear focus-visible:ring-ring/50 short:p-3 group flex items-center justify-between gap-3 p-4 outline-none focus-visible:ring-3 sm:px-5",
        className
      )}
      to="/wallet"
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="short:flex-col short:items-start short:gap-0.5 flex items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap">
            Your money
          </span>
          {simulated ? <Badge variant="outline">Simulated</Badge> : null}
        </span>
        <span className="text-muted-foreground short:hidden text-xs">
          {simulated
            ? "Play money. Real receipts."
            : "Add money or take it out whenever you like."}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="short:text-lg text-2xl font-semibold tracking-tight tabular-nums sm:text-[1.75rem]">
          {amount}
        </span>
        <ArrowUpRightIcon
          aria-hidden
          className="text-brand size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </span>
    </Link>
  );
};
