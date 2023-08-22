import { _decorator, Component, Label, Node, Prefab, color, UITransform } from "cc";
import { Player } from "../../../Components/Player/Player";
import { Identity } from "../../../Components/Identity/Identity";
import { CharacterObject } from "../../../Components/Chatacter/CharacterObject";
import { CharacterStatus } from "../../../Components/Chatacter/type";
import { PlayerObject } from "../../../Components/Player/PlayerObject";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { createCharacterById } from "../../../Components/Chatacter";
const { ccclass, property } = _decorator;

export interface WinnerTemplate {
  player: Player;
  identity: Identity;
  addScore: number;
  score: number;
  rank: string;
  isWinner: boolean;
  isDeclarer: boolean;
}

@ccclass("WinnerPlayer")
export class WinnerPlayer extends Component {
  @property(Node)
  characterPanting: Node | null = null;

  onLoad() {}

  init(data: WinnerTemplate) {
    const character = createCharacterById(data.player.character.id);
    character.status = CharacterStatus.FACE_UP;
    this.characterPanting.getComponent(CharacterObject).data = character;

    const winFlag = this.node.getChildByName("WinFlag").getComponent(Label);
    if (data.isWinner) {
      winFlag.string = "胜利";
      winFlag.color = color("#3DFF00");
    } else {
      winFlag.string = "失败";
      winFlag.color = color("#e10602");
    }

    const identityNode = this.node.getChildByName("Identity");
    if (data.identity instanceof MysteriousPerson) {
      identityNode.active = true;
      identityNode.getComponent(UITransform).height = data.identity.name.length * 22;
      identityNode.getComponentInChildren(Label).string = data.identity.name;
    } else {
      identityNode.active = false;
    }

    const scoreChage = this.node.getChildByName("ScoreChange").getComponent(Label);
    if (data.addScore === 0) {
      scoreChage.string = data.isWinner ? "（+0）" : "（-0）";
    } else if (data.addScore > 0) {
      scoreChage.string = `（+${data.addScore}）`;
    } else {
      scoreChage.string = `（${data.addScore}）`;
    }

    const name = this.node.getChildByName("Name").getComponent(Label);
    name.string = data.player.name;
    if (data.isDeclarer) {
      name.color = color("#FFFF00");
    } else {
      name.color = color("#FFFFFF");
    }

    this.node.getChildByName("Score").getComponent(Label).string = data.score.toString();
    this.node.getChildByName("SeatNumber").getComponent(Label).string =
      PlayerObject.seatNumberText[data.player.seatNumber];
    this.node.getChildByName("Rank").getComponent(Label).string = data.rank;
  }
}
