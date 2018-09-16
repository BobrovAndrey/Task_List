// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load events
loadEventListners();

//task event
    function loadEventListners(){
    // DOM load event        
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);
    //Remove task events

    taskList.addEventListener('click',removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks events
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LS
function getTasks(){
    let tasks;
if (localStorage.getItem('tasks')=== null){
    tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem('tasks'));  
}

tasks.forEach(function(task){
 // create li element
 const li = document.createElement('li');

 // add class
li.className = 'collection-item';

 //append to li
 li.appendChild(document.createTextNode(task));

 // create new link element

 const link = document.createElement('a');

 link.className = 'delete-item secondary-content';

 //add icon
 link.innerHTML = '<i class ="fa fa-remove"></i>';

 //append link to li
li.appendChild(link);

//append li to ul

taskList.appendChild(li);
});

}

// Add Task
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a task');
    }

 // create li element
 const li = document.createElement('li');

 // add class
li.className = 'collection-item';

 //append to li
 li.appendChild(document.createTextNode(taskInput.value));

 // create new link element

 const link = document.createElement('a');

 link.className = 'delete-item secondary-content';

 //add icon
 link.innerHTML = '<i class ="fa fa-remove"></i>';

 //append link to li
li.appendChild(link);

//append li to ul

taskList.appendChild(li);

//Store in storage

storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value = '';

}

// Store Task

function storeTaskInLocalStorage(task){
let tasks;
if (localStorage.getItem('tasks')=== null){
    tasks = [];

}else{
  tasks = JSON.parse(localStorage.getItem('tasks'));  
}

tasks.push(task);

localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove Task

function removeTask (e){

    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
     }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    tasks.forEach(function(task){
        if(taskItem.textContent === task){
        task.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// clear Tasks

function clearTasks(){
// InnerHTML - slover    
//  taskList.innerHTML = '';
//Faster
while(taskList.firstChild){
taskList.removeChild(taskList.firstChild);
}

//clear form LS
clearTasksFromLocalStorage();


}
//Clear Tasks from LS

function clearTasksFromLocalStorage(){
    localStorage.clear();
}



// Filter tasks

function filterTasks(e){
 const text = e.target.value.toLowerCase();

 document.querySelectorAll('.collection-item').forEach
 (function(task){
 const item = task.firstChild.textContent;
 if(item.toLowerCase().indexOf(text) != -1){
     task.style.display = 'block';
 }else {
     task.style.display = 'none';
 }
 });

}

