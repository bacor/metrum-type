import Canvas from './metrum/Canvas';
import './App.css';
import example from './examples';
// import example from './metrum';

function App() {
  return (
    <div id="canvas-container">
      <Canvas drawing={example} />
    </div>
  );
}

export default App;
