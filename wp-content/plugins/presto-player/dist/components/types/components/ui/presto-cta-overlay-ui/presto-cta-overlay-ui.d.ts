import { EventEmitter } from '../../../stencil-public-runtime';
import { ButtonLinkObject, i18nConfig } from '../../../interfaces';
export declare class CTAOverlayUI {
  private textInput?;
  /**
   * Props
   */
  headline: string;
  defaultHeadline: string;
  bottomText: string;
  showButton: boolean;
  buttonText: string;
  buttonType: 'link' | 'time';
  buttonLink: ButtonLinkObject;
  allowRewatch: boolean;
  allowSkip: boolean;
  direction?: 'rtl';
  i18n: i18nConfig;
  /**
   * Events
   */
  skip: EventEmitter<void>;
  rewatch: EventEmitter<void>;
  componentDidLoad(): void;
  handleCTAClick(e: any): void;
  handleLink(): void;
  render(): any;
}
