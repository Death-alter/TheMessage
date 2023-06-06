import { GamePhase } from "../../GameManager/type";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { ActiveSkillOption, SkillOption } from "./type";

export abstract class Skill {
  protected _name: string;
  protected _description: string;

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  constructor(option: SkillOption) {
    this._name = option.name;
    this._description = option.description;
  }

  abstract init(gameData: GameData): void;

  abstract dispose(): void;
}

export abstract class ActiveSkill extends Skill {
  protected _useablePhase: GamePhase[];

  get useablePhase() {
    return this._useablePhase;
  }

  constructor(option: ActiveSkillOption) {
    super(option);
    this._useablePhase = option.useablePhase;
  }
}

export abstract class TriggerSkill extends Skill {
  abstract onTrigger(gameData: GameData, params: { [index: string]: any }): void;
}

export abstract class PassiveSkill extends Skill {}
