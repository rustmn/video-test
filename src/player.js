import { useEffect, createContext, useState, useContext } from 'react';
import usePlayer from './use-player';
import { connect } from 'react-redux';
import {
  updateCurrentTime,
  setDuration
} from './store';

const url = 'https://cdn.deeeeep.net.ru/Films/INTRO/NTRO_NI_RUS_AV1 (AWS)/INTRO_NI_Rus.mpd';
const en = 'https://cdn.deeeeep.net.ru/Films/INTRO/INTRO_NI_ENG_AV1 (AWS)/INTRO_NI_Eng.mpd';
const sample = 'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/feelings_vp9-20130806-manifest.mpd';

const Player = ({
  timeline,
  updateCurrentTime,
  setDuration
}) => {
  const {
    renderVideo,
    player,
    ready,
    renderBtn
  } = usePlayer({
    player_state: {
      id: 'x'
    }
  });
  useEffect(() => {
    if (ready) {
      player.src({
        src: en,
        type: 'application/dash+xml'
      });
    }
  }, [ready]);
  return (
    <div style = {{
      width: '100vw',
      height: '60vh',
      position: 'relative'
    }}>
      {
        renderVideo()
      }
      <button
      >
        change quality
      </button>
    </div>
  )
}

export default connect(state => ({
  timeline: state
}), {
  updateCurrentTime,
  setDuration
})(Player);