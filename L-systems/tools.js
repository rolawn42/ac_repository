//use a template string to make a new svg instead of adding to an ID, 
    //its easier and it'll fix my problem

    //stuffs:
        //circles
        //ellipses
        //rectangles
        //polygons
        //paths
        //polylines
        //g (groups)
            //transform="rotate(45, 30, 30) (angle, pivotX, pivotYs)"
            //name = "green"
    //more on mdn: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes

    //transforms:
        //translate
        //rotate
        //scale
        //skew (also: skewX, skewY)
        //matrix
    //more on mdn: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

    //tool goals:
        //easy / simple interface (backend doesn't matter)
        //capability for advanced / programmatic actions
            //recursion
            //randomization
        //quick to iterate and adjust


    //createSVG

    // <---------------------------- Setup ---------------------------->

    body = document.querySelector("body");
    let elements = [];
    let groups = [];

    // <---------------------------- Primitives ---------------------------->

    function circle(r, style='') {
        return `<circle cx="0" cy="0" r="${r}" style="${style}"/>`;
    }

    function rect(w, h, style='') {
        return `<rect x="0" y="0" width="${w}" height="${h}" style="${style}"/>`;
    }

    function line (x2, y2, style='') {
        return `<line x1="0" y1="0" x2="${x2}" y2="${y2}" style="${style}" />"`;
    }

    function ellipse(rx, ry, style='') {
        return `<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" style="${style}" />`;
    }

    function polygon(points, style='') {
        return `<polygon points="${points}" style="${style}" />`;
    }

    function polyline(points, style='') {
        return `<polyline points="${points}" style="${style}" />`;
    }

    function path(d, style='') {
        return `<path d="${d}" style="${style}" />`;
    }
 
    function group(list, name, other, style='') {
        let newGroup = [name, other, style];
        if(list != "elements") {
            for(let i = groups.length-1; i >= 0; i--) {
                if(groups[i][0] == list) {
                    groups[i].push(newGroup);
                    groups.push(newGroup);
                }
            }
        } else {
            elements.push(newGroup);
            groups.push(newGroup);
        }
    }

    // <---------------------------- Transforms ---------------------------->

    function create(list='elements', x=0, y=0, element='') { //aka translate
        addElement(list, `<g transform="translate(${x} ${y})">${element}</g>`);
    }

    function rotate(angle, pivot=[0, 0], string) {
        return `<g transform="rotate(${angle}, ${pivot[0]}, ${pivot[1]})">${string}</g>`;
    }

    function scale(x, y, string) {
        return `<g transform="scale(${x} ${y})">${string}</g>`;
    }

    function skew(ax, ay, string) {
        return `<g transform="skew(${ax} ${ay})">${string}</g>`;
    }

    function matrix(a, b, c, d, tx, ty, string) {
        return `<g transform="matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})">${string}</g>`;
    }

    // <---------------------------- Processing ---------------------------->

    function addElement(listName, string) {
        if(listName == "elements") {
            elements.push(string);
        } 
        else {
            for(let item of groups) {
                if(item[0] == listName) {
                    item.push(string);
                }
            }
        }
    }

    function createGroup(list) {
        let groupArray;

        for(let item of groups) {
            if(list[0] == item[0]) {
                groupArray = item;
            }
        }

        let group = `<g name="${groupArray.shift()}" ${groupArray.shift()} style="${groupArray.shift()}">`
        for(let element of groupArray) {
            if(Array.isArray(element)) {
                group += createGroup(element);
            } else {
                group += element;
            }
        }
        group += "</g>";
        return group;
    }

    function createSVG(x, y, h, w) {
        let svg = `<svg viewbox="${x} ${y} ${h} ${w}">`
        for(let element of elements) {
            if(Array.isArray(element)) {
                svg += createGroup(element);
            } else {
                svg += element;
            }
        }
        svg += "</svg>";

        body.innerHTML += svg;
    }

    // <---------------------------- Noise ---------------------------->

    //import FastNoiseLite from "fastnoise-lite";

