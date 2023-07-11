import { DataBasic } from "../../DataBasic";
import { GamePhase } from "../../GameManager/type";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { GameUI } from "../../UI/Game/GameWindow/GameUI";
import { Character } from "../Character/Character";
import { Player } from "../Player/Player";
import { SkillButton } from "./SkillButton";
import { ActiveSkillOption, SkillOption } from "./type";

export abstract class Skill extends DataBasic<SkillButton> {
  protected _name: string;
  protected _description: string;
  protected _character: Character;

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  constructor(option: SkillOption) {
    super();
    this._name = option.name;
    this._description = option.description;
    this._character = option.character;
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //player是拥有该技能的角色
  abstract init(gameData: GameData, player: Player): void;

  abstract dispose(): void;
}

export abstract class ActiveSkill extends Skill {
  protected _useablePhase: GamePhase[];

  abstract get useable(): boolean;

  get useablePhase() {
    return this._useablePhase;
  }

  constructor(option: ActiveSkillOption) {
    super(option);
    this._useablePhase = option.useablePhase;
  }

  abstract onUse(gui: GameUI);
}

export abstract class TriggerSkill extends Skill {
  abstract onTrigger(gui: GameUI, params: { [index: string]: any }): void;
}

export abstract class PassiveSkill extends Skill {}
