import ReactDOM from 'react-dom';
import videojs from 'video.js';
import CustomSlider from './custom-slider';
import { Provider } from 'react-redux';
import store from './store';

const Component = videojs.getComponent('Component');

class CustomSliderComponent extends Component {
  constructor(player, options) {
    super(player, options);
    this.mount = this.mount.bind(this);
    
    player.ready(() => {
      this.mount();
    });

    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el())
    });
  }
  mount() {
    ReactDOM.render(
    <Provider
    store = { store }
    >
      <CustomSlider vjsComponent={this} />
    </Provider>
    , this.el()
    );
  }
};

videojs.registerComponent('CustomSlider', CustomSliderComponent);
export default CustomSliderComponent;