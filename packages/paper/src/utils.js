import Paper from "paper";

function scaleProject(project, { pivotPosition = 'topLeft' }={}) {
  project.layers.forEach(layer => {
    layer.pivot = layer.bounds[pivotPosition]
    let rect = new Paper.Path.Rectangle(Paper.view.bounds)
    rect.name = 'scaling_box'
    layer.addChild(rect)
    rect.sendToBack()
  })

  project.view.onResize = (event) => {
    project.layers.forEach(layer => {
      layer.fitBounds(event.size)
    })
  }

  // Update layers before window is resized
  project.layers.forEach(layer => {
    layer.fitBounds(project.view.bounds)
  })
  
}


function animateOnMouseMove(style) {
  Paper.view.onMouseMove = (event) => {
    let {width, height} = Paper.view.bounds
    let {x, y} = event.point
    x = Math.max(x, 1)
    y = Math.max(y, 1)
    let concentration = y / height * 6 
    let skew = ((x / width) - .5) * concentration
    style.updateBrush({ 
      // width: (.1 + .9 * (x / width)) * this.unit, 
      // intensity: y / height,
      concentration, skew
    })
  }
}

// const setText = (point, text) => {
//   var t = new Paper.PointText(point);
//   t.fillColor = 'black';
//   t.content = text
//   // t.fontWeight  = 'bold'
//   t.fontStyle='italic';
//   t.fontFamily = 'Fraunces'
//   return t
// }

  
export {
    scaleProject,
    animateOnMouseMove
}