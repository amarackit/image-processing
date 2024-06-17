class IPKeyboardEvent {
    #event;
    constructor(canvas) {
        document.addEventListener('keyup', (e) => {
            this.#event = e;
        })   
        document.addEventListener('keydown', (e) => {
            this.#event = e;
        })
    }

    get event () {
        return this.#event
    }
}