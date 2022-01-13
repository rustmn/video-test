import React from 'react';

const styles = (theme) => ({
  slider: {
    position: 'relative',
    width: '100%',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    display: 'flex',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  item: {
    flexGrow: 1,
    border: '1px solid rgba(200,200,200,0.3)',
  },
});
/*
interface ValueViewerProps {
  format?: (val: number) => string;
  values: number[];
  update: number[];
  classes: { [key: string]: string };
}
*/
const ValueViewer = ({
  classes,
  values,
  update,
  format = d => d,
}) => {
  return (
    <div >
      <div >
        <div >onChange:</div>
        {values.map((d, i) => (
          <div key={i} >
            {format(d)}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 40 }} >
        <div >onUpdate:</div>
        {update.map((d, i) => (
          <div key={i} >
            {format(d)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueViewer;