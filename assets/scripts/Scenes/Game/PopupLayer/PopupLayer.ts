import { _decorator, Component, instantiate, Prefab, Node } from "cc";
import { GameManager } from "../../../Manager/GameManager";
import { ShowCardsWindow } from "./ShowCardsWindow";
import { StartSelectCharacter } from "../../../Event/UIEventType";
import { CharacterType } from "../../../Components/Chatacter/type";
import { createIdentity } from "../../../Components/Identity";
import { IdentityType, SecretTaskType } from "../../../Components/Identity/type";
import { SyncStatus } from "../../../Manager/type";
import { SelectCharacter } from "./SelectCharacter";
import { ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { ProcessEvent, UIEvent } from "../../../Event/type";
import { Winner } from "./Winner";
import { Player } from "../../../Components/Player/Player";
import { copyCard } from "../../../Components/Card";
import { Card } from "../../../Components/Card/Card";
import { CardObject } from "../../../Components/Card/CardObject";
import { CharacterObject } from "../../../Components/Chatacter/CharacterObject";
import { CardInfoWindow } from "./CardInfoWindow";
import { CharacterInfoWindow } from "./CharacterInfoWindow";
import { SelectIdentity } from "./SelectIdentity";

const { ccclass, property } = _decorator;

@ccclass("PopupLayer")
export class PopupLayer extends Component {
  @property(Prefab)
  showCardWindowPrefab: Prefab | null = null;
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameResultWindow: Node | null = null;
  @property(Node)
  cardInfoWindow: Node | null = null;
  @property(Node)
  characterInfoWindow: Node | null = null;
  @property(Node)
  selectIdentityWindow: Node | null = null;

  public manager: GameManager;
  public showCardsWindow: ShowCardsWindow;
  public messagesWindow: ShowCardsWindow;
  public characterInfo: CharacterInfoWindow;
  public cardInfo: CardInfoWindow;

  init(manager: GameManager) {
    this.manager = manager;

    const messagesWindowNode = instantiate(this.showCardWindowPrefab);
    this.node.addChild(messagesWindowNode);
    messagesWindowNode.active = false;
    this.messagesWindow = messagesWindowNode.getComponent(ShowCardsWindow);

    const showCardsWindowNode = instantiate(this.showCardWindowPrefab);
    this.node.addChild(showCardsWindowNode);
    showCardsWindowNode.active = false;
    this.showCardsWindow = showCardsWindowNode.getComponent(ShowCardsWindow);

    this.characterInfo = this.characterInfoWindow.getComponent(CharacterInfoWindow);
    this.characterInfo.init();
    this.cardInfo = this.cardInfoWindow.getComponent(CardInfoWindow);
  }

  startRender() {
    ProcessEventCenter.on(ProcessEvent.COUNT_DOWN_TIMEOUT, this.onCountDownTimeout, this);
    UIEventCenter.on(UIEvent.START_CHOOSE_CHARACTER, this.startSelectCharacter, this);
    UIEventCenter.on(UIEvent.STOP_CHOOSE_CHARACTER, this.stopSelectCharacter, this);
    UIEventCenter.on(UIEvent.START_SHOW_CARDS, this.showCardsWindow.show, this.showCardsWindow);
    UIEventCenter.on(UIEvent.STOP_SHOW_CARDS, this.showCardsWindow.hide, this.showCardsWindow);
    UIEventCenter.on(UIEvent.START_SHOW_MESSAGES, this.showMessages, this);
    UIEventCenter.on(UIEvent.STOP_SHOW_MESSAGES, this.messagesWindow.hide, this.messagesWindow);
    this.selectIdentityWindow.getComponent(SelectIdentity).init();
  }

  stopRender() {
    ProcessEventCenter.off(ProcessEvent.COUNT_DOWN_TIMEOUT, this.onCountDownTimeout, this);
    UIEventCenter.off(UIEvent.START_CHOOSE_CHARACTER, this.startSelectCharacter, this);
    UIEventCenter.off(UIEvent.STOP_CHOOSE_CHARACTER, this.stopSelectCharacter, this);
    UIEventCenter.off(UIEvent.START_SHOW_CARDS, this.showCardsWindow.show, this.showCardsWindow);
    UIEventCenter.off(UIEvent.STOP_SHOW_CARDS, this.showCardsWindow.hide, this.showCardsWindow);
    UIEventCenter.off(UIEvent.START_SHOW_MESSAGES, this.showMessages, this);
    UIEventCenter.off(UIEvent.STOP_SHOW_MESSAGES, this.messagesWindow.hide, this.messagesWindow);
    this.selectIdentityWindow.getComponent(SelectIdentity).dispose();
  }

  startSelectCharacter(data: StartSelectCharacter) {
    if (this.manager.syncStatus !== SyncStatus.IS_SYNCING) {
      this.selectCharacterWindow.getComponent(SelectCharacter).init(
        {
          playerCount: data.playerCount,
          identity: data.identity!=null
            ? createIdentity((<number>data.identity) as IdentityType, (<number>data.secretTask) as SecretTaskType)
            : null,
          roles: (<number[]>data.characterIdList) as CharacterType[],
          waitingSecond: data.waitingSecond,
          secretTaskList: data.secretTaskList
            ? data.secretTaskList.map((task) => {
                return createIdentity(IdentityType.GREEN, (<number>task) as SecretTaskType);
              })
            : [],
          position: data.position,
        },
        data.confirm || this.selectCharacterWindow.getComponent(SelectCharacter).confirmCharacter
      );
    }
  }

  stopSelectCharacter() {
    this.selectCharacterWindow.getComponent(SelectCharacter).hide();
  }

  onCountDownTimeout() {
    this.showCardsWindow.hide();
  }

  showGameResult(data, isRecord: boolean) {
    this.gameResultWindow.getComponent(Winner).init(data, isRecord);
    this.gameResultWindow.active = true;
  }

  showMessages(player: Player);
  showMessages(playerId: number);
  showMessages(player: Player | number) {
    if (!(player instanceof Player)) {
      player = this.manager.data.playerList[player];
    }

    this.messagesWindow.show({
      title: `${this.manager.data.gameLog.formatPlayer(player)}的情报区`,
      limit: 0,
      cardList: player.getMessagesCopy(),
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            this.messagesWindow.hide();
          },
        },
      ],
    });
  }

  showCharacterInfo(event) {
    this.characterInfoWindow.active = true;
    const character = (<Node>(<unknown>event.target)).getComponent(CharacterObject).data;
    this.characterInfo.setCharacterInfo(character);
  }

  setCharacterInfoPosition(event) {
    this.characterInfo.setPosition(event);
  }

  hideCharacterInfo() {
    this.characterInfoWindow.active = false;
  }

  showCardInfo(card: Card) {
    this.cardInfo.card = copyCard(card);
    this.cardInfo.card.gameObject = this.cardInfo.node.getComponentInChildren(CardObject);
    this.cardInfo.show();
  }

  hideCardInfo() {
    this.cardInfo.hide();
  }
}
