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
}

  
export {
    scaleProject
}