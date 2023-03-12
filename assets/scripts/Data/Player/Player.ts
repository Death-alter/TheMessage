import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";
import { CharacterPanting } from "../../UI/Game/Character/CharacterPanting";
import { PlayerUI } from "../../UI/Game/Player/PlayerUI";
import { PlayerOption } from "./type";

export default class Player {
  public static readonly seatNumberText: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  public static turnPlayerId: number;

  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[];
  private _seatNumber: number;
  private _UI: PlayerUI;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }
  set character(character: Character) {
    this._character = character;
  }

  get identityList() {
    return this._identityList;
  }

  get isTurnPlayer(): boolean {
    return this._id === Player.turnPlayerId;
  }

  get seatNumber() {
    return this._seatNumber;
  }
  set seatNumber(number) {
    this._seatNumber = number;
  }

  get UI() {
    return this._UI;
  }

  constructor(option: PlayerOption) {
    this._id = option.id;
    this._name = option.name;
    this._character = option.character;
    if (option.identity != null) {
    }
  }

  bindUI(scrpit: PlayerUI) {
    this._UI = scrpit;
    this._UI.player = this;
    this.character.bindUI(this._UI.node.getChildByPath("Border/CharacterPanting").getComponent(CharacterPanting));
  }
}
