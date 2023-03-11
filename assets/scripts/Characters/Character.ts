import { Skill } from "../Skills/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { CardUsage, CardStatus } from "../Cards/type";
import { Card } from "../Cards/Card";
import EventTarget from "../Event/EventTarget";
import { GameEvent } from "../Event/type";

export class Character {
  protected _id: number;
  protected _name: string;
  protected _sprite: string;
  protected _status: CharacterStatus;
  protected _sex: Sex;
  protected _skills: Skill[];

  public static readonly _backSprite = "images/characters/Unknown";

  get status() {
    return this._status;
  }
  set status(status: CharacterStatus) {
    if (status !== this._status) {
      this._status = status;
      EventTarget.emit(GameEvent.CHARACTER_STATUS_CHANGE, status);
    }
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

  constructor(options: CharacterOptions) {
    this._id = options.id;
    this._name = options.name;
    this._sprite = options.sprite;
    this._status = options.status || CharacterStatus.FACE_UP;
    this._sex = options.sex;
    this._skills = options.skills;
  }

  //翻面
  public flip(): void {
    if (this.status === CharacterStatus.FACE_UP) {
      this.status = CharacterStatus.FACE_DOWN;
    } else {
      this.status = CharacterStatus.FACE_UP;
    }
  }

  //技能
  public useSkill(index: number): void {
    if (index >= this._skills.length) {
      return;
    }
  }
}
