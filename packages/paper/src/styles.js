import Paper from "paper";
import { Arc, Line } from "./shapes"

class Style {
  constructor({ 
    unit,
    arcStyle={},
    lineStyle={},
    ...shapeOpts
  } = {}) {
    this.unit = unit
    this.arc = new Arc({ unit, ...shapeOpts, ...arcStyle })
    this.line = new Line({ unit, ...shapeOpts, ...lineStyle })
    this.arcSymbol = this.arc.symbol
    this.lineSymbol = this.line.symbol
  }

  updateBrush(brushParams) {
    this.line.updateBrush(brushParams)
    this.arc.updateBrush(brushParams)
  }
}

class StyleMetrum extends Style {
  constructor({ 
    arcStyle={},
    lineStyle={},
    blendMode='multiply',
    brush='beta',
    ...opts
  }={}) {
    super({
      arcStyle: {
        fillColor: '#00ADCE99', 
        strokeColor: null, 
        ...arcStyle
      }, 
      lineStyle: {
        fillColor: '#FFAE0099',
        strokeColor: null,
        ...lineStyle
      }, 
      blendMode,
      brush, 
      ...opts
    })
  }
}

class StyleConstruction extends StyleMetrum {
  constructor({ 
    arcStyle={},
    lineStyle={},
    blendMode='multiply',
    brush='beta',
    ...opts
  }={}) {
    super({
      arcStyle: {
        strokeColor: '#00ADCE99',
        fillColor: '#00ADCE66',
        ...arcStyle,
      },
      lineStyle: {
        strokeColor: '#FFAE0099',
        fillColor: '#FFAE0066',
        ...lineStyle,
      },
      brush,
      blendMode,
      ...opts
    })
    this.arc.spine.strokeColor = 'black'
    this.line.spine.strokeColor = 'black'
  }
}

class StyleBlack extends StyleMetrum {
  constructor({ 
    arcStyle={},
    lineStyle={},
    blendMode='multiply',
    ...opts
  }={}) {
    super({
      arcStyle: {
        fillColor: '#333',
        strokeColor: null,
        ...arcStyle,
      },
      lineStyle: {
        strokeColor: '#333',
        fillColor: '#000',
        ...lineStyle,
      },
      brush: 'beta',
      blendMode: 'darken',
      ...opts
    })
  }
}

const styles = {
  metrum: StyleMetrum,
  construction: StyleConstruction,
  black: StyleBlack
}

function factory(name, opts={}) {
  let styleClass = styles[name]
  return new styleClass(opts)
}

export default { 
  factory,
  ...styles 
}