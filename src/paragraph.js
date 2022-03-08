import { Point, Group } from "paper"

import Text from "./text"

class Paragraph {
    constructor(text, {
        unit = 20,
        lineHeight = 1,
        maxCharacterHeight = 11,
        ...textOpts
    } = {}) {
        this.lineHeight = lineHeight
        this.maxCharacterHeight = maxCharacterHeight
        this.unit = unit
        this.group = new Group()

        let textLines = text.split("\n")
        this.lines = []
        for(let i=0; i<textLines.length; i++) {
            let line = new Text(textLines[i], {
                unit, 
                ...textOpts
            })
            this.lines.push(line)
        }
        console.log(this.lines)
    }

    draw(point) {
        
        for(let i=0; i<this.lines.length; i++) {
            let group = this.lines[i].draw(point)
            let deltaY = this.unit * this.lineHeight * this.maxCharacterHeight
            point = point.add(new Point(0, deltaY))
            // groups.push(group)
        }
        
    }
}

export default Paragraph