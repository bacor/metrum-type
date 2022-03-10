import './App.css';

import MetrumText from "./metrum/MetrumText"
import example from './examples';
import Canvas from './metrum/Canvas';

function showExample(example) {
  return () => (
    <div className="example-container">
      <Canvas drawing={example} />
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <MetrumText 
        width="100%" 
        height="200px" 
        align="bottomLeft"
        // brushOpts={{ intensity: .5 }} 
        size={6}
      >
        hallo zeg <br />
        boe schrik whaat
      </MetrumText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit
        elit at est ornare aliquam quis ut turpis.  Ut quis mauris sollicitudin, 
        bibendum arcu eget, facilisis dolor. Fusce iaculis, sapien quis 
        malesuada lacinia, purus nibh suscipit magna, a viverra diam eros luctus
        velit. Morbi in auctor eros. Nullam facilisis nisl a urna interdum 
        iaculis. Mauris sollicitudin, sem vel iaculis sagittis, libero velit 
        gravida lectus, vitae venenatis mi nulla vel neque. Sed ipsum nulla, 
        feugiat et tellus et, luctus porttitor quam.
      </p>

      <MetrumText width="100%" height="100px" align="bottomLeft" size={7}>
        daar gaan we
      </MetrumText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit
        elit at est ornare aliquam quis ut turpis.  Ut quis mauris sollicitudin, 
        bibendum arcu eget, facilisis dolor. Fusce iaculis, sapien quis 
        malesuada lacinia, purus nibh suscipit magna, a viverra diam eros luctus
        velit. Morbi in auctor eros. Nullam facilisis nisl a urna interdum 
        iaculis. Mauris sollicitudin, sem vel iaculis sagittis, libero velit 
        gravida lectus, vitae venenatis mi nulla vel neque. Sed ipsum nulla, 
        feugiat et tellus et, luctus porttitor quam.
      </p>
    </div>
  );
}

// export default App
export default showExample(example);
