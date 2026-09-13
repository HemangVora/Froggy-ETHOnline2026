import { formatUsd } from "@froggy/domain";
import { Badge } from "@froggy/ui/components/badge";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactElement } from "react";

import { walletAmounts } from "../../lib/wallet-view";
import { useWorkspace } from "../../lib/workspace-context";

/** Funding balances are not holdings valuation or reservation-adjusted buying power. */
export const HomeSummary = (): ReactElement => {
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
      className="hum-tile hum-tile--pear home-money focus-visible:ring-ring outline-none focus-visible:ring-3"
      data-slot="home-money"
      to="/wallet"
    >
      <span className="home-money-heading">
        <span>Your money</span>
        <ArrowUpRightIcon aria-hidden />
      </span>
      <span className="home-money-amount">{amount}</span>
      <span className="home-money-foot">
        <span>
          {simulated ? "Play money. Real receipts." : "Ready for a task."}
        </span>
        {simulated ? <Badge variant="outline">Simulated</Badge> : null}
      </span>
    </Link>
  );
};
