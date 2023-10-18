import { Skill } from "../Skill/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { DataBasic } from "../../DataBasic";

export class Character extends DataBasic {
  protected _id: number;
  protected _name: string;
  protected _sprite: string;
  protected _status: CharacterStatus;
  protected _sex: Sex;
  protected _skills: Skill[] = [];
  protected _isHidden: boolean;

  public static readonly backSprite: string = "images/characters/Unknown";

  get status() {
    return this._status;
  }
  set status(status: CharacterStatus) {
    if (status == null || status === this._status) return;
    this._status = status;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get sprite() {
    return this._sprite;
  }

  get sex() {
    return this._sex;
  }

  get skills() {
    return this._skills;
  }

  get isHidden() {
    return this._isHidden;
  }

  constructor(option: CharacterOptions) {
    super();
    this._id = option.id;
    this._name = option.name;
    this._sprite = option.sprite;
    this._isHidden = option.isHidden;
    this._status = this._isHidden ? CharacterStatus.FACE_DOWN : CharacterStatus.FACE_UP;
    this._sex = option.sex;
  }

  //翻面
  flip() {
    if (this.status === CharacterStatus.FACE_UP) {
      this.status = CharacterStatus.FACE_DOWN;
    } else {
      this.status = CharacterStatus.FACE_UP;
    }
  }

  //技能
  useSkill(index: number) {
    if (index >= this._skills.length) {
      return;
    }
  }

  setSkills(skills: Skill[]) {
    this._skills = skills;
  }
}
