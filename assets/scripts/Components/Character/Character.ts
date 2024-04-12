import { Skill } from "../Skill/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { CharacterEntity } from "./CharacterEntity";
import { DataBasic } from "../../DataBasic";

export class Character extends DataBasic<CharacterEntity> {
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
    if (this.entity) {
      if (this._status === CharacterStatus.FACE_DOWN) {
        this.entity.showCover();
      } else {
        this.entity.hideCover();
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

  get isHidden() {
    return this._isHidden;
  }

  constructor(option: CharacterOptions) {
    super();
    this._id = option.id;
    this._name = option.name;
    this._sprite = option.sprite;
    this._status = option.status == null ? CharacterStatus.FACE_UP : option.status;
    this._isHidden = this._status === CharacterStatus.FACE_DOWN;
    this._sex = option.sex;
    if (option.entity) {
      this.entity = option.entity;
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

  setSkills(skills: Skill[]) {
    this._skills = skills;
  }
}
