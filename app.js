// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// loadfAllEventlistner
function loadEventListeners () {
  // Dom load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)
  // remove task event
  taskList.addEventListener('click', removeTask)
  // clear task
  clearBtn.addEventListener('click', clearTasks)
  // filter tasks
  filter.addEventListener('keyup', filterTasks)
}
// get tasks fom local storage
function getTasks () {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append to li
    li.appendChild(document.createTextNode(task))
    // Create new link element
    const link = document.createElement('a')
    // add class
    link.className = 'delete-item secondary-content'
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // add link to li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li)
  })
}
// Add Task
function addTask (e) {
  if (taskInput.value == '') {
    alert('Add a task')
  } else {
    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create new link element
    const link = document.createElement('a')
    // add class
    link.className = 'delete-item secondary-content'
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // add link to li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li)
    // adding task to local storage
    storeTaskInLocalStorage(taskInput.value)
    // clear input
    taskInput.value = ''
  }
  e.preventDefault()
}
// store task
function storeTaskInLocalStorage (task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Remove task
function removeTask (e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
      // remove form LS
      removeTaskLS(e.target.parentElement.parentElement);

      // e.target.parentElement.parentElement
    }
  }
}
// remove task from local storage
function removeTaskLS (taskItem) {
  console.log(taskItem);
  let tasks;
  if(localStorage.getItem('tasks')===null)
  {
      tasks=[];
  }
  else
  {
      tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index)
  {
      if(taskItem.textContent===task)
      {
          tasks.splice(index,1);
      }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks () {
  // taskList.innerHTML = '';
  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // https://jsperf.com/innerhtml-vs-removechild
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage()
{
  localStorage.clear();
}
// filter task
function filterTasks (e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
