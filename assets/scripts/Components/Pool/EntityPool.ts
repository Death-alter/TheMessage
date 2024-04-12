import { _decorator, instantiate, NodePool } from "cc";
import { Entity } from "../../Entity";

export class EntityPool<T extends Entity<any>> {
  private pool: NodePool = new NodePool();
  private template: T = null;

  private beforePutHandler: (object: T) => void;

  get size() {
    return this.pool.size();
  }

  constructor(object: T) {
    this.template = object;
  }

  get() {
    const node = this.pool.get();
    if (node) {
      return node.getComponent(Entity) as T;
    } else {
      return this.create();
    }
  }

  put(entity: T) {
    if (entity && entity.node) {
      if (this.beforePutHandler) this.beforePutHandler(entity);
      this.pool.put(entity.node);
    }
  }

  create() {
    const newEntity = instantiate(this.template.node);
    return newEntity.getComponent(Entity) as T;
  }

  clear() {
    this.pool.clear();
  }

  beforePut(f: (object: T) => void) {
    this.beforePutHandler = f;
  }
}
