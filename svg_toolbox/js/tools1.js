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


    //createSVG

    // <---------------------------- Functions ---------------------------->

    function circle(list, cx, cy, r, other, style) {
        addElement(list, `<circle cx="${cx}" cy="${cy}" r="${r}" ${other} ${style}/>`);
    }

    function rect(list, x, y, w, h, other, style) {
        addElement(list, `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${other} ${style} />`);
    }

    function ellipse(list, cx, cy, rx, ry, other, style) {
        addElement(list, `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${other} ${style} />`);
    }

    function polygon(list, points, other, style) {
        addElement(list, `<polygon points="${points}" ${other} ${style} />`);
    }

    function polyline(list, points, other, style) {
        addElement(list, `<polyline points="${points}" ${other} ${style} />`);
    }

    function path(list, d, other, style) {
        addElement(list, `<path d="${d}" ${other} ${style} />`);
    }
 
    function group(list, other, style) {
        elements.push([list, other, style])
    }

    function addElement(listName, string) {
        if(listName == "elements") {
            elements.push(string);
        } 
        else {
            for(let element of elements) {
                if(Array.isArray(element) && element[0] == listName) {
                    element.push(string);
                }
            }
        }
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

    function createGroup(list) {
        let group = `<g name="${list.shift()}" ${list.shift()} style="${list.shift()}">`
        for(let element of list) {
            group += element;
        }
        group += "</g>";
        return group;
    }