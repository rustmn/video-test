import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import ProgressControl from './components/progress-control';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class DeepMovieControlbar extends Plugin {

  /**
   * Create a DeepMovieControlbar plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-deep-movie-controlbar');
      console.log('FROM PLUGIN!!')
    });
  }
}

// Define default values for the plugin's `state` object here.
DeepMovieControlbar.defaultState = {};

// Include the version number.
DeepMovieControlbar.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('deepMovieControlbar', DeepMovieControlbar);

export default DeepMovieControlbar;
