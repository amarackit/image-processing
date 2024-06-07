const canvas    = document.getElementById("imageProcessing");
const context   = canvas.getContext("2d");

const image = new Image();
image.src = "image.png";

image.onload = () => {
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, 700, 700);
    const binaryImage = new ImageDataToBinary(data, 700, 700);

    canvas.addEventListener('click', (e) => {
        const result = depthFirstFloodFill(binaryImage, new Point(e.clientX, e.clientY), 'brush', 700, 700);
        //const result = breathFirstFloodFill(binaryImage, new Point(e.clientX, e.clientY), 'brush', 700, 700);
        // draw the point in color red to see the result
        context.fillStyle = "red";
        for (let i = 0; i < result.points.length; i++) {
            context.fillRect(result.points[i].x, result.points[i].y, 1, 1);
        }
    })
    
}


