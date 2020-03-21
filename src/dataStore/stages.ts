import level1 from "~/definitions/stages/level1";
import level2 from "~/definitions/stages/level2";
import { Level, levels } from "~/definitions/stages/levels";
import { StageDefinition } from "~/stages/stageDefinition";

/**
 * Data store which holds stage data.
 */
export class StageStore {
  /**
   * Loaded levels.
   */
  private levels: Partial<Record<Level, readonly StageDefinition[]>> = {};
  /**
   * Map from stage ID to level.
   */
  private stageToLevel: Map<string, Level> = new Map();

  constructor() {
    this.loadStages(levels[1], level1);
    this.loadStages(levels[2], level2);
  }

  /**
   * Returns the stage with given ID.
   * If such a stage does not exist, throws a Promise.
   */
  public getStage(id: string) {
    const level = this.stageToLevel.get(id);
    const stages = level && this.levels[level];
    if (stages) {
      const s = stages.find(s => s.id === id);
      if (s) {
        return s;
      }
    }
    // TODO
    throw new Error("Stage does not exist");
  }

  /**
   * Returns the list of stages of given level.
   */
  public getStagesInLevel(level: Level) {
    return this.levels[level] ?? [];
  }

  private loadStages(level: Level, stages: StageDefinition[]) {
    this.levels[level] = [...stages];
    for (const stage of stages) {
      this.stageToLevel.set(stage.id, level);
    }
  }
}
