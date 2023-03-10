import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";
import { PlayerOption } from "./type";

export default class Player {
  public static readonly seatNumberText: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

  private _name: string;
  private _character: Character;
  private _identityList: Identity[];
  private _isTurnPlayer: boolean = false;
  private _seatNumber: number;

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }

  get identity() {
    return this._identityList;
  }

  get isCurrentTurnPlayer() {
    return this._isTurnPlayer;
  }
  set isCurrentTurnPlayer(value) {
    this._isTurnPlayer = value;
  }

  get seatNumber() {
    return this._seatNumber;
  }

  constructor(option: PlayerOption) {
    this._name = option.name;
    this._character = option.character;
    if (option.identity != null) {
    }
  }
}
