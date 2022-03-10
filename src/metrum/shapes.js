import { Point, Path, Group, SymbolDefinition } from "paper"
import brushes from "./brushes"

function approxOffsetCurve(path, widthFn, { 
  numSegments=30, 
  smooth=true, 
  simplify=true 
} = {}) {
  // Construct an two offset paths by connecting
  // endpoints of the normals and antinormals of
  // lenghts given by a width function
  var normalOffset = new Path({strokeColor:'green'})
  var antiNormalOffset = new Path()
  for(var i=0; i<=numSegments; i+=1) {
      var offset = i * path.length / numSegments
      var point = path.getPointAt(offset);
      var w = widthFn(i / numSegments)
      var normal = path.getNormalAt(offset).multiply(w)
      normalOffset.add(point.add(normal))
      antiNormalOffset.add(point.subtract(normal))
  }
  
  // Smooth and simplify both offset curves
  if(smooth) {
    normalOffset.smooth({ from: 1, to: numSegments-1 })
    antiNormalOffset.smooth({ from: 1, to: numSegments-1 })
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
    unit,
    brush='constant',
    brushParams={},
    renderOpts: {
      numSegments=50, 
      smooth=false, 
      simplify=false
    } = {},
    blendMode='normal',
    ...styles
  }={}) {
    // Basic hierarchy
    this.spine = spine
    this.spine.name = 'spine'
    this.body = new Path()
    this.body.name = 'body'
    this.group = new Group([ this.spine, this.body])
    this.symbol = new SymbolDefinition(this.group)
    
    // Styles
    this.group.blendMode = blendMode
    this.style = styles
    
    // Instantiate and draw the brush
    if(!('width' in brushParams)) brushParams.width = unit / 2;
    this.brush = brushes.factory(brush, brushParams)
    this.renderOpts = {numSegments, smooth, simplify}
    this.draw()
  }

  updateBrush(brushParams) {
    this.brush.update(brushParams)
    this.draw()
  }

  draw() {
    let styles = this.style
    let widthFn = pos => this.brush.width(pos)
    let newBrush = approxOffsetCurve(this.spine, widthFn, this.renderOpts)
    newBrush.style = styles
    this.body.replaceWith(newBrush)
    this.body = newBrush
    this.body.name = 'body'
  }

  get style() {
    return this.body.style
  }

  set style(styles) {
    this.body.style = styles
  }
}

class Arc extends Shape {
  constructor({
    unit,
    point = new Point(0, 0),
    fillColor='#FF000033',
    strokeColor='red',
    ...opts
  } = {}) {
    // Construct the spine
    let spine = new Path([point])
    spine.lineBy(new Point(0, -unit/2))
    spine.arcBy(new Point(3 * unit, 0), true)
    spine.lineBy(new Point(0, unit/2))

    // Call parent constructor
    super(spine, {unit, fillColor, strokeColor, ...opts})
    this.group.name = 'arc'
  }
}

class Line extends Shape {
  constructor({ 
    point = new Point(0, 0),
    unit,
    fillColor='#0000FF33',
    strokeColor='blue', 
    ...opts 
  } = {}) {
    // Construct the spine
    let spine = new Path()
    spine.add(point)
    spine.lineBy(new Point(4 * unit, 0))

    // Call parent constructor
    super(spine, {unit, fillColor, strokeColor, ...opts})
    this.group.name = 'line'
  }
}

export {
  Shape, 
  Arc, 
  Line
}