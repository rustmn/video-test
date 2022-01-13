import { configureStore } from '@reduxjs/toolkit';

const init = {
  current_time: 0,
  duration: 23,
  mode: 'piece'
};

export const updateCurrentTime = (payload) => ({
  type: 'UPDATE_CURRENT_TIME',
  payload
});

export const setDuration = (payload) => ({
  type: 'SET_DURATION',
  payload
});

export const changeTimeline = payload => ({
  type: 'CHANGE_TIMELINE',
  payload
});

const timeline = (state = init, action) => {
  switch(action.type) {
    case 'CHANGE_TIMELINE':
      return action.payload;
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload
      };
    case 'UPDATE_CURRENT_TIME':
      return {
        ...state,
        current_time: action.payload
      };
    default:
      return state;
  }
};

export default configureStore({
  reducer: timeline
});