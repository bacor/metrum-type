// import React from 'react';
import Paper from "paper";

import Canvas from './Canvas';
import Paragraph from './Paragraph';
import styles from './styles';
import { scaleProject } from './utils';

function typeset({
  text,
  size='auto',
  scale=true,
  style='metrum',
  styleOpts={},
  lineHeight=1,
  align='topLeft',
}={}) {
  return () => {
    // Draw the text
    let unit = size === 'auto' ? 10  : size
    let styleObj = styles[style]({ unit: unit, ...styleOpts })      
    let par = new Paragraph(text, {
      lineHeight,
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


function Type({
  width="100%",
  height="100%",
  ...props
}) {

  // Parse the content of the element
  let text = '';
  if(typeof(props.children) == 'string') {
    // The content is just a plain string:
    text = props.children

  } else if(props.children instanceof Array) {
    // Alternatively, multiple lines separated by breaks
    let lines = []
    props.children.forEach(line => {
      if(typeof(line) == 'string') {
        lines.push(line)
      } else if(line.type != 'br') {
        throw "Type elements can only contain strings or breaks"
      }
    });
    text = lines.join('\n')
  }

  return (
    <div className="metrum-type" style={{width, height}}>
      <Canvas drawing={
        typeset({ text, ...props })
      } />
    </div>
  )
}

export default Type