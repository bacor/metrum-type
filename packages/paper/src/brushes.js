import Beta from '@stdlib/stats-base-dists-beta'

class Brush {
  constructor({width=1, intensity=1, ...params}={}) {
    this.params = {}
    this.update({width, intensity, ...params})
  }

  update(params) {
    this.params = { ...this.params, ...params }
  }

  width(pos) {
    let relWidth = this.relativeWidth(pos)
    let intens = this.params.intensity
    let width = this.params.width
    return ((1 - intens) * width) + (intens * relWidth * width)
  }

  relativeWidth(pos) {
    // To be computed by subclasses: 
    // takes a position between 0 and one and 
    // (usually) outputs a value between 0 and 1
  }
}

class ConstantBrush extends Brush {
  relativeWidth() {
    return 1
  }
}

class SineBrush extends Brush {
  constructor({ period=1, ...params } = {}) {
    super({ period, ...params })
  }

  relativeWidth(pos) {
    let sine = Math.sin(pos * this.params.period * Math.PI)
    return Math.abs(sine)
  }
}

class BetaBrush extends Brush {
  constructor({ skew=0, concentration=.0001, ...params} = {}) {
    super({ skew, concentration, ...params })
  }

  update(params) {
    super.update(params)
    let { skew, concentration } = this.params
    if(Math.abs(skew) > concentration) return false;
    
    let a = concentration + 1
    let b = concentration + 1
    if(skew < 0) a -= Math.abs(skew)
    if(skew > 0) b-= Math.abs(skew)

    // Compute the mode and the value of the pdf at that point: 
    // this it the maximum by which we normalize the pdf
    this.density = Beta.pdf.factory(a, b)
    let mode = Beta.mode(a, b)
    this.max = this.density(mode)
  }

  relativeWidth(pos) {
    return this.density(pos) / this.max
  }
}

const brushes = {
  constant: ConstantBrush,
  sine: SineBrush,
  beta: BetaBrush,
}

function factory(name, params={}) {
  let brushClass = brushes[name]
  return new brushClass(params)
}

export default { 
  factory,
  ...brushes 
}