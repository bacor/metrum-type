import Paper from "paper";
import { Path, Point, Group, PointText } from "paper"

import Text from "./text"
import styles from "./styles";

const showMetrum = () => {
  let unit = 10
  let style = styles.metrum({ unit })
  let textLine = new Text('metrum', style)
  textLine.draw(new Point(unit, unit * 7))

  let g = textLine.group
  g.fillColor='red'
  // g.position = g.position
  //   .subtract(g.bounds.bottomLeft)
  //   .add(new Point(200, 0))
  var p = g.bounds.bottomLeft
  p.add(new Point(
    100,
    // Paper.view.bounds.width * 0.1, 
    0))
  var t = new PointText(p);
  t.fillColor = 'black';
  t.content = 'Studio'
  t.fontWeight  = 'bold'
  t.fontFamily = 'Helvetica Neue'
  // let rect = new Paper.Rectangle(new Point(0, 40), 
  //   new Paper.Size(30, 30))
  // rect.fillColor='blue'
  // t.fitBounds(new Paper.Rectangle(g.position, new Paper.Size(1*unit, 1000*unit)))

  
  textLine.group.fitBounds(Paper.view.bounds.scale(.9))
  Paper.view.onResize = (event) => {
    textLine.group.fitBounds(Paper.view.bounds.scale(.9))
  }
}

export default showMetrum