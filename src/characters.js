import Paper from "paper";
import Character from "./character.js"

class Character_a extends Character {
  char = 'a'

  draw(point) {
    let loop = this.drawLoop(point)
    let stem = this.drawStem(point, 3)
    this.group.addChildren([stem, loop])
  }
}

class Character_b extends Character {
  char = 'b'

  draw(point) {
    let loop = this.drawLoop(point)
    let stem = this.drawStem(point, 0, 0, 7)
    this.group.addChildren([stem, loop])
  }
}

class Character_c extends Character {
  char = 'c'

  draw(point) {
    let top = this.drawArc(point, 0, 5, -45, 'topLeft')
    let bottom = this.drawArc(point, 0, 0, 180 + 45)
    let stem = this.drawStem(point, 0.3, .5)
    this.group.addChildren([stem, top, bottom])
  }
}

class Character_d extends Character {
  char = 'd'

  draw(point) {
    let stem = this.drawStem(point, 3, 0, 6)
    let loop = this.drawLoop(point)
    this.group.addChildren([stem, loop])
  }
}

class Character_e extends Character {
  char = 'e'

  draw(point) {
    let top = this.drawArc(point, 0, 2, -this.axis)
    let bottom = this.drawArc(point, 0, 0, 180+2*this.axis)
    let bar = this.drawLine(point, -.2, 1.45, -this.axis)
    this.group.addChildren([top, bottom, bar])
  }
}

class Character_f extends Character {
  char = 'f'

  draw(point) {
    let stem = this.drawStem(point, 1 ,0, 6)
    let bar = this.drawLine(point, 0, 4)
    let terminal = this.drawArc(point, 1, 4.5, -2*this.axis)
    this.group.addChildren([stem, bar, terminal])
  }
}

class Character_g extends Character {
  char = 'g'

  draw(point) {
    let loop = this.drawLoop(point)
    let stem = this.drawStem(this.p(point, 3, -2))
    let terminal = this.drawArc(point, -.05, -3, 180-this.axis)
    this.group.addChildren([stem, loop, terminal])
  }
}

class Character_h extends Character {
  char = 'h'

  draw(point) {
    let stem = this.drawStem(point, 0, 0, 7)
    let shoulder = this.drawShoulder(point)
    let leg = this.drawStem(point, 3, 0)
    this.group.addChildren([stem, leg, shoulder])
  }
}

class Character_i extends Character {
  char = 'i'

  draw(point) {
    let stem = this.drawStem(point, 0, 0, 5)
    this.group.addChild(stem)
  }
}

class Character_j extends Character {
  char = 'j'

  draw(point) {
    let stem = this.drawStem(point, 3, -2, 7)
    let term = this.drawArc(point, -.05, -3, 180-this.axis)
    this.group.addChildren([stem, term])
  }
}

class Character_k extends Character {
  char = 'k'

  draw(point) {
    let stem = this.drawStem(point, 0, 0, 7)

    let topLeg = this.arc.place().rotate(180 - 2 * this.axis)
    topLeg.position = topLeg.position
      .subtract(topLeg.bounds.bottomLeft)
      .add(this.p(point, -.25, 1.75))

    let bottomLeg = this.arc.place().rotate(this.axis)
    bottomLeg.position = bottomLeg.position
      .subtract(bottomLeg.bounds.topLeft)
      .add(this.p(point, -.25, 2.75))
    
    this.group.addChildren([stem, topLeg, bottomLeg])
  }
}

class Character_l extends Character {
  char = 'l'

  draw(point) {
    let stem = this.drawStem(point, 0, 0, 7)
    let terminal = this.drawArc(point, -.25, 0, 180+this.axis)
    this.group.addChildren([stem, terminal])
  }
}

class Character_m extends Character {
  char = 'm'

  draw(point) {
    let lStem = this.drawStem(point, 0)
    let cStem = this.drawStem(point, 2.75)
    let rStem = this.drawStem(point, 5.5)
    let lShoulder = this.drawShoulder(point)
    let rShoulder = this.drawShoulder(point, 2.5)
    this.group.addChildren([lStem, cStem, rStem, lShoulder, rShoulder])

  }
}

class Character_n extends Character {
  char = 'n'

  draw(point) {
    let lStem = this.drawStem(point, 0)
    let rStem = this.drawStem(point, 3)
    let shoulder = this.drawShoulder(point)
    this.group.addChildren([lStem, rStem, shoulder])
  }
}

class Character_o extends Character {
  char = 'o'

  draw(point) {
    let loop = this.drawLoop(point)
    this.group.addChild(loop)
  }
}

