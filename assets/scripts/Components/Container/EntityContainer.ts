import { _decorator } from "cc";
import { DataBasic } from "../../DataBasic";
import { Entity } from "../../Entity";
import { DataContainer } from "./DataContainer";
const { ccclass } = _decorator;

@ccclass("EntityContainer")
export abstract class EntityContainer<T extends Entity<any>> extends Entity<DataContainer<DataBasic<T>>> {
  abstract init(): void;

  abstract onDataAdded(data: DataBasic<T> | DataBasic<T>[]): void;

  abstract onDataRemoved(data: DataBasic<T> | DataBasic<T>[]): void;

  abstract onAllDataRemoved(): void;
}
