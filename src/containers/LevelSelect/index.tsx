import React, { Dispatch, FC, useCallback, useTransition } from "react";
import { LevelSelectComponent } from "~/components/LevelSelect";
import { LevelDoc } from "~/db/level";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";
import { AppAction } from "../App/logic";

export const LevelSelect: FC<{
  dispatch: Dispatch<AppAction>;
  clearedLevelsFetcher: Fetcher<LevelDoc[]>;
}> = ({ dispatch, clearedLevelsFetcher }) => {
  const [startTransition] = useTransition();
  const onSelect = useCallback(
    (level: Level) => {
      startTransition(() => {
        dispatch({
          type: "goToLevel",
          level,
        });
      });
    },
    [dispatch],
  );

  const clearedLevels = clearedLevelsFetcher.get();

  return (
    <LevelSelectComponent onSelect={onSelect} clearedLevels={clearedLevels} />
  );
};