class Character_p extends Character {
  char = 'p'

  draw(point) {
    let loop = this.drawLoop(point)
    let descender = this.drawStem(point, 0, -2)
    this.group.addChildren([descender, loop])
  }
}

class Character_q extends Character {
  char = 'q'

  draw(point) {
    let loop = this.drawLoop(point)
    let descender = this.drawStem(point, 3, -2)
    this.group.addChildren([descender, loop])
  }
}

class Character_r extends Character {
  char = 'r'

  draw(point) {
    let stem = this.drawStem(point)
    let terminal = this.drawArc(point, -.05, 5, -this.axis, 'topLeft')
    this.group.addChildren([stem, terminal])
  }
}

class Character_s extends Character {
  char = 's'

  draw(point) {
    let top = this.drawArc(point, 0.1, 5.2, -45, 'topLeft')
    let bottom = this.drawArc(point, -0.1, -.2, 3*45)
    let spine = this.drawLine(point, .1, .73, 45)
    this.group.addChildren([spine, top, bottom])
  }
}

class Character_t extends Character {
  char = 't'

  draw(point) {
    let stem = this.drawStem(point, 1, 2)
    let bar = this.drawLine(point, 0, 4)
    let terminal = this.drawArc(point, 1, 0, 180 + 2*this.axis)
    this.group.addChildren([stem, bar, terminal])
  }
}

class Character_u extends Character {
  char = 'u'
  
  draw(point) {
    let lArm = this.drawStem(point, 0, 1)
    let rArm = this.drawStem(point, 3, 1)
    let vertex = this.drawArc(point, 0, 0, 180)
    this.group.addChildren([lArm, rArm, vertex])
  }
}

class Character_v extends Character {
  char = 'v'

  draw(point) {
    let lArm = this.line.place().rotate(90 - this.axis)
    let rArm = this.line.place().rotate(90 + this.axis)
    this.moveTo(lArm, point, -.5, .8)
    this.moveTo(rArm, point, 2.5, .8)
    let vertex = this.drawArc(point, 0, 0, 180)
    this.group.addChildren([lArm, rArm, vertex])
  }
}

class Character_w extends Character {
  char = 'w'

  draw(point) {
    let lArm = this.drawStem(point, 0, 1)
    let cArm = this.drawStem(point, 2.75, 1)
    let rArm = this.drawStem(point, 5.5, 1)
    let lVertex = this.drawArc(point, 0, 0, 180)
    let rVertex = this.drawArc(point, 2.5, 0, 180)
    this.group.addChildren([lArm, cArm, rArm, lVertex, rVertex])
  }
}

class Character_x extends Character {
  char = 'x'

  draw(point) {
    let bar = this.drawLine(point, 0, 2)
    let cup = this.drawArc(point, 0, 2.5, 180)
    let cap = this.drawArc(point)
    this.group.addChildren([cup, cap, bar])
  }
}

class Character_y extends Character {
  char = 'y'

  draw(point) {
    let lArm = this.drawStem(point, 0, 1)
    let stem = this.drawStem(point, 3, -2, 7)
    let cup = this.drawArc(point, 0, 0, 180)
    let descCup = this.drawArc(point, 0, -3, 180-this.axis)
    this.group.addChildren([lArm, stem, cup, descCup])
  }
}

class Character_z extends Character {
  char = 'z'

  draw(point) {
    let top = this.drawLine(point, 0, 4)
    let diag = this.line.place().rotate(-45)
    this.moveTo(diag, point, .8, .85)
    let arc = this.arc.place().rotate(45)
    this.moveTo(arc, point, 0, -2)
    this.group.addChildren([top, diag, arc])
  }
}

class Character_space extends Character {
  char = ' '

  draw(point) {
    let size = new Paper.Size(this.unit * 2, 1)
    let rect = new Paper.Path.Rectangle(point, size)
    this.group.addChild(rect)
  }
}


const characters = {
  a: Character_a,
  b: Character_b,
  c: Character_c,
  d: Character_d,
  e: Character_e,
  f: Character_f,
  g: Character_g,
  h: Character_h,
  i: Character_i,
  j: Character_j,
  k: Character_k,
  l: Character_l,
  m: Character_m,
  n: Character_n,
  o: Character_o,
  p: Character_p,
  q: Character_q,
  r: Character_r,
  s: Character_s,
  t: Character_t,
  u: Character_u,
  v: Character_v,
  w: Character_w,
  x: Character_x,
  y: Character_y,
  z: Character_z,
  ' ': Character_space
}

export default characters