class Application {
    #canvas;#board;#mouseEvent;#keyboardEvent;#screenWidth;#screenHeight;#pixelWidth;#pixelHeight;#ctx;
    #components = [];
    constructor(canvas, screenWidth, screenHeight,pixelWidth,pixelHeight) {
        this.#pixelWidth = pixelWidth ? pixelWidth : 1;
        this.#pixelHeight = pixelHeight ? pixelHeight : 1;
        this.#screenWidth = screenWidth ? screenWidth : 700;
        this.#screenHeight = screenHeight ? screenHeight : 700;
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
        this.#mouseEvent = new IPMouseEvent(this.#canvas);
        this.#keyboardEvent = new IPKeyboardEvent(this.#canvas);
        this.#board = new BinaryImageBoard(this.#ctx,screenWidth,screenHeight,pixelWidth,pixelHeight);
    }

    #handleMouseEvent(evt) {
        if(!evt.event) return;
        const bound = this.#canvas.getBoundingClientRect();
        const x = evt.event.clientX - bound.left;
        const y = evt.event.clientY - bound.top;
        const point = this.#board.getBoardPixel([x,y]);
        const position = this.#board.getPosition(point);
        const event  = {
            event: evt,
            point: point,
            position: position, 
        }
        this.#onMouseEvent(event);
    }

    #handleKeyboardEvent(event) {
        this.#onKeyboardEvent(event);
    }

    #onKeyboardEvent(event) {
        this.#components.forEach(c => c.onKeyboardEvent(event))
    }

    #onMouseEvent(event) {
        this.#components.forEach(c => c.onMouseEvent(event));
    }

    init() {
        this.#components.forEach(c => c.init())
    }


    get width () {
        return this.#screenWidth / this.#pixelWidth;
    }

    get height() {
        return this.#screenHeight / this.#pixelHeight;
    }

    get board() {
        return this.#board;
    }

    addComponent(component) {
        const compt = new component(this);
        this.#components.push(compt);
        return compt;
    }

    getComponent(type) {
        for(let i = 0; i < this.#components.length; i ++) {
            if (this.#components[i] instanceof type) {
                return this.#components[i]
            }
        }
        return undefined;
    }

    removeComponent(component) {
        const index = this.#components.indexOf(component);
        if (index>-1) this.#components.splice(index,1);
    }

    draw() {
        this.#components.forEach(c => c.draw())
    }
    
    #draw() {
        this.#ctx.clearRect(0,0,this.#screenWidth,this.#screenHeight);
        this.#board.show();
        this.#handleMouseEvent(this.#mouseEvent)
        this.#handleKeyboardEvent(this.#keyboardEvent)
        this.draw()
        requestAnimationFrame(this.#draw.bind(this))
    }

    run() {
        this.init();
        this.#draw();
    }
}