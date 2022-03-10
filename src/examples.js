import Paper from "paper";
import { Path, Point, Group } from "paper"

import { Arc, Line } from "./metrum/shapes";
import Text from "./metrum/Text";
import styles from "./metrum/styles";
import { scaleProject } from "./metrum/utils";
import brushes from "./metrum/brushes";

const showBrush = (brush='beta') => () => {
  const shapeOpts = { 
    unit: 50, 
    brush, 
    brushOpts: {
      width: 10,
      intensity: 1,
      concentration: 5,
    }
  }
  let line = new Line({ ...shapeOpts })
  let arc = new Arc({ ...shapeOpts })
  line.symbol.place(new Point(200, 50))
  arc.symbol.place(new Point(200, 200))
}

const showStyle = (styleName='construction') => () => {
  let style = styles.factory(styleName, { unit: 30 })
  style.lineSymbol.place(new Point(200, 50))
  style.arcSymbol.place(new Point(200, 200))

}

const windowResizing = () => {
  let content = 'a'
  let unit = 30
  let style = styles.factory('construction', { unit, animate: true })
  
  const point = new Point(150, 270)
  let circle = new Path.Circle(point, 3)
  circle.fillColor = 'black'
  
  let text = new Text(content, style)
  text.draw(point)

  scaleProject(Paper.project)
}

const random = () => {
  let style = styles.factory('construction', { unit: 30 })
  for(var i=0; i<10; i++){
    let a = style.arcSymbol.place()
    let l = style.lineSymbol.place()
    l.position = Point.random().multiply(Paper.view.size)
    a.position = Point.random().multiply(Paper.view.size)
  }
}

const showSingleChar = (text) => () => {
  let unit = 30
  let style = styles.factory('construction', { unit })
  
  const point = new Point(150, 270)
  let circle = new Path.Circle(point, 3)
  circle.fillColor = 'black'
  
  let textLine = new Text(text, style)
  textLine.draw(point)
}

const showText = (text) => () => {
  let unit = 10
  let style = styles.factory('metrum', { unit })
  let textLine = new Text(text, style)
  textLine.draw(new Point(100, 200))
}

const showAlphabet = () => {
  let style = styles.factory('metrum', { unit: 10 })
  let alphabet = 'abcdefghijklm\nnopqrstuvwxyz'
  let par = new Text(alphabet, {  
    ...style
  })
  par.draw(new Point(100, 150))
}

const showParagraph = (text) => () => {
  let style = styles.factory('metrum', { unit: 10 })
  let par = new Text(text, style)
  const point = new Point(100, 150)
  par.draw(point)
}

const setText = (point, text) => {
  var t = new Paper.PointText(point);
  t.fillColor = 'black';
  t.content = text
  // t.fontWeight  = 'bold'
  t.fontStyle='italic';
  t.fontFamily = 'Fraunces'
  return t
}

const showMetrum = () => {
  let unit = 30
  let style = styles.factory('metrum', { unit })
  let textLine = new Text('metrum', style)
  textLine.draw(new Point(100, 300))

  // textLine.showBounds()
  let p = textLine.group.bounds.topLeft
  // let c = new Path.Circle(p, 4)
  // c.fillColor = 'red'

  let t = setText(p.add(new Point(0, -unit)), 'studio')
  t.fontSize = unit * 3.
}

// export default random
// export default showSingleChar('m')
// export default showText('xfyfzf')
// export default showAlphabet
export default showParagraph("metrum\ngraphic design\nand more");
// export default showMetrum
// export default showBrush()
// export default showStyle()
// export default windowResizing