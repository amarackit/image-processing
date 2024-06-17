function breathFirstFloodFill(board,imgBinary, point, label, width, height) {
    const queue = [];
    queue.unshift(point);
    const floodResult = {
        label: label,
        points: [],
    }
    const visitedPosition = [];
    while (queue.length !== 0) {
        const n = queue.pop();
        const u = n.x;
        const v = n.y;
        const pos = board.getPosition([u,v]);
        if ((u >=0) && (u < width) && (v >=0) && (v<height) && (imgBinary[pos] === 1) && (visitedPosition.indexOf(pos) < 0)) {
            floodResult.points.push(n);
            queue.unshift(new Point (u+1, v));
            queue.unshift(new Point (u, v+1));
            queue.unshift(new Point (u, v-1));
            queue.unshift(new Point (u-1, v));
            visitedPosition.push(pos);
        }
    }
    return floodResult;
}

function depthFirstFloodFill(board,imgBinary, point, label, width, height) {
    const stack = [];
    stack.push(point);
    const floodResult = {
        label: label,
        points: [],
    }
    const visitedPosition = [];
    while (stack.length !== 0) {
        const n = stack.pop();
        const u = n.x;
        const v = n.y;
        const pos = board.getPosition([u,v]);
        if ((u >=0) && (u < width) && (v >=0) && (v<height) && (imgBinary[pos] === 1) && (visitedPosition.indexOf(pos) < 0)) {
            floodResult.points.push(n);
            stack.push(new Point (u+1, v));
            stack.push(new Point (u, v+1));
            stack.push(new Point (u, v-1));
            stack.push(new Point (u-1, v));
            visitedPosition.push(pos);
        }
    }
    return floodResult;
}

// Refactor the functions to avoid repeating the code