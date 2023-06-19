import { ObjectPool } from "../Game/ObjectPool";
import { CardObject } from "../Game/Card/CardObject";
import { CardGroupObject } from "../Game/Container/CardGroupObject";
import { GameLogMessageObject } from "../Game/GameLog/GameLogMessageObject";

interface PoolTemplates {
  card: CardObject;
  cardGroup: CardGroupObject;
  logMessage: GameLogMessageObject;
}

export default class GamePools {
  public static initialized: boolean = false;
  public static cardPool: ObjectPool<CardObject>;
  public static cardGroupPool: ObjectPool<CardGroupObject>;
  public static logMessagePool: ObjectPool<GameLogMessageObject>;

  public static init(templates: PoolTemplates) {
    if (!this.initialized) {
      const { card, cardGroup, logMessage } = templates;
      GamePools.cardPool = new ObjectPool<CardObject>(card);
      GamePools.cardGroupPool = new ObjectPool<CardGroupObject>(cardGroup);
      GamePools.logMessagePool = new ObjectPool<GameLogMessageObject>(logMessage);
      this.initialized = true;
    }
  }
}
