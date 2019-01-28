// Business Logic for AddressBook ---------
function ToDoList() {
  this.tasks = [],
  this.currentId = 0
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Tasks(task) {
  this.task = task,
  this.completed = false
}

Tasks.prototype.isComplete = function() {
  return this.completed;
}

Tasks.prototype.complete = function() {
  this.completed = true;
}

// User Interface Logic ---------
var toDoList = new ToDoList();

function displayToDoList(listToDisplay) {
  var tasksList = $("ul#tasks");
  var htmlListofTasks = "";
  listToDisplay.tasks.forEach(function(tasky) {
    htmlListofTasks += "<li id=" + tasky.id + ">" + tasky.task + "</li>";
  });
  tasksList.html(htmlListofTasks);
};

function showTask(taskId) {
  var tasky = toDoList.findTask(taskId);
  $("#show-task").show();
  $(".task-name").html(tasky.task);
  $(".task-name").attr('id', tasky.id);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + tasky.id + ">Delete</button>");
}

function attachTaskListener() {
  $("ul#tasks").on("click", "li", function() {
    showTask(this.id);
  });
  $(".task-completed").on("click", function() {
    toDoList.deleteTask($(".deleteButton").attr('id'));
    $(".task-completed").prop("checked",false);
    $("#show-task").hide();
    displayToDoList(toDoList);
  });
};

$(document).ready(function() {
  attachTaskListener();
  $("form#new-task").submit(function(event) {
    event.preventDefault();
    var inputtednewTask = $("input#new-task").val();
    $("input#new-task").val("");
    var newTask = new Tasks(inputtednewTask);
    toDoList.addTask(newTask);
    displayToDoList(toDoList);
  })
})
