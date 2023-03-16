import { Skill } from "../Skills/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { CharacterObject } from "../../GameObject/Character/CharacterObject";
import { DataBasic } from "../DataBasic";

export class Character extends DataBasic<CharacterObject> {
  protected _id: number;
  protected _name: string;
  protected _sprite: string;
  protected _status: CharacterStatus;
  protected _sex: Sex;
  protected _skills: Skill[];

  public static readonly backSprite: string = "images/characters/Unknown";

  get status() {
    return this._status;
  }
  set status(status: CharacterStatus) {
    if (status == null || status === this._status) return;
    this._status = status;
    if (this.gameObject) {
      if (this._status === CharacterStatus.FACE_DOWN) {
        this.gameObject.showCover();
      } else {
        this.gameObject.hideCover();
      }
    }
    // EventTarget.emit(GameEvent.CHARACTER_STATUS_CHANGE, status);
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

  constructor(option: CharacterOptions) {
    super();
    this._id = option.id;
    this._name = option.name;
    this._sprite = option.sprite;
    this._status = option.status == null ? CharacterStatus.FACE_UP : option.status;
    this._sex = option.sex;
    this._skills = option.skills;
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
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
}
