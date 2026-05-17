class PixelRenderEngine {

    constructor(options = {}) {

        this.width = options.width || 640;
        this.height = options.height || 400;

        this.parent =
        options.parent || document.body;

        /*
        ========================
        WRAPPER
        ========================
        */

        this.wrapper =
        document.createElement("div");

        this.wrapper.style.position = "fixed";
        this.wrapper.style.left = "0";
        this.wrapper.style.top = "0";
        this.wrapper.style.width = "100vw";
        this.wrapper.style.height = "100vh";
        this.wrapper.style.overflow = "hidden";
        this.wrapper.style.background = "black";

        this.parent.appendChild(this.wrapper);

        /*
        ========================
        CANVAS
        ========================
        */

        this.canvas =
        document.createElement("canvas");

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.canvas.style.position = "absolute";
        this.canvas.style.left = "0";
        this.canvas.style.top = "0";

        this.canvas.style.imageRendering =
        "pixelated";

        this.wrapper.appendChild(this.canvas);

        /*
        ========================
        CONTEXT
        ========================
        */

        this.ctx =
        this.canvas.getContext("2d");

        this.ctx.imageSmoothingEnabled = false;

        /*
        ========================
        SCALE
        ========================
        */

        window.addEventListener(
            "resize",
            ()=>this.resize()
        );

        this.resize();
    }

    resize() {

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let scale = Math.floor(
            Math.min(
                vw / this.width,
                vh / this.height
            )
        );

        if(scale < 1) {
            scale = 1;
        }

        const finalWidth =
        this.width * scale;

        const finalHeight =
        this.height * scale;

        this.canvas.style.width =
        finalWidth + "px";

        this.canvas.style.height =
        finalHeight + "px";

        this.canvas.style.left =
        Math.floor(
            (vw - finalWidth) / 2
        ) + "px";

        this.canvas.style.top =
        Math.floor(
            (vh - finalHeight) / 2
        ) + "px";
    }

    clear(color = "black") {

        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );
    }

    rect(x,y,w,h,color="white") {

        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            x,y,w,h
        );
    }

    text(text,x,y,color="white") {

        this.ctx.fillStyle = color;

        this.ctx.font = "8px monospace";

        this.ctx.fillText(
            text,
            x,
            y
        );
    }

    image(img,x,y,w,h) {

        this.ctx.drawImage(
            img,
            x,
            y,
            w,
            h
        );
    }
}

window.PixelRenderEngine =
PixelRenderEngine;