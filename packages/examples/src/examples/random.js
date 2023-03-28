import Paper from "paper";
import { Point } from "paper"
import { styles } from "@metrum/paper";


const random = () => {
  let style = styles.factory('construction', { unit: 30 })
  for(var i=0; i<10; i++){
    let a = style.arcSymbol.place()
    let l = style.lineSymbol.place()
    l.position = Point.random().multiply(Paper.view.size)
    a.position = Point.random().multiply(Paper.view.size)
  }
}

random.parameters = []

export default random