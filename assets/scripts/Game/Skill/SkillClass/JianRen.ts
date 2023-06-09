import { skill_jian_ren_a_toc, skill_jian_ren_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class JianRen extends Skill {
  constructor(character: Character) {
    super({
      name: "坚韧",
      character,
      description:
        "你接收黑色情报后，可以展示牌堆顶的一张牌，若是黑色牌，则将展示的牌加入你的手牌，并从一名角色的情报区弃置一张黑色情报。",
    });
  }

  init() {
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAN_REN_A_TOC, this.onUseJianRenA, this);
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAN_REN_B_TOC, this.onUseJianRenB, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_A_TOC, this.onUseJianRenA);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_B_TOC, this.onUseJianRenB);
  }

  onUseJianRenA(data: skill_jian_ren_a_toc) {}

  onUseJianRenB(data: skill_jian_ren_b_toc) {}

  onUse() {}
}
