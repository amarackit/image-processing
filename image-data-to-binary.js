class ImageDataToBinary {
    #imageData;
    #binarySpaceData = [];
    #points = [];
    #width;
    #height;
    constructor(imageData, width, height) {
        this.#imageData = imageData;
        this.#width = width;
        this.#height = height;

        this.#toBinarySpace();
        this.#toPoint();
        
    }
    get data () {
        return this.#binarySpaceData;
    }
    get points() {
        return this.#points;
    }

    #toBinarySpace() {
        for (let i = 0; i < this.#imageData.data.length; i+=4) {
            let data = this.#imageData.data;
            let s = data[i]; let r = data[i+1]; let g = data[i+2]; let b = data[i+3];
            if (s < 125 || r < 125 || g < 125 || b < 125) {
                this.#binarySpaceData.push(1);
            } else {
                this.#binarySpaceData.push(0);
            }
        }
    }
    
    #toPoint() {
        this.#points = [];
        for (let i = 0; i < this.data.length; i ++) {
            let d = this.data[i];
            let x = i%this.#width;
            let y = Math.floor(i/this.#width);
            this.#points.push(new Point(x, y));
        }
    }

    getPosition(x, y) {
        return Math.floor(y*this.#width) + x;
    }

    getPixelValue(x, y) {
        const position = this.getPosition(x, y);
        return this.data[position];
    }

}