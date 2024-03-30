const step = (lindenmayerString) => {
  return [...lindenmayerString]
    .map(letter => rules[letter])
    .join('');
};

const expand = (iterations, lindenmayerString) => {
  let expandedString = lindenmayerString;
  for (let i = 0; i < iterations; i++) {
    expandedString = step(expandedString);
  }
  return expandedString;
};

// Here, 
// F and G both mean "draw forward", 
// + means "turn left by angle", and 
// − means "turn right by angle".
const drawToPoints = (lindenmayerString) => {
  let startingPoint = [0, 0];
  let rotation = Math.PI / 180 * -45;
  let lineLength = 2;
  let stateStack = [];
  let paths = [];
  let points = [startingPoint];

  const moveForward = () => {
    const lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
  };
  
  const theRightThing = {
    'F': moveForward,
    'X': () => {},
    '+': () => {
      rotation = rotation - angle * Math.PI / 180;
    },
    '-': () => {
      rotation = rotation + angle * Math.PI / 180;
    },
    '[': () => {
      stateStack.push({
        position: points[points.length - 1],
        rotation
      });
    },
    ']': () => {
      paths.push(points);
      points = [];

      const state = stateStack.pop();
      points.push(state.position);
      rotation = state.rotation;
    }
  };

  [...lindenmayerString]
    .forEach(letter => {
      const doTheRightThing = theRightThing[letter];
      doTheRightThing();
    });

  return paths;
};

const rules = ({
  'X': 'F+[[X]-X]-F[-FX]+X',
  'F': 'FF',
  '-': '-',
  '+': '+',
  '[': '[',
  ']': ']'
});

const iterations = 7;
const start = 'X';

const expansion = expand(iterations, start);
const angle = 25;
const paths = drawToPoints(expansion);

const svg = document.querySelector('svg');

// make group for polylines
const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
// make svg polylines
for (let i = 0; i < paths.length; i++) {
  const points = paths[i];

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points.join(' '));
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', 'black');
  polyline.setAttribute('stroke-width', '1px');
  // set opacity to 0.5
  polyline.setAttribute('opacity', '0.5');

  // add the polyline to the svg
  g.appendChild(polyline);
}

// transform g
g.setAttribute('transform', 'translate(-80, 50) scale(0.30)')

// add the group to the svg
svg.appendChild(g);



