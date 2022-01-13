export function seekTo(state, seek_value) {
  if (state.view_type === 'piece') {
    return seek_value;
  }

  const pool = state.pool;
  const watched = state.watched;
  const timeline = state.timeline;

  if (
    timeline.current_time < seek_value
  ) {
  }
}