import Paper from "paper";
import { Point, Group, Path } from "paper"
import characters from "./characters"
import kerning from "./kerning"

class TextLine {
  constructor(text, {
    arcSymbol, lineSymbol, unit,
    characterSpacing = 1,
    ...opts
  } = {}) {
    this.text = text
    this.group = new Group()
    this.spacing = characterSpacing

    this.chars = []
    for(var i=0; i < text.length; i++) {
      if(text[i] in characters) {
        let CharClass = characters[text[i]];
        let character = new CharClass({
          arcSymbol, lineSymbol, unit,
          ...opts
        })
        this.chars.push(character)
      } else {
        console.warn(`Character is ${text[i]} not supported and ignored.`)
      }
    }
  }

  showBounds() {
    let rect = new Path.Rectangle(this.group.bounds)
    rect.strokeColor = 'red'
    return rect
  }

  draw(point) {
    for(var i=0; i < this.chars.length; i++) {
      let char = this.chars[i]
      char.draw(point)
      this.group.addChild(char.group)
      
      // Update position of next character
      if(i < this.chars.length - 1) {
        let curChar = char.char
        let nextChar = this.chars[i + 1].char

        let kern = 0
        if(curChar in kerning) {
          if(nextChar in kerning[curChar]) {
            kern = kerning[curChar][nextChar]
          }
        }
        let width = char.group.bounds.width
        let space = char.unit * (kern + this.spacing)
        point = point.add(new Point(width + space, 0))
      }
    }
  }
}

class Text {
  constructor(text, {
    arcSymbol, lineSymbol, unit,
    lineHeight = 1,
    maxCharacterHeight = 11,
    ...opts
  } = {}) {
    this.lineHeight = lineHeight
    this.maxCharacterHeight = maxCharacterHeight
    this.unit = unit
    this.group = new Group()

    let textLines = text.split("\n")
    this.lines = []
    for(let i=0; i<textLines.length; i++) {
      let line = new TextLine(textLines[i], {
        arcSymbol, lineSymbol, unit,
        ...opts
      })
      this.lines.push(line)
    }
  }

  draw(point=Paper.view.bounds.bottomLeft) {
    for(let i=0; i<this.lines.length; i++) {
      let line = this.lines[i]
      line.draw(point)
      let deltaY = this.unit * this.lineHeight * this.maxCharacterHeight
      point = point.add(new Point(0, deltaY))
      this.group.addChild(line.group)
    }
  }
}

export default Text
