//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector('.todo__task-input');
var addButton = document.querySelector('.todo__add-button');
var incompleteTaskHolder = document.querySelector('.todo__tasks');
var completedTasksHolder = document.querySelector('.todo__completed-tasks');


//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");//checkbox
    var label = document.createElement("label");//label
    var editInput = document.createElement("input");//text
    var editButton = document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'todo__task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="todo__task todo__text-input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="todo__edit-button button";

    deleteButton.className="todo__delete-button button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.classList.add('button__image');
    deleteButton.appendChild(deleteButtonImg);

    //appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    listItem.classList.add('todo__list-item');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.

var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".todo__edit-button");
    var containsClass = listItem.classList.contains("todo__edit-mode");
    editInput.classList.add('todo__edit-input');
    
    //If class of the parent is edit-mode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editInput.classList.remove('todo__edit-input');
        label.classList.remove('todo__edit-label');
        editBtn.innerText = "Edit";

    }else{
        label.classList.add('todo__edit-label');
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("todo__edit-mode");
};


//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.todo__edit-button");
    var deleteButton=taskListItem.querySelector("button.todo__delete-button");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.