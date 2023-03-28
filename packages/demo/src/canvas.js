import React, { useRef, useEffect } from 'react';
import './canvas.css';
import Paper from 'paper';

const Canvas = ({
  drawing=()=>{},
  resize=true,
  download=false,
  ...props
}={}) => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    Paper.setup(canvasRef.current);
    Paper.project.clear()
    drawing()
  });

  const linkRef = useRef(null)
  const handleDownload = (event) => {
    const fileName = "metrum.svg"
    const url = "data:image/svg+xml;utf8," + encodeURIComponent(Paper.project.exportSVG({asString:true}));
    console.log(url)
    const link = event.target
    link.download = fileName;
    link.href = url;
    link.click();
  }
  
  return <>
    <canvas 
      ref={canvasRef}
      {...props}
      className="canvas"
      resize={resize ? 'true' : 'false'}
    />
    { download ? <a ref={linkRef} onClick={handleDownload}>Download svg</a> : null }
  </>
}

export default Canvas;