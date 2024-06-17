function getPixelNeighbors(x,y,type) {
    if (type==='4-connected'){
        return [
            [x-1,y],
            [x,y-1],
        ]
    } else if(type === '8-connected') {
        return [
            [x-1, y],
            [x-1,y-1],
            [x,y-1],
            [x+1,y-1],
        ]
    }
    throw new Error('unknown type')
}

function allNeighborsHas0s(neighbors, board, I) {
    const labels = getPositionLabels(neighbors,board, I)
    const vals = Object.values(labels);
    return vals.length === vals.filter(v => v === 0).length;
}

function getPositionLabels(neighbors, board, I) {
    const labels = {};
    for (let i = 0; i < neighbors.length; i ++) {
        const p = board.getPosition(neighbors[i][0], neighbors[i][1]);
        labels[p] = I[p];
    }
    return labels;
}

function oneNeighborHasLabel(neighbors, board, I) {
    const labels = getPositionLabels(neighbors, board, I);
    const vals = Object.values(labels);
    const labeled = vals.filter(v => v > 0);
    if (labeled.length === 1) {
        return labeled[0];
    }
    return undefined;
}

function severalNeighborHaveLabels(neighbors, board, I) {
    const labels = getPositionLabels(neighbors,board, I);
    vals = Object.values(labels);
    const labeld = vals.filter(v => v > 0);
    if (labeld.length > 1) {
        const ret = {};
        for (let i in labels) {
            if (labels[i] > 0) {
                ret[i] = labels[i];
            }
        }
        return ret;
    }
    return undefined;
}

function initialLabeling(board, image) {
    let m = 2;
    const c = [];
    const I = [...image];
    for (v = 0; v < board.height; v++) {
        for (u = 0; v < board.width; u++) {
            const p = board.getPosition([u,v]);
            if (image[p] === 1) {
                const neighbors = getPixelNeighbors(u,v, type);
                if (allNeighborsHas0s(neighbors, board, I)) {
                    I[p] = m;
                    m +=1;
                } else if (oneNeighborHasLabel(neighbors,board,I)) {
                    I[p] = oneNeighborHasLabel(neighbors,board,I)
                } else if (severalNeighborHaveLabels(neighbors,board,I)) {
                    const labels = severalNeighborHaveLabels(neighbors, board, I);
                    const values = new Set(Object.values(labels));
                    I[p] = values[0];
                    
                }
            }
           
        }
    }
}