import Paper from "paper";
import { Path, Point, Group } from "paper"

import characters from "./characters"
import Text from "./text"
import Paragraph from "./paragraph";
import styles from "./styles";

const random = () => {
  let style = styles.construction({ unit: 30 })
  for(var i=0; i<10; i++){
    let a = style.arcSymbol.place()
    let l = style.lineSymbol.place()
    l.position = Point.random().multiply(Paper.view.size)
    a.position = Point.random().multiply(Paper.view.size)
  }
}

const showSingleChar = (text) => () => {
  let unit = 30
  let style = styles.construction({ unit, animate: false })
  
  const point = new Point(150, 270)
  let circle = new Path.Circle(point, 3)
  circle.fillColor = 'black'
  
  let textLine = new Text(text, style)
  textLine.draw(point)
}

const showText = (text) => () => {
  let unit = 10
  let style = styles.metrum({ unit })
  let textLine = new Text(text, style)
  textLine.draw(new Point(100, 200))
}

const showAlphabet = () => {
  let style = styles.metrum({ unit: 10 })
  let alphabet = 'abcdefghijklm\nnopqrstuvwxyz'
  let par = new Paragraph(alphabet, {  
    ...style
  })
  par.draw(new Point(100, 150))
}

const showParagraph = (text) => () => {
  let style = styles.metrum({ unit: 10 })
  let par = new Paragraph(text, style)
  const point = new Point(100, 150)
  par.draw(point)
}

// export default random
// export default showSingleChar('f')
// export default showText('xfyfzf')
// export default showAlphabet
export default showParagraph("metrum\nlorem ipsum\ndolor sed amet");