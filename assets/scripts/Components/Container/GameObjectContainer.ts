import { _decorator } from "cc";
import { DataBasic } from "../../DataBasic";
import { GameObject } from "../../GameObject";
import { DataContainer } from "./DataContainer";
const { ccclass } = _decorator;

@ccclass("GameObjectContainer")
export abstract class GameObjectContainer extends GameObject<DataContainer<DataBasic>> {
  abstract init(): void;

  abstract onDataAdded(data: DataBasic | DataBasic[]): void;

  abstract onDataRemoved(data: DataBasic | DataBasic[]): void;

  abstract onAllDataRemoved(): void;
}
