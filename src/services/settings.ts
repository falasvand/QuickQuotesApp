export class SettingsService {

  private altBgColor = false;

  setBackgroundColor(isAlt: boolean) {
    this.altBgColor = isAlt;
  }

  isAltBackground() {
    return this.altBgColor;
  }
}
