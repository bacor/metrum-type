import Text from "@metrum/paper/src/Text"
import { Point } from "paper"
import { styles, animateOnMouseMove } from "@metrum/paper";

const paragraph = (text) => () => {
  let style = styles.factory('metrum', { 
    unit: 6,
    arcStyle: {fillColor: '#ff0000'},
    lineStyle: {fillColor: '#000000'}
  })
  let par = new Text(text, style)
  const point = new Point(100, 150)
  par.draw(point)
  animateOnMouseMove(style)
}

paragraph.parameters = [
  "studio metrum\ndesign and code",
  "lorem ipsum dolor\nsit amet"
]

export default paragraph