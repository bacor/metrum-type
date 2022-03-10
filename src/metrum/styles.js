import Paper from "paper";
import { Arc, Line } from "./shapes"

class Style {
  constructor({ unit, arc, line, animate=true }={}) {
    this.unit = unit
    this.arc = arc
    this.line = line
    this.arcSymbol = arc.symbol
    this.lineSymbol = line.symbol

    if(animate) {
      Paper.view.onMouseMove = this.onMouseMove.bind(this)
    }
  }
}

class StyleMetrum extends Style {
  constructor({ 
    unit, 
    arcStyle={fillColor: '#00ADCE99'},
    lineStyle={fillColor: '#FFAE0099'},
    blendMode='multiply',
    brush='beta',
    brushOptions,
    ...opts 
  }={}) {
    const shapeOpts = {
      unit,
      brush,
      brushOptions: { width: unit / 2, ...brushOptions }
    }
    let arc = new Arc(shapeOpts)
    let line = new Line(shapeOpts)
    arc.style = arcStyle
    line.style = lineStyle
    line.group.blendMode = blendMode
    arc.group.blendMode = blendMode

    super({ unit, arc, line, ...opts })
  }

  onMouseMove(event) { 
    let {width, height} = Paper.view.bounds
    let {x, y} = event.point

    let concentration = y / height * 6 
    let skew = ((x / width) - .5) * concentration

    this.line.updateBrush({ 
      // width: (.1 + .9 * (x / width)) * this.unit, 
      // intensity: y / height,
      concentration, skew
    })
    this.arc.updateBrush({ 
      // width: (.1 + .9 * x / width) * this.unit, 
      // intensity: y / height,
      concentration, skew
    })
  }
}

class StyleConstruction extends StyleMetrum {
  constructor(opts) {
    super({
      arcStyle: {
        strokeColor: '#00ADCE99',
        fillColor: '#00ADCE66',
      },
      linestyle: {
        strokeColor: '#FFAE0099',
        fillColor: '#FFAE0066',
      },
      brush: 'beta',
      ...opts
    })
    this.arc.spine.strokeColor = 'black'
    this.line.spine.strokeColor = 'black'
  }
}

class StyleBlack extends StyleMetrum {
  constructor(opts) {
    super({
      arcStyle: {
        fillColor: '#222',
      },
      lineStyle: {
        fillColor: '#222',
      },
      blendMode: 'darken',
      ...opts
    })
  }
}

export default {
  metrum: opts => new StyleMetrum(opts),
  construction: opts => new StyleConstruction(opts),
  black: opts => new StyleBlack(opts),
}