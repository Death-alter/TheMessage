import { _decorator, instantiate, NodePool } from "cc";
import { GameObject } from "./GameObject";

export class ObjectPool<T extends GameObject<any>> {
  private pool: NodePool = new NodePool();
  private template: T = null;

  get size() {
    return this.pool.size();
  }

  constructor(object: T) {
    this.template = object;
    this.pool.put(object.node);
  }

  get() {
    const node = this.pool.get();
    if (node) {
      return node.getComponent(GameObject) as T;
    } else {
      return this.create();
    }
  }

  put(gameObject: T) {
    this.pool.put(gameObject.node);
  }

  create() {
    const newObject = instantiate(this.template.node);
    this.pool.put(newObject);
    return newObject.getComponent(GameObject) as T;
  }

  clear() {
    this.pool.clear();
  }
}
