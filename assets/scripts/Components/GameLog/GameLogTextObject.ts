import { _decorator, Label, Sprite } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogTextObject")
export class GameLogTextObject extends GameObject<GameLog> {
  setText(str) {
    this.getComponentInChildren(Label).string = str;
  }
}
