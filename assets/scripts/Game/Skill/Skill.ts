import { Character } from "../Character/Character";
import { SkillType, SkillOption, ActiveSkillOption, PassiveSkillOption, SkillCondition } from "./type";

export abstract class Skill {
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

export abstract class ActiveSkill extends Skill {
  protected _condition: SkillCondition[];

  get condition() {
    return this._condition;
  }

  constructor(option: ActiveSkillOption) {
    super({
      name: option.name,
      character: option.character,
      type: SkillType.ACTIVE,
      description: option.description,
    });
    this._condition = option.condition;
  }

  abstract onUse(): void;
}

export abstract class PassiveSkill extends Skill {
  constructor(option: PassiveSkillOption) {
    super({
      name: option.name,
      character: option.character,
      type: SkillType.PASSIVE,
      description: option.description,
    });
  }
}
