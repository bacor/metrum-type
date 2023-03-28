import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Canvas from './canvas';
import examples from './examples';
import Paper from 'paper';

function App() {
  const getDrawing = (example, param) => examples[example](param);
  const [example, setExample] = useState('brushes')
  const [param, setParam] = useState()
  const exampleRef = useRef(null)
  const paramRef = useRef(null)

  return (
    <div className="container">
      <form>
        <label htmlFor="select-example">Example</label>
        <select ref={exampleRef}
          id='select-example'
          onChange={e => { 
            setExample(e.target.value)
            setParam(examples[e.target.value].parameters[0])
          }}
          value={example}>
          {Object.keys(examples).map(
            ex => <option key={ex} value={ex}>{ex}</option>
          )}
        </select>

        <label htmlFor="select-param">Parameters:</label>
        <select id="select-param" ref={paramRef}
          value={param}
          onChange={(e) =>{
            setParam(e.target.value)
          }}>
          {
            examples[example].parameters.map(param =>
              <option key={param}>{param}</option>)
          }
        </select>
      </form>
      <div className="example-container">
        <Canvas drawing={getDrawing(example, param)} />
      </div>
    </div>
  );
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);