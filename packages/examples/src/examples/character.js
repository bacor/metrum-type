import Text from "@metrum/paper/src/Text"
import { Point, Path } from "paper"
import { styles, animateOnMouseMove } from "@metrum/paper";

const character = (text) => () => {
  let unit = 30
  let style = styles.factory('construction', { unit })
  
  const point = new Point(150, 270)
  let circle = new Path.Circle(point, 3)
  circle.fillColor = 'black'
  
  let textLine = new Text(text, style)
  textLine.draw(point)
}

character.parameters = 'abcdefghijklmnopqrstuvwxyz'.split('') 

export default character