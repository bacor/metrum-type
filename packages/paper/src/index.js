import styles from "./styles";
import brushes from "./brushes";
import Text from "./Text";
import { Style } from "paper/dist/paper-core";
import { Arc, Line } from "./shapes";
import { animateOnMouseMove, scaleProject } from "./utils";

export {
    Text,
    Style,

    brushes,
    styles,

    // Shapes
    Arc, 
    Line,
    
    // Utilities
    animateOnMouseMove, 
    scaleProject
};