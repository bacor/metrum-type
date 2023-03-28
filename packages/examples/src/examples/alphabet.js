

import Text from "@metrum/paper/src/Text"
import { Point } from "paper"
import { styles, animateOnMouseMove } from "@metrum/paper";

const alphabet = () => () => {
  let style = styles.factory('metrum', { unit: 8 })
  let alph = 'abcdefghijklm\nnopqrstuvwxyz'
  let par = new Text(alph, style)
  const point = new Point(20, 100)
  par.draw(point)
  animateOnMouseMove(style)
}

alphabet.parameters = []

export default alphabet
