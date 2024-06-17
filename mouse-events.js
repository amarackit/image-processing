class IPMouseEvent {
    isHover = false;
    isClick = false;
    isMouseDown = false;
    isMouseMove = false;
    ctrlKey = false;
    altKey = false;
    metaKey = false;
    shiftKey = false;
    event = null;
    constructor(c) {
        const f = e => {
            this.ctrlKey = e.ctrlKey;
            this.altKey = e.altKey;
            this.shiftKey = e.shiftKey;
            this.metaKey = e.metaKey;
        }
        c.addEventListener('mousemove', e => {
            this.event = e;
            f(e);
            this.isHover = true;
            this.isMouseMove = true;
        }) 
        c.addEventListener('mouseleave',e => {
            this.event = e;
            f(e);
            this.isHover = false;
            this.isMouseMove = false;
        });
        c.addEventListener('mouseenter',e => {
            this.event = e;
            f(e);
            this.isHover = true;
        })
        c.addEventListener('mouseout', e => {
            this.event = e;
            f(e);
            this.isHover = false;
            this.isMouseMove = false;
        })
        c.addEventListener('click', e => {
            this.event = e;
            f(e);
            this.isClick = true;
        })
        c.addEventListener('mousedown', e => {
            this.event = e;
            f(e);
            this.isMouseDown = true;
        })
        c.addEventListener('mouseup', e => {
            this.event = e;
            f(e);
            this.isMouseDown = false;
        })
        document.addEventListener('mouseup', e => {
            this.event = e;
            f(e);
            this.isMouseDown = false;
        })
        
    }
}