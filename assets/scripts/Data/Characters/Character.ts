import { Skill } from "../Skills/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { CharacterPanting } from "../../UI/Game/Character/CharacterPanting";
import { DataClass } from "../type";

export class Character extends DataClass {
  protected _id: number;
  protected _name: string;
  protected _sprite: string;
  protected _status: CharacterStatus;
  protected _sex: Sex;
  protected _skills: Skill[];
  protected _UI: CharacterPanting;

  get status() {
    return this._status;
  }
  set status(status: CharacterStatus) {
    if (status !== this._status) {
      this._status = status;
      if (this._UI) {
        if (this.status === CharacterStatus.FACE_DOWN) {
          this._UI.showCover();
        } else {
          this._UI.hideCover();
        }
      }
      // EventTarget.emit(GameEvent.CHARACTER_STATUS_CHANGE, status);
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

  get UI() {
    return this._UI;
  }

  constructor(option: CharacterOptions) {
    super(option.UI);
    this._id = option.id;
    this._name = option.name;
    this._sprite = option.sprite;
    this._status = option.status == null ? CharacterStatus.FACE_UP : option.status;
    this._sex = option.sex;
    this._skills = option.skills;
  }

  //翻面
  flip(){
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

  bindUI(script: CharacterPanting) {
    this._UI = script;
    this._UI.character = this;
  }
}
