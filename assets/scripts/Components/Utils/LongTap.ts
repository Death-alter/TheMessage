import { _decorator, Component, Node, sys, Vec2 } from "cc";
import { BrowserDetection } from "../../Utils/BrowserDetection";
const { ccclass, property } = _decorator;

@ccclass("LongTap")
export class LongTap extends Component {
  private touchStartTime: number;
  private isOnTouch: boolean;
  private longTapTimer: number | null = null;
  private touchStartPos: Vec2 = new Vec2();
  private isLongTapTriggered: boolean = false;

  // Configuration for iOS/UC browser compatibility
  private readonly LONG_TAP_DURATION = BrowserDetection.recommendedLongTapDuration;
  private readonly MOVE_THRESHOLD = 10; // Maximum pixel movement allowed
  private readonly DOUBLE_TAP_THRESHOLD = 300; // Prevent double tap interference

  onLoad() {
    // Log browser information for debugging
    BrowserDetection.logBrowserInfo();
  }

  onEnable() {
    if (sys.isMobile) {
      this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
      this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
      this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
  }

  onDisable() {
    if (sys.isMobile) {
      this.node.off(Node.EventType.TOUCH_START);
      this.node.off(Node.EventType.TOUCH_END);
      this.node.off(Node.EventType.TOUCH_CANCEL);
      this.node.off(Node.EventType.TOUCH_MOVE);
    }
    this.clearLongTapTimer();
  }

  private onTouchStart = (event) => {
    // Prevent browser default behavior on iOS/UC that might interfere
    if (BrowserDetection.needsLongTapFallback) {
      event.stopPropagation();
    }

    this.touchStartTime = new Date().getTime();
    this.touchStartPos.set(event.getUILocation());
    this.isOnTouch = true;
    this.isLongTapTriggered = false;

    // Clear any existing timer
    this.clearLongTapTimer();

    // Set up long tap timer
    this.longTapTimer = setTimeout(() => {
      if (this.isOnTouch && !this.isLongTapTriggered) {
        this.isLongTapTriggered = true;
        
        // Debug logging for iOS/UC browsers
        if (BrowserDetection.needsLongTapFallback && typeof console !== 'undefined') {
          console.log('LongTap triggered successfully for character info');
        }
        
        this.node.emit("longtap", event);
      }
    }, this.LONG_TAP_DURATION) as any;
  };

  private onTouchMove = (event) => {
    if (!this.isOnTouch) return;

    const currentPos = event.getUILocation();
    const distance = Vec2.distance(this.touchStartPos, currentPos);

    // Cancel long tap if finger moves too much
    if (distance > this.MOVE_THRESHOLD) {
      this.clearLongTapTimer();
      this.isOnTouch = false;
    }
  };

  private onTouchEnd = (event) => {
    const deltaTime = new Date().getTime() - this.touchStartTime;
    
    this.clearLongTapTimer();

    if (this.isOnTouch) {
      if (this.isLongTapTriggered) {
        // Long tap was already triggered, don't emit tap
        this.isLongTapTriggered = false;
      } else if (deltaTime < this.DOUBLE_TAP_THRESHOLD) {
        // Regular tap
        this.node.emit("tap", event);
      }
    }

    this.isOnTouch = false;
  };

  private onTouchCancel = () => {
    this.clearLongTapTimer();
    this.touchStartTime = 0;
    this.isOnTouch = false;
    this.isLongTapTriggered = false;
  };

  private clearLongTapTimer() {
    if (this.longTapTimer !== null) {
      clearTimeout(this.longTapTimer);
      this.longTapTimer = null;
    }
  }
}
}
