import { _decorator, Component, Node, resources } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacterWindow/SelectCharacter";
import { ProcessEventCenter } from "../Event/EventTarget";
import { ProcessEvent } from "../Event/type";
import { createIdentity } from "../Game/Identity";
import { Identity } from "../Game/Identity/Identity";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
import { CharacterType } from "../Game/Character/type";
import { Player } from "../Game/Player/Player";
import { CardAction } from "./CardAction";
import { Tooltip } from "./Tooltip";
import { GameData } from "../UI/Game/GameWindow/GameData";
import * as ProcessEventType from "../Event/ProcessEventType";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameWindow: Node | null = null;

  public identity: Identity;
  public selfPlayer: Player;
  public playerCharacterIdList: number[];
  public cardAction: CardAction;
  public toolTip: Tooltip;
  public gameData: GameData;

  onLoad() {
    this.gameData = new GameData();
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    ProcessEventCenter.on(ProcessEvent.START_SELECT_CHARACTER, (data: ProcessEventType.StartSelectCharacter) => {
      this.identity = createIdentity(
        (<unknown>data.identity) as IdentityType,
        (<unknown>data.secretTask) as SecretTaskType
      );
      this.playerCharacterIdList = data.characterIdList;
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: this.identity,
        roles: (<unknown[]>data.characterIdList) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    });

    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, (data: ProcessEventType.InitGame) => {
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
      this.gameWindow.active = true;
      //预加载卡图
      resources.preloadDir("images/cards");
    });

    this.gameData.registerEvents();
  }

  onDisable() {
    //移除事件监听
    this.gameData.unregisterEvents();
  }
}
