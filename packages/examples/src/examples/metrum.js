

import Text from "@metrum/paper/src/Text"
import { Point } from "paper"
import { styles, animateOnMouseMove } from "@metrum/paper";

const metrum = () => () => {
  let style = styles.factory('metrum', { unit: 10 })
  let par = new Text('metrum', style)
  const point = new Point(100, 150)
  par.draw(point)
  animateOnMouseMove(style)

  // textLine.showBounds()
  // let p = textLine.group.bounds.topLeft
  // let c = new Path.Circle(p, 4)
  // c.fillColor = 'red'

  // let t = setText(p.add(new Point(0, -unit)), 'studio')
  // t.fontSize = unit * 3.
}

metrum.parameters = []

export default metrum
