import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import example from './examples';
// import example from './metrum';

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    example();
  }, []);
  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" />
}

export default Canvas;