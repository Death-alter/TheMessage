import { Character } from "../Character/Character";
import { Identity } from "../Identity/Identity";
import { PlayerEntity } from "./PlayerEntity";
import { PlayerOption, PlayerStatus } from "./type";
import { DataBasic } from "../../DataBasic";
import { CardStatus, CardColor, CardType } from "../Card/type";
import { Card } from "../Card/Card";
import { Agent } from "../Identity/IdentityClass/Agent";
import { copyCard } from "../Card";
import { CharacterEntity } from "../Character/CharacterEntity";
import { Lurker } from "../Identity/IdentityClass/Lurker";
import { MysteriousPerson } from "../Identity/IdentityClass/MysteriousPerson";
import { IdentityType } from "../Identity/type";
import { GameEventCenter } from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
import { TagName } from "../../type";

export class Player extends DataBasic<PlayerEntity> {
  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[] = [new Lurker(), new Agent(), new MysteriousPerson()];
  private _seatNumber: number;
  private _messages: Card[] = [];
  private _handCardCount: number = 0;
  private _status: PlayerStatus = PlayerStatus.ALIVE;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }
  set character(character: Character) {
    if (!character || character === this._character) return;
    this._character = character;
    if (this.entity) {
      this.character.entity = this.entity.node.getChildByPath("Border/CharacterPanting").getComponent(CharacterEntity);
    }
  }

  get identityList() {
    return this._identityList;
  }

  get seatNumber() {
    return this._seatNumber;
  }
  set seatNumber(number) {
    if (number == null || number === this._seatNumber) return;
    this._seatNumber = number;
    this.entity?.setSeat();
  }

  get handCardCount() {
    return this._handCardCount;
  }

  get messageCounts() {
    const data: { [key in CardColor]: number } & { total: number } = {
      total: this._messages.length,
      [CardColor.BLACK]: 0,
      [CardColor.RED]: 0,
      [CardColor.BLUE]: 0,
    };
    for (const message of this._messages) {
      for (const color of message.color) {
        ++data[color];
      }
    }
    return data;
  }

  get status() {
    return this._status;
  }

  set status(status: PlayerStatus) {
    if (status == null || status === this._status || this._status === PlayerStatus.DEAD) return;
    this._status = status;
    this.entity?.refreshStatus();
  }

  get isAlive() {
    return this._status !== PlayerStatus.DEAD;
  }

  constructor(option: PlayerOption) {
    super();
    this._id = option.id;
    this._name = option.name;
    this.character = option.character;
    if (option.identity != null) {
    }
    if (option.entity) {
      this.entity = option.entity;
    }
  }

  //抽牌
  addHandCard(num: number) {
    this._handCardCount += num;
    this.entity?.refreshHandCardCount();
  }

  //弃牌
  removeHandCard(num: number) {
    this._handCardCount -= num;
    this.entity?.refreshHandCardCount();
  }

  banCardByType(type: CardType);
  banCardByType(types: CardType[]);
  banCardByType(type: CardType | CardType[]) {
    if (!(type instanceof Array)) {
      type = [type];
    }
    const typeList = this.getTagData(TagName.CARD_BANNED) || [];
    this.addTag(TagName.CARD_BANNED, [...typeList, ...type]);
    this.entity?.showCardBannedIcon();
    if (typeList.length === 0) {
      GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
        this.removeTag(TagName.CARD_BANNED);
        this.entity?.hideCardBannedIcon();
      });
    }
  }

  banAllCards() {
    this.addTag(TagName.ALL_CARD_BANNED);
    this.entity?.showAllCardBannedIcon();
    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      this.removeTag(TagName.ALL_CARD_BANNED);
      this.entity?.hideAllCardBannedIcon();
    });
  }

  banSkills() {
    this.addTag(TagName.SKILL_BANNED);
    this.entity?.showSkillBannedIcon();
    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      this.removeTag(TagName.SKILL_BANNED);
      this.entity?.hideSkillBannedIcon();
    });
  }

  //角色翻面
  flipCharacter() {
    this._character.flip();
  }

  //情报置入情报区
  addMessage(message: Card);
  addMessage(messages: Card[]);
  addMessage(messages: Card | Card[]) {
    if (!(messages instanceof Array)) {
      messages = [messages];
    }
    messages.forEach((message) => {
      if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    });

    this._messages = [...this._messages, ...messages];
    if (this.messageCounts[CardColor.BLACK] >= 3) {
      this.status = PlayerStatus.DYING;
    }
    this.entity?.refreshMessageCount();
  }

  //从情报区移除情报
  removeMessage(messageId: number): Card;
  removeMessage(messageIds: number[]): Card[];
  removeMessage(messageIds: number | number[]): Card | Card[] {
    if (typeof messageIds === "number") {
      let message = null;
      for (let i = 0; i < this._messages.length; i++) {
        if (messageIds === this._messages[i].id) {
          message = this._messages.splice(i, 1)[0];
          break;
        }
      }
      this.entity?.refreshMessageCount();
      if (this.messageCounts[CardColor.BLACK] < 3 && this.status === PlayerStatus.DYING) {
        this.status = PlayerStatus.ALIVE;
        GameEventCenter.emit(GameEvent.PLAYER_RECOVERY, this);
      }
      return message;
    } else {
      const arr = [];
      for (const messageId of messageIds) {
        for (let i = 0; i < this._messages.length; i++) {
          if (messageId === this._messages[i].id) {
            arr.push(this._messages.splice(i, 1)[0]);
            break;
          }
        }
      }
      this.entity?.refreshMessageCount();
      if (this.messageCounts[CardColor.BLACK] < 3 && this.status === PlayerStatus.DYING) {
        this.status = PlayerStatus.ALIVE;
        GameEventCenter.emit(GameEvent.PLAYER_RECOVERY, this);
      }
      return arr;
    }
  }

  //移除所有情报
  removeAllMessage() {
    const arr = this._messages;
    this._messages = [];
    this.entity?.refreshMessageCount();
    return arr;
  }

  //确认玩家是某个身份
  confirmIdentity(identityType: IdentityType);
  confirmIdentity(identity: Identity);
  confirmIdentity(identity: Identity | IdentityType) {
    if (identity instanceof Identity) {
      this._identityList = [identity];
    } else {
      for (const item of this._identityList) {
        if (item.type === identity) {
          this._identityList = [item];
        }
      }
    }

    this.entity?.refreshIdentityList();
  }

  //排除玩家是某个身份
  ruleOutIdentity(identityType: IdentityType);
  ruleOutIdentity(identity: Identity);
  ruleOutIdentity(identity: Identity | IdentityType) {
    for (let i = 0; i < this._identityList.length; i++) {
      if (
        identity instanceof Identity
          ? this._identityList[i].type === identity.type
          : this._identityList[i].type === identity
      ) {
        this._identityList.splice(i, 1);
        break;
      }
    }
    this.entity?.refreshIdentityList();
  }

  setIdentityList(list: Identity[]) {
    this._identityList = list;
    this.entity?.refreshIdentityList();
  }

  getMessagesCopy(): Card[] {
    const arr = [];
    for (const message of this._messages) {
      arr.push(copyCard(message));
    }
    return arr;
  }

  sameMessageCountOver(card: Card, num?: number);
  sameMessageCountOver(cards: Card[], num?: number);
  sameMessageCountOver(card, num = 3): boolean {
    if (card instanceof Card) {
      card = [card];
    }
    const counts = {};
    for (const c of card) {
      for (const color of c.color) {
        if (!counts[color]) {
          counts[color] = 0;
        }
        ++counts[color];
      }
    }
    for (const i in counts) {
      if (counts[i] + this.messageCounts[i] >= num) {
        return false;
      }
    }
    return true;
  }
}
