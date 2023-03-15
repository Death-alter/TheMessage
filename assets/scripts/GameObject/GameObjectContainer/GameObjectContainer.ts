import { _decorator } from "cc";
import { DataBasic } from "../../Data/DataBasic";
import { GameObject } from "../GameObject";
import { DataContainer } from "../../Data/DataContainer/DataContainer";
const { ccclass } = _decorator;

@ccclass("GameObjectContainer")
export abstract class GameObjectContainer<T extends GameObject<any>, U extends DataBasic<any>> extends GameObject<
  DataContainer<U, T>
> {
  abstract init(): void;

  abstract onDataAdded(data: U): void;

  abstract onDataRemoved(data: U): void;

  abstract onAllDataRemoved(): void;
}
