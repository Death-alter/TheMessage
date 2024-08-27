import { Node } from "cc";
import { CardEntity } from "../Card/CardEntity";
import { CardUsableStatus } from "../Card/type";
import { CardGroupEntity } from "../Container/CardGroupEntity";
import { GameLogMessageEntity } from "../GameLog/GameLogMessageEntity";
import { OuterGlow } from "../Utils/OuterGlow";
import { EntityPool } from "./EntityPool";

interface PoolTemplates {
  card: CardEntity;
  cardGroup: CardGroupEntity;
  logMessage: GameLogMessageEntity;
}

export default class GamePools {
  public static initialized: boolean = false;
  public static cardPool: EntityPool<CardEntity>;
  public static cardGroupPool: EntityPool<CardGroupEntity>;
  public static logMessagePool: EntityPool<GameLogMessageEntity>;

  public static init(templates: PoolTemplates) {
    const { card, cardGroup, logMessage } = templates;
    GamePools.cardPool = new EntityPool<CardEntity>(card);
    GamePools.cardGroupPool = new EntityPool<CardGroupEntity>(cardGroup);
    GamePools.logMessagePool = new EntityPool<GameLogMessageEntity>(logMessage);
    GamePools.cardPool.beforePut((object: CardEntity) => {
      object.usableStatus = CardUsableStatus.USABLE;
      object.node.angle = 0;
      object.getComponentInChildren(OuterGlow).closeOuterGlow();
      object.node.off(Node.EventType.TOUCH_END);
    });
  }
}
