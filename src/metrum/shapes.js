// import { Beta } from "@stdlib/stats-base-dists-beta/docs/types";
import Beta from '@stdlib/stats-base-dists-beta'
import { Point, Path, Group, SymbolDefinition } from "paper"

function approxOffsetCurve(path, widthFn, { N=50, smooth=true, simplify=true }={}) {
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

const brushes = {
  constant({ width }) {
    return (pos) => width
  },

  sine({width, intensity=.1, period=1}) {
    return (pos) => {
      let sine = Math.sin(pos * period * Math.PI)
      return width * ((1 - intensity) +  intensity * Math.abs(sine))
    }
  },

  beta({ width, skew=0, concentration=.0001, intensity=1}={}) {
    // We reparametrize the distribution by a 'skew' and concentration
    // parameter. The higher the concentration, the less spread out the brush
    // is. Positive skew means the thickest part of the brush is on the right
    // Negative skew means it's on the left. The skew always has to be 
    // absolutely smaller than the concentration parameter. This is to ensure
    // that the a and b parameters of the Beta distribution are both above 1,
    // so that the mode of the distribution is the peak of the density.
    if(Math.abs(skew) > concentration) return false;
    let a = concentration + 1
    let b = concentration + 1
    if(skew < 0) a -= Math.abs(skew)
    if(skew > 0) b-= Math.abs(skew)

    // Compute the mode and the value of the pdf at that point: 
    // this it the maximum by which we normalize the pdf
    let density = Beta.pdf.factory(a, b)
    let mode = Beta.mode(a, b)
    let max = density(mode)
    return (pos) => {
      let normDensity =  density(pos) / max
      let out = (1 - intensity) * width + intensity * normDensity * width
      return out
    }
  }
}

class PathBrush {
  constructor(spine, {
    brush=brushes.constant,
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
    this.brushConstructor = brush
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

class Arc extends PathBrush {
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

class Line extends PathBrush {
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
  brushes,
  PathBrush, 
  Arc, 
  Line
}