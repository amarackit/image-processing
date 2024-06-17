class Sketch {
    #app;
    #image;
    #floodResult;
    #increment = 0;
    #rate = 1.5;
    #breadthFirst = document.getElementById('breadthFirst')
    #depthFirst = document.getElementById("depthFirst")
    constructor(app) {
        this.#app = app;
        this.#image = new Array(app.width*app.height)
        this.#floodResult = {points:[],label: ''};
    }

    init() {
        this.#image.fill(0);
        this.#loadImageFromStorage();
    }

    #loadImageFromStorage() {
        if (localStorage.getItem('savedImage')) {
            const str = localStorage.getItem('savedImage');
            try {
                let img = JSON.parse(str);
                for (let i = 0; i < img.length; i ++){ 
                    this.#image[i] = img[i];
                }
            }catch(e) {
                console.error("parsing local image data failed");
            }
        }
    }

    #drawImage() {
        for (let i = 0; i < this.#image.length ; i++) {
            if (this.#image[i] === 1) {
                this.#app.board.putPosition(i, 'black');
            }
        }
    }
    #drawFloodResult() {
        this.#increment += this.#rate
        
        if( this.#floodResult.points.length < 1 )return;
        let limit = this.#increment;
        if (this.#increment >= this.#floodResult.points.length) {
            limit = this.#floodResult.points.length;
        }
        for (let i = 0; i < limit; i ++ ) {
            const point = this.#floodResult.points[i];
            this.#app.board.putPixel([point.x, point.y], 'red');
        }

    }
    draw() {
        this.#drawImage();
        this.#drawFloodResult();
    }

    onMouseEvent(event) {
        const evt = event.event;
        if (evt.isMouseDown && evt.isMouseMove) {
            this.#image[event.position] =  evt.altKey ? 0 : 1;
            
        }
        if (evt.isClick) {
            
            evt.isClick = false;
            if ( evt.metaKey) {
                this.#increment = 0;
                const [x,y] = event.point
                if (this.#breadthFirst.checked) {
                    this.#floodResult = breathFirstFloodFill(this.#app.board,this.#image,new Point(x,y),1,this.#app.width, this.#app.height);
                }else if (this.#depthFirst.checked) {
                    this.#floodResult = depthFirstFloodFill(this.#app.board,this.#image,new Point(x,y),1,this.#app.width, this.#app.height);
                }
            }
            
        }
    }

    onKeyboardEvent(event) {
        if(!event.event) return;
        event = event.event;
        if (event.ctrlKey && event.code === 'KeyS') {
            const imageData = JSON.stringify(this.#image)
            localStorage.setItem('savedImage', imageData);
        }
        if (event.ctrlKey && event.code === 'KeyR') {
            this.#image.fill(0)
            localStorage.removeItem('savedImage');
        }
    }
}