import { Character } from "../Characters/Character";
import { SkillType, SkillOption, TriggeringSkillOption } from "./type";

export class Skill {
  private _name: string;
  private _character: Character;
  private _type: SkillType;

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }

  get type() {
    return this._type;
  }

  constructor(option: SkillOption) {
    this._character = option.character;
    this._type = option.type;
  }
}

//被动技能，持续生效
export abstract class PassiveSkill extends Skill {
  constructor(character: Character) {
    super({
      character,
      type: SkillType.PASSIVE,
    });
  }
}

//主动技能，在可以使用的阶段点击按钮发动
export abstract class ActiveSkill extends Skill {
  constructor(character: Character) {
    super({
      character,
      type: SkillType.ACTIVE,
    });
  }

  abstract onUse(): void;
}

//触发类技能，满足条件提示是否发动
export abstract class TriggeringSkill extends Skill {
  protected _triggerEvent: string;

  constructor(options: TriggeringSkillOption) {
    super({
      character: options.character,
      type: SkillType.TRIGGERING,
    });
    this._triggerEvent = options.triggerEvent;
  }

  abstract onUse(): void;
}
