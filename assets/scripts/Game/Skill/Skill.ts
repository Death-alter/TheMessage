import { GamePhase } from "../../GameManager/type";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { Player } from "../Player/Player";
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

  //player是拥有该技能的角色
  abstract init(gameData: GameData, player: Player): void;

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

  abstract onUse(gameData: GameData);
}

export abstract class TriggerSkill extends Skill {
  abstract onTrigger(gameData: GameData, params: { [index: string]: any }): void;
}

export abstract class PassiveSkill extends Skill {}
