import { _decorator, Sprite } from "cc";
import { GameObject } from "../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogMessageObject")
export class GameLogMessageObject extends GameObject<GameLog> {

}
