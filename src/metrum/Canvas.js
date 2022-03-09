import React, { useRef, useEffect } from 'react';
import './Canvas.css';
import Paper from 'paper';

const Canvas = ({
  drawing=()=>{},
  resize=true,
  ...props
}={}) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    drawing()
  }, []);
  
  return <canvas 
    ref={canvasRef}
    {...props}
    className="canvas"
    resize={resize ? 'true' : 'false'}
  />
}

export default Canvas;