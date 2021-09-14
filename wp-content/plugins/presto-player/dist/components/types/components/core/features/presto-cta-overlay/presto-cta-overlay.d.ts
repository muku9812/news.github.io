import { EventEmitter } from '../../../../stencil-public-runtime';
import { i18nConfig, presetAttributes } from '../../../../interfaces';
export declare class PrestoCTAOverlay {
  player: any;
  preset: presetAttributes;
  videoId: number;
  i18n: i18nConfig;
  duration: number;
  direction?: 'rtl';
  enabled: boolean;
  show: boolean;
  loading: boolean;
  error: string;
  skipped: boolean;
  percentagePassed: number;
  currentTime: number;
  ended: boolean;
  playVideo: EventEmitter<void>;
  rewatchVideo: EventEmitter<void>;
  componentWillLoad(): void;
  handlePlayerInit(_: any, old: any): void;
  /**
   * Find out if time is passed.
   * @returns boolean
   */
  timePassed({ current, duration, showAfter }: {
    current: number;
    duration: number;
    showAfter: number;
  }): boolean;
  /**
   * Handle with the player is ended
   * @param val
   * @returns
   */
  handleEnded(val: any): void;
  handleFullScreen(): void;
  /**
   * Wait for duration to start before checking time
   * @returns void
   */
  handleDuration(): void;
  handlePercentagePassed(): void;
  /**
   * Watch current time and check if we should
   * pause the video.
   */
  handleEnabled(): void;
  /**
   * When current time changes, check to see if we should
   * enable the overlay
   * @returns void
   */
  handleTime(): void;
  /**
   * Set enabled/disabled based on time that has passed
   */
  checkTime(): void;
  /**
   * Skip email collection
   */
  skip(): void;
  /**
   * Handle rewatch click.
   */
  rewatch(): void;
  /**
   * Maybe render
   * @returns JSX
   */
  render(): any;
}
