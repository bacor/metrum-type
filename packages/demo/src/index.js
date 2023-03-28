import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Canvas from '@metrum/examples/src/canvas';
import Canvas from './canvas';
// import examples from './examples';
import { scaleProject } from '@metrum/paper';
import Paper from 'paper';

import Text from "@metrum/paper/src/Text"
import { Point } from "paper"
import { styles, animateOnMouseMove } from "@metrum/paper";


// let style = styles.factory('metrum', { 
//   unit: 13.5,
//   arcStyle: {
//     fillColor: '#fff',
//     strokeColor: '#57cc99cc',
//     strokeWidth: 2,
//   },
//   lineStyle: {
//     // fillColor: '#22577acc'
//     fillColor: '#fff',
//     strokeColor: '#22577acc',
//     strokeWidth: 2
//   },
//   blendMode: 'lighten',
// })

const Title = () => {
  const drawing = () => () => {
    // let style = styles.factory('metrum', { 
    //   unit: 13.5,
    //   arcStyle: {
    //     fillColor: '#fcf300',
    //   },
    //   lineStyle: {
    //     fillColor: '#ff4d6d',
    //   },
    //   blendMode: 'luminosity',
    // })
    let style = styles.factory('metrum', { 
      unit: 13.5,
      arcStyle: {fillColor: '#22577acc'},
      lineStyle: {fillColor: '#57cc99cc'},
      blendMode: 'hue',
    })
    let alph = 'metrum\ntype beta'
    let par = new Text(alph, {
      lineHeight: 0.85,
      ...style
    })
    const point = new Point(0, 100)
    par.draw(point)
    animateOnMouseMove(style)
    scaleProject(Paper.project)
  }

  return (
    <>
      <section style={{
        backgroundColor: '#c7f9cc', 
      }}>
        <Canvas drawing={drawing()}  style={{ height: '26vw'}}/>
      </section>
    </>
  )
}


const Alphabet = () => {
  const alphabet = () => () => {
    let style = styles.factory('metrum', { 
      unit: 13.5,
      arcStyle: {fillColor: '#22577acc'},
      lineStyle: {fillColor: '#57cc99cc'},
      blendMode: 'hue',
    })
    let alph = 'abcd  stuvwxyz\nefghijk lmnopqr\nlmnopqr efghijk\nstuvwxyz  abcd'
    let par = new Text(alph, {
      lineHeight: 0.85,
      ...style
    })
    const point = new Point(0, 100)
    par.draw(point)
    animateOnMouseMove(style)
    scaleProject(Paper.project)
  }

  return (
    <>
      <section style={{
        backgroundColor: '#c7f9cc', 
      }}>
        <Canvas drawing={alphabet()} />
      </section>
    </>
  )
}

const Shapes = () => {
  const shapes = () => () => {
    let style = styles.factory('metrum', { 
      unit: 70,
      arcStyle: {
        fillColor: '#22577A11',
        strokeColor: '#22577A',
        strokeWidth: 2,
      },
      lineStyle: {
        fillColor: '#57cc99',
        strokeColor: '#22577A',
        strokeWidth: 2,
      },
      blendMode: 'add',
    })
    for(var i=0; i<7; i++){
      let a = style.arcSymbol.place()
      let l = style.lineSymbol.place()
      l.position = Point.random().multiply(Paper.view.size)
      a.position = Point.random().multiply(Paper.view.size)
      a.rotate(Math.random() * 360)
      l.rotate(Math.random() * 360)
    }
    animateOnMouseMove(style)
    scaleProject(Paper.project)
  }

  return (
    <>
      <section style={{backgroundColor: '#38A3A5' }}>
        <Canvas drawing={shapes()} />
      </section>
    </>
  )
}



const Headline = () => {
  return (
    <section style={{background: '#38A3A5'}}>
      <p className="large-text" style={{color: '#80ED99'}}>
          Metrum Type Beta is an experimental typeface 
          designed by Bas Cornelissen for Studio Metrum.
          It is made from only arcs and lines: the shapes 
          used to notate metre in poetry. 
        </p>
    </section>
  )
}


const Details = () => {
  return (
    <section style={{background: '#38A3A5'}}>
      <p className="large-text" style={{color: '#80ED99'}}>
          By changing the brush used to draw the shapes, 
          you can drastically shift the appearance of the typeface. 
          The width of the brush is computed using the
          shape of a so-called <a href="https://en.wikipedia.org/wiki/Beta_distribution">beta distribution</a>.
          This explains the name, but the typeface is also 'beta' in the technical sense.
          It is not yet an ordinary typeface, but has been implemented
          from scratch using <a href="http://paperjs.org/">Paper.js</a>.
          Have a look at the code on  <a href="http://github.com/bacor/metrum-type-beta">GitHub</a>.
        </p>
    </section>
  )
}


function App() {
//   const getDrawing = (example, param) => examples[example](param);
//   const [example, setExample] = useState('brushes')
//   const [param, setParam] = useState()
//   const exampleRef = useRef(null)
//   const paramRef = useRef(null)

  return (
    <div className="container">
        <Title />
        <Headline />
        <Shapes />
        <Alphabet />
        <Details />
    </div>
  );
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);