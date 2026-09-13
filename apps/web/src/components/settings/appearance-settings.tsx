import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@froggy/ui/components/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@froggy/ui/components/toggle-group";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import type { ReactElement } from "react";

import { keyboardInteraction, UI_EASE } from "../../lib/motion";
import { useTheme } from "../../lib/theme";

export const AppearanceSettings = (): ReactElement => {
  const { theme, setTheme } = useTheme();
  const descriptionId = useId();
  const reduced = useReducedMotion() === true;
  const position = { hum: 0, passbook: 100, lilypad: 200, system: 300 }[theme];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription id={descriptionId}>
          Hum is light and warm. Passbook is light and quiet. Lilypad is dark.
          System is Hum by day and Lilypad by night. Your choice is saved in
          this browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted shadow-inset relative rounded-xl p-1">
          <div aria-hidden className="pointer-events-none absolute inset-1">
            <motion.div
              animate={{ transform: `translateX(${position}%)` }}
              className="h-full w-1/4 p-0.5"
              data-slot="appearance-indicator"
              initial={false}
              transition={{
                duration: reduced || keyboardInteraction() ? 0 : 0.2,
                ease: UI_EASE,
              }}
            >
              <div className="bg-card shadow-control h-full rounded-lg" />
            </motion.div>
          </div>
          <ToggleGroup
            aria-describedby={descriptionId}
            aria-label="Appearance"
            className="relative grid w-full grid-cols-4"
            spacing={0}
            onValueChange={(values) => {
              setTheme(values[0]);
            }}
            value={[theme]}
            variant="default"
          >
            <ToggleGroupItem className="appearance-choice min-w-0" value="hum">
              Hum
            </ToggleGroupItem>
            <ToggleGroupItem
              className="appearance-choice min-w-0"
              value="passbook"
            >
              Passbook
            </ToggleGroupItem>
            <ToggleGroupItem
              className="appearance-choice min-w-0"
              value="lilypad"
            >
              Lilypad
            </ToggleGroupItem>
            <ToggleGroupItem
              className="appearance-choice min-w-0"
              value="system"
            >
              System
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};
