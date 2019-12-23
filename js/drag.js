const element = document.querySelector("#box");

let elements = [];

console.log(element);

/**
 * Create the tree SVG object
 * @param element
 * @param data
 * @param options
 */
function tree(element, data = {}, options = {}) {
    // const svgBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const svgBox = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
        .attr("width", $(element).outerWidth())
        .attr("height", $(element).outerHeight())
        .appendTo(element);

    const lineBox = $(document.createElementNS("http://www.w3.org/2000/svg", "g"))
        .attr("width", $(element).outerWidth())
        .attr("height", $(element).outerHeight())
        .appendTo(svgBox);

    const iconBox = $(document.createElementNS("http://www.w3.org/2000/svg", "g"))
        .attr("width", $(element).outerWidth())
        .attr("height", $(element).outerHeight())
        .appendTo(svgBox);

    const textBox = $(document.createElementNS("http://www.w3.org/2000/svg", "g"))
        .attr("width", $(element).outerWidth())
        .attr("height", $(element).outerHeight())
        .appendTo(svgBox);

    data.forEach((dataPoint) => {
        if (elements[dataPoint.key] != null) {
            console.log(dataPoint.key + " already exists!");
            return;
        }

        const x = Math.floor(Math.random() * ($(element).outerWidth() - 20)) + 10;
        const y = Math.floor(Math.random() * ($(element).outerHeight() - 20)) + 10;

        elements[dataPoint.key] = {
            x: x,
            y: y,
            key: dataPoint.key,
            targets: dataPoint.targets ? dataPoint.targets : null
        };

        let r = 5;

        if (dataPoint.targets != null) {
            r += dataPoint.targets.length * 4;
        }

        const c = $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
            .attr("r", r)
            .attr("cx", x)
            .attr("cy", y)
            .addClass("draggable")
            .appendTo(iconBox);

        const t = $(document.createElementNS("http://www.w3.org/2000/svg", "text"))
            .attr("r", 10)
            .attr("x", x + (r + 5))
            .attr("y", y + (r / 2))
            .addClass("draggable")
            .text(dataPoint.text)
            .appendTo(textBox);
    });

    Object.keys(elements).forEach(function (key) {
        const fromElement = elements[key];

        if (fromElement.targets == null) {
            return;
        }

        fromElement.targets.forEach((target) => {
            if (elements[target] == null || target === key) {
                return;
            }

            const toElement = elements[target];

            let x1 = fromElement.x;
            let y1 = fromElement.y;

            let x2 = toElement.x;
            let y2 = toElement.y;

            $(document.createElementNS("http://www.w3.org/2000/svg", "path"))
                .attr("d", `M ${x1} ${y1} L ${x2} ${y2}`)
                .attr("fill", "none")
                .attr("stroke", "var(--primary)")
                .appendTo(lineBox);
        })
    });

    $(svgBox).appendTo(element);
}

tree(element, [
    {"key": "test1", "text": "test 1", targets: ["test3", "test5", "test4"]},
    {"key": "test2", "text": "test 2", targets: ["test3"]},
    {"key": "test3", "text": "test 3"},
    {"key": "test4", "text": "test 4", targets: ["test5"]},
    {"key": "test5", "text": "test 5"}
], {});
