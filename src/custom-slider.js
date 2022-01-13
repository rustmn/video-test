import React, { Component, useContext, useEffect, useState } from 'react';
import { Slider, Rail, Handles, Tracks,  Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Tick, Track, RightTrack } from './components';
import { connect } from 'react-redux';
import store, {
  updateCurrentTime,
  changeTimeline
} from './store';

const sliderStyle = {
  position: 'relative',
  width: '80%',
  touchAction: 'none',
};

const domain = [0, 500];
const defaultValues = [150];

const CustomSlider = ({
  timeline,
  vjsComponent,
  updateCurrentTime,
  changeTimeline
}) => {
  const [state, setState] = useState({});
  const [progress, setProgress] = useState(0);
  const player = vjsComponent.player_;

  const onUpdate = (update) => {
    setState({ update });
  };

  const onChange = (values) => {
    console.log('seeking to ', values);
    //vjsComponent.player_.currentTime(values[0]);

    //setState({ values });
    //updateCurrentTime(values);
  };
  useEffect(() => {
    const player = vjsComponent.player_;
    player.on('timeupdate', updateTime);
    player.on('progress', updateProgress);
    return () => {
      player.off('timeupdate', updateTime);
      player.off('progress', updateProgress);
    };
  }, []);

  const updateProgress = () => {
    const buffered = Math.floor(player.bufferedPercent() * 100);
    //console.log(buffered);
    setProgress(buffered);
  }

  const updateTime = () => {

    const currentTime = player.currentTime();
    const timeline = store.getState();
    const updated_time = timeline.mode !== 'piece' ?
    timeline.current_time + currentTime
    :
    currentTime;

    updateCurrentTime(Math.floor(updated_time));
  }

  const makeChanges = () => {
    if (timeline.mode === 'movie') {
      return changeTimeline({
        duration: player.duration(),
        current_time: player.currentTime(),
        mode: 'piece'
      })
    }
    else {
      changeTimeline({
      duration: 287,
      current_time: 85,
      mode: 'movie'
    });
    }
  };
  const formatSecs = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remaining = secs - minutes * 60;
    return `- ${minutes}.${remaining}`;
  }
  const controlbar_width = player.controlBar.dimension('width');
  const width = controlbar_width ? `${controlbar_width / 100 * 80 }px` : '400px';
  return (
      <div style={{
        height: '100%',
         width: width, display: 'flex', justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
        }}>
        <Slider
          mode={2}
          step={1}
          domain={[0, timeline.duration]}
          rootStyle={sliderStyle}
          onUpdate={onUpdate}
          onChange={onChange}
          values={timeline && timeline.current_time ?
          [timeline.current_time] : [0]}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <React.Fragment
                  key = { id }
                  >
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                  <RightTrack
                  key = { id + 'right' }
                  source = {{
                    percent: target.percent
                  }}
                  target = {{
                    percent: target.percent + progress
                  }}
                  getTrackProps={getTrackProps}
                  />
                  </React.Fragment>
                ))}
              </div>
            )}
          </Tracks>

        </Slider>
        <div
        style = {{
          marginLeft: '10px'
        }}
        >
          
          <span>
            {
              timeline && timeline.duration ? formatSecs(timeline.duration - timeline.current_time) : `- 0.00`
            }
          </span>
        </div>
      </div>
    );
  
}

export default connect(state => ({
  timeline: state
}), {
  updateCurrentTime,
  changeTimeline
})(CustomSlider);