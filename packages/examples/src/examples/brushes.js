import Paper from "paper";
import { Path, Point, Group } from "paper"
import { Arc, Line } from "@metrum/paper";

const brushes = (brush='beta') => () => {
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

brushes.parameters = [
  'constant',
  'sine',
  'beta'
]

export default brushes
