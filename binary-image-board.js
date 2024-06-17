class BinaryImageBoard {
    #ctx;
    #pixelWidth;
    #pixelHeight;
    #screenWidth;
    #screenHeight;
    #hoverListeners = {};
    #clickListeners = {};
    #sketchListeners = {};
    #currentHoverPixel = null;
    #width = 0;
    #height = 0;
    constructor(ctx, screenWidth, screenHeight, pixelWidth, pixelHeight) {
        this.#ctx = ctx;
        this.#screenWidth = screenWidth;
        this.#screenHeight = screenHeight;
        this.#pixelWidth = pixelWidth;
        this.#pixelHeight = pixelHeight;
        this.#width = screenWidth/pixelWidth;
        this.#height = screenWidth/pixelHeight;
    }

    get width () {
        return this.#width
    }

    get height() {
        return this.#height
    }

    #drawImageBoard() {
        const ctx = this.#ctx;
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        /** Drawing vertical lines */
        for (let i = 0; i <=this.#screenWidth; i+= this.#pixelWidth) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.#screenHeight);
        }
        /** Drawing Horizontal lines */

        for (let i = 0; i <=this.#screenHeight; i+=this.#pixelHeight) {
            ctx.moveTo (0, i);
            ctx.lineTo(this.#screenWidth, i)
        }
        
        ctx.stroke();
        ctx.restore();
    }

    getBoardPixel(point) {
        const [x,y] = point;
        const u = Math.ceil(x / this.#pixelWidth);
        const v = Math.ceil(y / this.#pixelHeight);
        return [u - 1,v - 1];
    }

    #detectBoundingBox(pixel) {
        const [x,y] = pixel;
        const u = x*this.#pixelWidth;
        const v = y*this.#pixelHeight;
        return [u,v,this.#pixelWidth,this.#pixelHeight];
    }

    #callHoverListeners(pixel) {
        if(this.#currentHoverPixel) {
            const [x,y] = pixel;
            const [u,v] = this.#currentHoverPixel;
            if (x!==u || v!==y) {
                for (let k in this.#hoverListeners) {
                    this.#hoverListeners[k](pixel, this.getPosition(pixel));        
                }
            }
        }
        this.#currentHoverPixel = pixel;
        
    }

    #callClickListeners(pixel) {
        for (let k in this.#clickListeners) {
            this.#clickListeners[k](pixel, this.getPosition(pixel));
        }
    }

    #callSketchListeners(pixel) {
        for (let k in this.#sketchListeners) {
            this.#sketchListeners[k](pixel, this.getPosition(pixel));
        }
    }

    #drawBound(bound, color = "#EEEEEE") {
        this.#ctx.save();
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(...bound);
        this.#ctx.restore();
    }

    addHoverListener(name, callable) {
        this.#hoverListeners[name] = callable;
    }

    addClickListener(name, callable) {
        this.#clickListeners[name] = callable;
    }
    addSketchListener(name, callable) {
        this.#sketchListeners[name] = callable;
    }

    getPosition(pixel) {
        const [x,y] = pixel;
        return Math.abs(x) + this.#width*Math.abs(y);
    }

    getPixel(position) {
        if (position === 0) return [0, 0]; 
        const x =  position % this.#width;
        const y = Math.floor(position/this.#width)
        return [x, y];
    }

    getScreenPixel(pixel) {
        const [x,y] = pixel;
        const u = Math.ceil(x * this.#pixelWidth);
        const v = Math.ceil(y * this.#pixelHeight);
        return [u,v];
    }

    show() {
        this.#drawImageBoard();
    }
    putPixel(pixel, color) {
        const bound = this.#detectBoundingBox(pixel);
        if (!color) {
            color = 'black'
        }
        this.#drawBound(bound, color);
    }
    putPosition(position, color) {
        const pixel = this.getPixel(position);
        this.putPixel(pixel,color);
    }
    drawImage(img) {
        this.#ctx.save();
        this.#ctx.fillStyle = "black";
        for(let i = 0; i < img.length; i++) {
            const pixel = this.getPixel(i);
            if (img[i] === 1) {
                this.putPixel(pixel)
            }
        }
        this.#ctx.restore();
    }

    addPixelLabel(txt, position, color) {
        this.#ctx.save();
        const pixel = this.getPixel(position);
        let [x,y] = this.getScreenPixel(pixel);
        this.#ctx.textAlign = "center";
        this.#ctx.baseline = "middle";
        this.#ctx.font = "10px";
        this.#ctx.fillStyle = txt == '0' ? '#eeeeee' : 'white';
        // moving the text to the center of the box
        this.#ctx.translate(this.#pixelWidth / 2, this.#pixelHeight / 2 + 5);
        this.#ctx.fillText(txt,x, y);
        this.#ctx.restore();
    }

    hover(point) {
        const pixel = this.getBoardPixel(point);
        this.#callHoverListeners(pixel);
        const bound = this.#detectBoundingBox(pixel);
        this.#drawBound(bound);
    }

    click(point) {
        const pixel = this.getBoardPixel(point);
        this.#callClickListeners(pixel);
    }

    sketch(point) {
        const pixel = this.getBoardPixel(point);
        this.#callSketchListeners(pixel);
    }
}