import { GameEvent } from "../../Event/type";
import { GamePhase } from "../../Game/type";
import { Character } from "../Characters/Character";
import { SkillType, SkillOption, TriggeringSkillOption } from "./type";

export class Skill {
  protected _name: string;
  protected _character: Character;
  protected _type: SkillType;
  protected _description: string;

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }

  get type() {
    return this._type;
  }

  get description() {
    return this._description;
  }

  constructor(option: SkillOption) {
    this._name = option.name;
    this._character = option.character;
    this._type = option.type;
    this._description = option.description;
  }
}

//被动技能，持续生效
export abstract class PassiveSkill extends Skill {
  constructor(option: SkillOption) {
    super({
      name: option.name,
      character: option.character,
      description: option.description,
      type: SkillType.PASSIVE,
    });
  }
}

//主动技能，在可以使用时机点击按钮发动
export abstract class ActiveSkill extends Skill {
  constructor(option: SkillOption) {
    super({
      name: option.name,
      character: option.character,
      description: option.description,
      type: SkillType.ACTIVE,
    });
  }

  abstract onUse(): void;

  abstract enabled(playerId: number, phase: GamePhase): boolean;
}

//触发类技能，满足条件时提示是否使用
export abstract class TriggeringSkill extends Skill {
  protected _triggerEvent: GameEvent[];

  get triggerEvent() {
    return this._triggerEvent;
  }

  constructor(option: TriggeringSkillOption) {
    super({
      name: option.name,
      character: option.character,
      description: option.description,
      type: SkillType.ACTIVE,
    });

    this._triggerEvent = option.triggerEvent;
  }

  abstract onTrigger(...args: any[]): void;

  abstract onUse(): void;
}

//包含主动使用和触发两种使用条件
export abstract class A_T_Skill extends Skill {
  protected _triggerEvent: GameEvent[];

  get triggerEvent() {
    return this._triggerEvent;
  }

  constructor(option: TriggeringSkillOption) {
    super({
      name: option.name,
      character: option.character,
      description: option.description,
      type: SkillType.ACTIVE,
    });

    this._triggerEvent = option.triggerEvent;
  }

  abstract onTrigger(...args: any[]): void;

  abstract onUse(): void;

  abstract enabled(playerId: number, phase: GamePhase): boolean;
}
