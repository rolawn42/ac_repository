import { render } from './render.js';

const { booleans, colors, primitives, transforms } = jscadModeling // modeling comes from the included MODELING library

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, cuboid, sphere } = primitives

const demo = (parameters) => {

    const size = parameters.size;

    const shell = subtract( // https://openjscad.xyz/docs/module-modeling_booleans.html#.subtract
        cube({ size: size }), // https://openjscad.xyz/docs/module-modeling_primitives.html#.cube
        sphere({ radius: 2/3 * size, segments: 32 }) // https://openjscad.xyz/docs/module-modeling_primitives.html#.sphere
    );
    const center = booleans.intersect( // https://openjscad.xyz/docs/module-modeling_booleans.html#.intersect
        primitives.sphere({ radius: 1/3 * size, segments: 32 }), 
        primitives.cuboid({ size: [1/2 * size, 1/2 * size, 1/2 * size] }) // https://openjscad.xyz/docs/module-modeling_primitives.html#.cuboid
    );
    
    // https://openjscad.xyz/docs/module-modeling_colors.html#.colorize
    // https://openjscad.xyz/docs/module-modeling_colors.html#.colorNameToRgb
    return [
        colorize(colorNameToRgb('orange'), shell),
        colorize(colorNameToRgb('steelblue'), center)
    ];
}

render(document.getElementById("render"), demo({ size: 300 }));