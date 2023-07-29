let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let mousedown = false;
let pencilColour = document.querySelectorAll('.pencil-colour')

let pencilWidthElement = document.querySelector('.pencil-width')
let eraserWidthElement = document.querySelector('.eraser-width')
let download = document.querySelector('.download');




let undo = document.querySelector('.undo');
let redo = document.querySelector('.redo');

let undoRedoTracker = [];
let track = 0;
let penColour = 'red';

let eraserColour = 'white'

let penWidth = pencilWidthElement.value
let eraserWidth = eraserWidthElement.value






let tool = canvas.getContext('2d');
tool.lineWidth = penWidth


tool.strokeStyle = penColour




canvas.addEventListener('mousedown', (e) => {
    mousedown = true;

    // beginPath({

    //     x: e.clientX,

    //     y: e.clientY
    // })

    let data = {
        x: e.clientX,

        y: e.clientY
    }




    socket.emit('beginPath', data)

} )


canvas.addEventListener('mousemove', (e) => {

    if(mousedown){
        let data = {




            x: e.clientX,

            y: e.clientY,




            colour: eraserFlag ? eraserColour : penColour,
            width: eraserFlag ? eraserWidth : penWidth

        }


        socket.emit('drawStroke', data);


    }
} )
canvas.addEventListener('mouseup', (e) => {


    mousedown = false

    let url = canvas.toDataURL();

    undoRedoTracker.push(url);



    track = undoRedoTracker.length - 1;

} )


undo.addEventListener('click', (e) => {


    if(track > 0) {
        track--;
    }

    

    let data  = {
        trackValue: track,
        
        undoRedoTracker
    }




    socket.emit('redoUndo', data)
} )


redo.addEventListener('click', (e) => {

    if(track < undoRedoTracker.length - 1 ){

        track++;

       
        let data = { 
            trackValue: track,







            undoRedoTracker

        }






        socket.emit('redoUndo', data)


    }
} )









function undoRedoCanvas(trackObject){
    track = trackObject.trackValue
    undoRedoTracker = trackObject.undoRedoTracker



    






    let url = undoRedoTracker[track];
    let img = new Image();

    img.src = url;
    
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height )
    }
    
}













function beginPath(strokeObjectCanvas) {

    tool.beginPath();
     
    tool.moveTo(strokeObjectCanvas.x, strokeObjectCanvas.y);
}



function drawStroke(strokeObjectCanvas){
    tool.lineTo(strokeObjectCanvas.x, strokeObjectCanvas.y);
    tool.stroke();


    
    tool.strokeStyle = strokeObjectCanvas.colour


    tool.lineWidth = strokeObjectCanvas.width
}






pencilColour.forEach((element) => {


    element.addEventListener('click', (e) => {
        let colour = element.classList[0];
        penColour = colour;
        tool.strokeStyle = penColour;
    } )
} )






pencilWidthElement.addEventListener('change', (e) => {
    penWidth = pencilWidthElement.value;

    tool.lineWidth = penWidth;
} )



eraserWidthElement.addEventListener('change', (e) => {
    eraserWidth = eraserWidthElement.value;

    tool.lineWidth = eraserWidth
} )



eraser.addEventListener('click', (e) => {
    if(eraserFlag){


        tool.strokeStyle = eraserColour;

        tool.lineWidth = eraserWidth;

    }

    else{

        tool.strokeStyle = penColour
        tool.lineWidth = penWidth
    }
} )




download.addEventListener('click', (e) => {

    let url = canvas.toDataURL();

    let a = document.createElement('a');
    a.href = url;

    a.download = 'pic.jpg';
     
    a.click();

} )









socket.on('beginPath', (data) => {



    beginPath(data)
} )


socket.on('drawStroke', (data) => {



    drawStroke(data)
} )


socket.on('redoUndo', (data) => {




    undoRedoCanvas(data);


} )
