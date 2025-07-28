/**
 * Browser detection utilities for handling iOS and UC browser specific behaviors
 */
export class BrowserDetection {
  private static _isIOS: boolean | null = null;
  private static _isUCBrowser: boolean | null = null;
  private static _isSafari: boolean | null = null;

  static get isIOS(): boolean {
    if (this._isIOS === null) {
      if (typeof navigator !== 'undefined') {
        this._isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      } else {
        this._isIOS = false;
      }
    }
    return this._isIOS;
  }

  static get isUCBrowser(): boolean {
    if (this._isUCBrowser === null) {
      if (typeof navigator !== 'undefined') {
        this._isUCBrowser = /UCBrowser|UCWEB/.test(navigator.userAgent);
      } else {
        this._isUCBrowser = false;
      }
    }
    return this._isUCBrowser;
  }

  static get isSafari(): boolean {
    if (this._isSafari === null) {
      if (typeof navigator !== 'undefined') {
        this._isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      } else {
        this._isSafari = false;
      }
    }
    return this._isSafari;
  }

  static get needsLongTapFallback(): boolean {
    return this.isIOS || this.isUCBrowser;
  }

  static get recommendedLongTapDuration(): number {
    if (this.isUCBrowser) return 700; // UC browser needs longer
    if (this.isIOS) return 600; // iOS needs slightly longer
    return 500; // Default for other browsers
  }

  static logBrowserInfo(): void {
    if (typeof console !== 'undefined' && console.log) {
      console.log('Browser Detection:', {
        isIOS: this.isIOS,
        isUCBrowser: this.isUCBrowser,
        isSafari: this.isSafari,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
        recommendedDuration: this.recommendedLongTapDuration
      });
    }
  }
}