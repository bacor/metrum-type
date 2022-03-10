import { Point, Path, Group, SymbolDefinition } from "paper"
import brushes from "./brushes"

function approxOffsetCurve(path, widthFn, { N=30, smooth=true, simplify=true }={}) {
  // Construct an two offset paths by connecting
  // endpoints of the normals and antinormals of
  // lenghts given by a width function
  var normalOffset = new Path({strokeColor:'green'})
  var antiNormalOffset = new Path()
  for(var i=0; i<=N; i+=1) {
      var offset = i * path.length / N
      var point = path.getPointAt(offset);
      var w = widthFn(i / N)
      var normal = path.getNormalAt(offset).multiply(w)
      normalOffset.add(point.add(normal))
      antiNormalOffset.add(point.subtract(normal))
  }
  
  // Smooth and simplify both offset curves
  if(smooth) {
    normalOffset.smooth({ from: 1, to: N-1 })
    antiNormalOffset.smooth({ from: 1, to: N-1 })
  }
  if(simplify) {
    normalOffset.simplify()
    antiNormalOffset.simplify()
  }
  
  // Connect the offset curves and return
  var offset = antiNormalOffset
  offset.add(normalOffset.lastSegment.point)
  offset.join(normalOffset)
  offset.closePath()
  return offset

}

class Shape {
  constructor(spine, {
    brush='constant',
    brushOptions={width: 10},
    offsetCurveOptions,
    ...styles
  }={}) {
    // Basic hierarchy
    this.spine = spine
    this.brush = new Path()
    this.group = new Group([ this.spine, this.brush])
    this.symbol = new SymbolDefinition(this.group)
    
    // Update the brush
    this.brushConstructor = typeof(brush) == 'string' ? brushes[brush] : brush     
    this.brushOptions = brushOptions
    this.updateBrush(brushOptions)

    // Draw the brush
    this.style = styles
    this.offsetCurveOptions = offsetCurveOptions
    this.drawBrush()
  }

  updateBrush(brushOptions) {
    brushOptions = {...this.brushOptions, ...brushOptions}
    this.brushOptions = brushOptions
    this.brushFn = this.brushConstructor(brushOptions)
    this.drawBrush()
  }

  drawBrush() {
    let styles = this.style
    let newBrush = approxOffsetCurve(this.spine, this.brushFn, this.offsetCurveOptions)
    newBrush.style = styles
    this.brush.replaceWith(newBrush)
    this.brush = newBrush
  }

  get style() {
    return this.brush.style
  }

  set style(styles) {
    this.brush.style = styles
  }
}

class Arc extends Shape {
  constructor({
    point = new Point(0, 0),
    unit=20,
    ...options
  } = {}) {
    // Construct the spine
    let spine = new Path([point])
    spine.lineBy(new Point(0, -unit/2))
    spine.arcBy(new Point(3 * unit, 0), true)
    spine.lineBy(new Point(0, unit/2))

    // Call parent constructor
    super(spine, options)
  }
}

class Line extends Shape {
  constructor({ 
    point = new Point(0, 0),
    unit = 20, 
    ...options 
  } = {}) {
    // Construct the spine
    let spine = new Path()
    spine.add(point)
    spine.lineBy(new Point(4 * unit, 0))

    // Call parent constructor
    super(spine, options)
  }
}

export {
  approxOffsetCurve,
  Shape, 
  Arc, 
  Line
}