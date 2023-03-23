import { _decorator, Sprite } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogTextObject")
export class GameLogTextObject extends GameObject<GameLog> {

}
