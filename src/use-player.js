import videojs from 'video.js';
import {
  useRef,
  useEffect,
  useState
} from 'react';
import './custom-slider-component';
import 'videojs-contrib-quality-levels';
import 'videojs-contrib-dash';

function App({
  player_state
}) {
  const [ready, setReady] = useState(false);
  const player = useRef(null);
  const video = useRef(null);
  const renderVideo = () => {
    if (player_state && player_state.hasOwnProperty('id')) {
      return (
          <div
          data-vjs-player
          data-id = { player_state && player_state.id }>
              <video
              ref = { video }
              className = { `video-js` }
              crossOrigin='anonymous'
              >
              </video>
            </div>
      )
    }
    return <></>
  }

  useEffect(() => {
    player.current = videojs(video.current, {
      controls: true,
      bigPlayButton: false,
      overrideNative: false,
    },
    //@ts-ignore
     (onReady) => {
      setReady(true);
    });

    return () => {
      player.current.dispose();
    };
  }, []);

  return {
    renderVideo,
    player: player.current,
    videoElement: video.current,
    ready,
    renderBtn: () => <button onClick= { () => player.current.play() }>Click me</button>
  };
};


export default App;
