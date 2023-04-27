import { _decorator } from "cc";
import { DataBasic } from "../../DataBasic";
import { GameObject } from "../../GameObject";
import { DataContainer } from "./DataContainer";
const { ccclass } = _decorator;

@ccclass("GameObjectContainer")
export abstract class GameObjectContainer<T extends GameObject<DataBasic<T>>> extends GameObject<
  DataContainer<DataBasic<T>>
> {
  abstract init(): void;

  abstract onDataAdded(data: DataBasic<T>): void;

  abstract onDataRemoved(data: DataBasic<T>): void;

  abstract onAllDataRemoved(): void;
}
