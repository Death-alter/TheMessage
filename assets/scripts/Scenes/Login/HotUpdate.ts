const jsb = (<any>window).jsb;

import { _decorator, Component, Node, Label, ProgressBar, Asset, game, sys, NodeEventType } from "cc";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("HotUpdate")
export class HotUpdate extends Component {
  @property(Asset)
  manifestUrl: Asset = null!;

  @property(Node)
  noUpdate: Node = null!;

  @property(Node)
  alert: Node = null!;

  @property(Node)
  progress: Node = null!;

  @property(Node)
  finish: Node = null!;

  private updateBtn: Node = null;
  private progressBar: ProgressBar = null;
  private _updating = false;
  private _storagePath = "";
  private _am: jsb.AssetsManager = null!;
  private _updateListener = null;
  private versionCompareHandle: (versionA: string, versionB: string) => number = null!;

  checkCb(event: any) {
    if (event.getEventCode() === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
      this.alert.active = true;
    } else {
      return;
    }

    this._am.setEventCallback(null!);
    this._updating = false;
  }

  checkCbManual(event: any) {
    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { msg: "该版本未支持热更新" });
        break;
      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { msg: "未检测到服务器资源" });
        break;
      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        this.noUpdate.active = true;
        break;
      case jsb.EventAssetsManager.NEW_VERSION_FOUND:
        this.alert.active = true;
        break;
      default:
        return;
    }

    this._am.setEventCallback(null!);
    this._updating = false;
  }

  updateCb(event: any) {
    let needRestart = false;
    let failed = false;
    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        failed = true;
        break;
      case jsb.EventAssetsManager.UPDATE_PROGRESSION:
        this.progressBar.progress = event.getPercent();
        break;
      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        failed = true;
        break;
      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        failed = true;
        break;
      case jsb.EventAssetsManager.UPDATE_FINISHED:
        needRestart = true;
        break;
      case jsb.EventAssetsManager.UPDATE_FAILED:
        this._updating = false;
        break;
      case jsb.EventAssetsManager.ERROR_UPDATING:
        break;
      case jsb.EventAssetsManager.ERROR_DECOMPRESS:
        break;
      default:
        break;
    }

    if (failed) {
      this._am.setEventCallback(null!);
      this._updateListener = null;
      this._updating = false;
      this.cancelBlockClick();
    }

    if (needRestart) {
      this._am.setEventCallback(null!);
      this._updateListener = null;
      const searchPaths = jsb.fileUtils.getSearchPaths();
      const newPaths = this._am.getLocalManifest().getSearchPaths();
      Array.prototype.unshift.apply(searchPaths, newPaths);
      localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
      jsb.fileUtils.setSearchPaths(searchPaths);

      this.progress.active = false;
      this.finish.active = true;
      this.cancelBlockClick();
    }
  }

  checkUpdate(event?: any) {
    if (this._updating) {
      return;
    }
    if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
      const url = this.manifestUrl.nativeUrl;
      this._am.loadLocalManifest(url);
    }
    if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
      return;
    }
    if (event) {
      this._am.setEventCallback(this.checkCbManual.bind(this));
    } else {
      this._am.setEventCallback(this.checkCb.bind(this));
    }

    this._am.checkUpdate();
  }

  hotUpdate() {
    if (this._am && !this._updating) {
      this.progressBar.progress = 0;
      this.progress.active = true;

      this._am.setEventCallback(this.updateCb.bind(this));

      if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
        const url = this.manifestUrl.nativeUrl;
        this._am.loadLocalManifest(url);
      }
      this._am.update();
      this.updateBtn.active = false;
      this._updating = true;
      this.blockClick();
    }
  }

  blockClick() {
    this.node.getChildByName("HotUpdate").on(NodeEventType.TOUCH_END, () => {});
  }

  cancelBlockClick() {
    this.node.getChildByName("HotUpdate").off(NodeEventType.TOUCH_END);
  }

  // use this for initialization
  onLoad() {
    this.progressBar = this.progress.getChildByName("ProgressBar").getComponent(ProgressBar);
    this.updateBtn = this.alert.getChildByName("Confirm");
    this.updateBtn.on(NodeEventType.TOUCH_END, this.hotUpdate, this);
    this.alert.getChildByName("Cancel").on(
      NodeEventType.TOUCH_END,
      () => {
        this.alert.active = false;
      },
      this,
    );

    this.noUpdate.getChildByName("Confirm").on(
      NodeEventType.TOUCH_END,
      () => {
        this.noUpdate.active = false;
      },
      this,
    );

    this.finish.getChildByName("Confirm").on(
      NodeEventType.TOUCH_END,
      () => {
        game.restart();
      },
      this,
    );

    // Hot update is only available in Native build
    if (!jsb) {
      return;
    }
    this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
    this.versionCompareHandle = function (versionA: string, versionB: string) {
      return parseInt(versionA) - parseInt(versionB);
    };
    this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
    this.checkUpdate();
  }

  onDestroy() {
    if (this._updateListener) {
      this._am.setEventCallback(null!);
      this._updateListener = null;
    }
  }
}
