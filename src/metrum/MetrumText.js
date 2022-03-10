// import React from 'react';
import Paper from "paper";

import Canvas from './Canvas';
import Text from './Text';
import styles from './styles';
import { scaleProject } from './utils';

function typeset({
  text,
  style,
  size='auto',
  scale=true,
  align='topLeft',
  styleOpts={},
  lineHeight,
  characterSpacing,
}={}) {
  return () => {
    // Style object
    let unit = size === 'auto' ? 10  : size
    console.log(unit)
    let styleObj = styles.factory(style, { 
      unit, 
      ...styleOpts
    })
  
    // typeset the text
    let par = new Text(text, {
      unit,
      lineHeight,
      characterSpacing,
      ...styleObj
    })
    par.draw()
    
    // Automatically fit the text to the canvas
    if(size == 'auto') {
      par.group.fitBounds(Paper.view.bounds)
    }

    // Align the paragraph
    par.group.pivot = par.group.bounds[align]
    par.group.position = Paper.view.bounds[align]
    
    // Scale the project when the canvas is resized
    if(scale) {
      scaleProject(Paper.project)
    }
  }
}


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