let optionsContainer = document.querySelector('.options-container')
let toolBoxContainer = document.querySelector('.toolbox-container')
let optionsFlag = true

let pencilToolContainer = document.querySelector('.pencil-tool')
let eraserTool = document.querySelector('.eraser-tool')

let pencilFlag = false
let pencil = document.querySelector('.pencil')
let eraserFlag = false
let eraser = document.querySelector('.eraser')
let sticky = document.querySelector('.stickynote')

let upload = document.querySelector('.upload')

optionsContainer.addEventListener('click', (e) => {

    optionsFlag = !optionsFlag;
    if(optionsFlag){
        openTools();
    }

    else{
        closeTools();
    }
})
function openTools(){

    let iconElements = optionsContainer.children[0];

    iconElements.classList.remove('fa-times');

    iconElements.classList.add('fa-bars');

    toolBoxContainer.style.display = 'flex'   
}

function closeTools() {
    let iconElements = optionsContainer.children[0];

    iconElements.classList.remove('fa-bars');
    iconElements.classList.add('fa-times');
    toolBoxContainer.style.display = 'none'
    pencilToolContainer.style.display = 'none'
    eraserTool.style.display = 'none'
}


pencil.addEventListener('click', (e) => {


    pencilFlag = !pencilFlag
    if(pencilFlag) {

        pencilToolContainer.style.display = 'block'
    }

    else{
        pencilToolContainer.style.display = "none"
    }
    
} )

eraser.addEventListener('click', (e) => {


    eraserFlag = !eraserFlag
    if(eraserFlag) {

        eraserTool.style.display = 'flex'
    }

    else{
        eraserTool.style.display = "none"
    }
    
} )



function createStickyNotes(stickyTemplate){

    let stickyContainer = document.createElement('div')
    stickyContainer.setAttribute('class', 'sticky-container')

    stickyContainer.innerHTML = stickyTemplate


    document.body.appendChild(stickyContainer)



    let minimize = stickyContainer.querySelector('.minimize')
    let remove = stickyContainer.querySelector('.remove')
    notesActionsContainer(minimize, remove, stickyContainer)    
    
    stickyContainer.onmousedown = function(event) {

        dragAndDrop(stickyContainer, event)
    };
    
    stickyContainer.ondragstart = function() {
      return false;
    };

}



sticky.addEventListener('click', (e) => {





    let stickyTemplate = 
   
        `<div class="header">

        <div class="minimize">


        </div>
        <div class="remove">

        </div>
    </div>
    <div class="notes-container">
        <textarea> 
            
        </textarea>
    </div>`



    createStickyNotes(stickyTemplate);


   
} )



function notesActionsContainer(minimize, remove, stickyContainer){

    

    remove.addEventListener('click', (e) => {
        stickyContainer.remove();
    } )

    minimize.addEventListener('click', (e) => {



        let notesContainer = stickyContainer.querySelector('.notes-container');

        let display = getComputedStyle(notesContainer).getPropertyValue('display');

        if(display === 'none'){


            notesContainer.style.display = 'block';
        }

        else{

            notesContainer.style.display = 'none';
        }
    } )    
}


upload.addEventListener('click', (e) => {

    let input = document.createElement('input')
    input.setAttribute('type', 'file');
    input.click();


    input.addEventListener('click', (e) => {
        let file = input.files[0]
        let url = URL.createObjectURL(file)





        let stickyTemplate = 
            `<div class="header">


            <div class="minimize">
            </div>




            <div class="remove">
            </div>

        </div>

        <div class="notes-container">
        <img src = '${url}'/>




        </div>`




        
        createStickyNotes(stickyTemplate);
        
    } )
} )



function dragAndDrop(element, event){

    
    let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  document.body.append(element);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };



}
