import { render } from './render.js';

const { booleans, colors, primitives, transforms } = jscadModeling // modeling comes from the included MODELING library
const { translate, rotate } = transforms;

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, cuboid, sphere, polygon, polyhedron } = primitives

const sierpinski_not_cube = (parameters, iterations = 0) => {
    const size = parameters.size;

    if (iterations === 0) {
        return cube({ size: size });
    }

    /* make some "pyramids" in a pyramadical shape */
    
    // By how much we want to move the smaller cubes
    const deltaAmount = () => {
        // Half the original size, perturbed a bit, made a bit smaller for overlap
        const halfSize = size / 2;
        const rand = Math.random() * .2 + .9;
        const aBitSmaller = 0.8;

        return aBitSmaller * rand * halfSize;
    };

    // How big the smaller cubes should be
    // Half the original size, made a bit bigger for overlap
    const smallerSize = 1.1 * size / 2;

    return [
        translate([0, 0, deltaAmount()], sierpinski_not_cube({ size: smallerSize}, iterations - 1)),
        translate([deltaAmount(), 0, 0], sierpinski_not_cube({ size: smallerSize}, iterations - 1)),
        translate([-deltaAmount(), 0, 0], sierpinski_not_cube({ size: smallerSize}, iterations - 1)),
        translate([0, deltaAmount(), 0], sierpinski_not_cube({ size: smallerSize}, iterations - 1)),
        translate([0, -deltaAmount(), 0], sierpinski_not_cube({ size: smallerSize}, iterations - 1))
    ]
}

const height = 10;
const totalIterations = 18;
const scaleFactor = 0.8;

const pentagon_tower =(parameters, iterations = 0) => {
    const size = parameters.size;
    const shape = parameters.shape;

    const rand = Math.random() * 2.0; 
    // const rand = 0; 

    if (iterations === 0) {
        return shape;
    }

    const c1 = Math.cos((2 * Math.PI) / 5) * size + rand;
    const c2 = Math.cos((Math.PI) / 5) * size  + rand;
    const s1 = Math.sin((2 * Math.PI) / 5) * size + rand;
    const s2 = Math.sin((4 * Math.PI) / 5) * size  + rand;

    const height1 = height * (totalIterations - iterations);
    const height2 = height * (totalIterations - iterations) + height;

    let mypoints = [ [0, size, height1], [s1, c1, height1], [s2, -c2, height1], [-s2, -c2, height1], [-s1, c1, height1],
                     [0, size, height2], [s1, c1, height2], [s2, -c2, height2], [-s2, -c2, height2], [-s1, c1, height2] ]
    let myfaces = [ [4, 3, 2, 1, 0], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 8, 7], [3, 4, 9, 8], [4, 0, 5, 9], [5, 6, 7, 8, 9]]
    let myshape = polyhedron({points: mypoints, faces: myfaces, orientation: 'inward'});

    let rotation = Math.random() * Math.PI * 2;
    // let rotation = (Math.PI / 2) / 8;

    if(shape === null) {
        return pentagon_tower({size: size * scaleFactor, shape: rotate([0, 0, rotation], myshape)}, iterations - 1);
    } else {
        return pentagon_tower({size: size * scaleFactor, shape: rotate([0, 0, rotation], union(myshape, shape))}, iterations - 1);
    }
}

// render(document.getElementById("render"), 
//        sierpinski_not_cube({ size: 100 }, 3));

render(document.getElementById("render"), 
       pentagon_tower({ size: 100, shape: null }, totalIterations));