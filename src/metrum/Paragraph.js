import Paper from "paper";
import { Point, Group } from "paper"
import Text from "./Text"

class Paragraph {
  constructor(text, {
    unit = 20,
    lineHeight = 1,
    maxCharacterHeight = 11,
    ...textOpts
  } = {}) {
    this.lineHeight = lineHeight
    this.maxCharacterHeight = maxCharacterHeight
    this.unit = unit
    this.group = new Group()

    let textLines = text.split("\n")
    this.lines = []
    for(let i=0; i<textLines.length; i++) {
      let line = new Text(textLines[i], {
        unit, 
        ...textOpts
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

export default Paragraph