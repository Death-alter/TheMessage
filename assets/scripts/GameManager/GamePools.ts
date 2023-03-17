import { ObjectPool } from "../Game/ObjectPool";
import { CardObject } from "../Game/Card/CardObject";
import { CardGroupObject } from "../Game/Container/CardGroupObject";

interface PoolTemplates {
  card: CardObject;
  cardGroup: CardGroupObject;
}

export default class GamePools {
  public static Initialized: boolean = false;
  public static cardPool: ObjectPool<CardObject>;
  public static cardGroupPool: ObjectPool<CardGroupObject>;

  public static init(templates: PoolTemplates) {
    if (!this.Initialized) {
      const { card, cardGroup } = templates;
      GamePools.cardPool = new ObjectPool<CardObject>(card);
      GamePools.cardGroupPool = new ObjectPool<CardGroupObject>(cardGroup);
      this.Initialized = true;
    }
  }
}
