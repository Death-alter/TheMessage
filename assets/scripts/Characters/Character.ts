import { Skill } from "../Skills/Skill";
import { CharacterOptions, CharacterStatus, Sex } from "./type";
import { CardUseage, CardStatus } from "../Cards/type";
import { Card } from "../Cards/Card";
import EventTarget from "../Event/EventTarget";
import { GameEvent } from "../Event/type";

export class Character {
  protected _id: number;
  protected _name: string;
  protected _spirit: string;
  protected _status: CharacterStatus;
  protected _sex: Sex;
  protected _skills: Skill[];

  public readonly messages: Card[] = [];

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

  get spirit() {
    return this._spirit;
  }

  get sex() {
    return this._sex;
  }

  constructor(options: CharacterOptions) {
    this._id = options.id;
    this._name = options.name;
    this._spirit = options.spirit;
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

  //情报置入情报区
  public addMessage(message: Card): void {
    if (message.useage !== CardUseage.MESSAGE_CARD) message.useage = CardUseage.MESSAGE_CARD;
    if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    this.messages.push(message);
  }

  //接收情报
  public acceptMessage(message: Card): void {
    this.addMessage(message);
    EventTarget.emit(GameEvent.ACCEPT_MESSAGE, this._id, message);
  }

  //从情报区移除情报
  public removeMessage(index: number): Card {
    return this.messages.splice(index, 1)[0];
  }
}
