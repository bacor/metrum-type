import React from "react";
import Canvas from "./canvas";
import typeset from "@metrum/paper/src/typeset"

function MetrumText({
    width="100%",
    height="100%",
    
    // General options
    size='auto',
    scale=true,
    lineHeight=1,
    characterSpacing,
    style='metrum',
  
    // Style options
    arcStyle,
    lineStyle,
    blendMode,
    brush,
    brushParams,
    children
  }={}) {
  
    // Parse the content of the element
    let text = '';
    if(typeof(children) == 'string') {
      // The content is just a plain string:
      text = children
  
    } else if(children instanceof Array) {
      // Alternatively, multiple lines separated by breaks
      let lines = []
      children.forEach(line => {
        if(typeof(line) == 'string') {
          lines.push(line)
        } else if(line.type != 'br') {
          throw "Type elements can only contain strings or breaks"
        }
      });
      text = lines.join('\n')
    }
  
    // Combine all style options
    let styleOpts = {arcStyle, lineStyle, blendMode, brush, brushParams}
    let opts = {size, scale, lineHeight, characterSpacing}
  
    return (
      <div className="metrum-type" style={{width, height}}>
        <Canvas drawing={typeset({ text, style, styleOpts, ...opts })} />
      </div>
    )
  }
  
  export default MetrumText