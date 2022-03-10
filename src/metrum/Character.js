import { Point, Group, Path } from "paper"

class Character {
  char = null

  constructor({ 
    arcSymbol,
    lineSymbol,
    unit = 20,
    axis=15,
  } = {}) {    
    this.arc = arcSymbol
    this.line = lineSymbol
    this.group = new Group()
    this.unit = unit
    this.axis = axis
  }

  showBounds() {
    let rect = new Path.Rectangle(this.group.bounds)
    rect.strokeColor = 'red'
    return rect
  }
  
  draw(point) {
    // Draw the character such that the bottom left corner is point
  }
  
  step(x, y) {
    return new Point(x, y).multiply(this.unit)
  }

  p(point, x=0, y=0) {
    let delta = new Point(x, -y).multiply(this.unit)
    return point.add(delta)
  }

  moveTo(item, point, x=0, y=0, corner='bottomLeft') {
    item.position = item.position
      .subtract(item.bounds[corner])
      .add(this.p(point, x, y))
      return item
  }

  drawLine(point, x=0, y=0, rotation=0, corner='bottomLeft') {
    let line = this.line.place().rotate(rotation)
    return this.moveTo(line, point, x, y, corner)
  }

  drawArc(point, x=0, y=0, rotation=0, corner='bottomLeft') {
    let arc = this.arc.place().rotate(rotation)
    return this.moveTo(arc, point, x, y, corner=corner)
  }

  drawLoop(point) { 
    let top = this.arc.place(this.step(0, -2.5))
    let bottom = this.arc.place().rotate(180)

    let loop = new Group([top, bottom])
    loop.position = loop.position
      .subtract(loop.bounds.bottomLeft)
      .add(point)
    return loop
  }

  drawStem(point, x=0, y=0, length=4) {
    if(length == 4) {
      return this.drawLine(point, x, y, 90)

    } else {
      let top = this.drawLine(point, x, y, 90)
      let bottom = this.drawLine(point, x, y + length - 4, 90)
      return new Group([top, bottom])
    }
  }

  drawShoulder(point, x=0, y=5) {
    return this.drawArc(point, x, y, 0, 'topLeft')
  }
}

export default Character