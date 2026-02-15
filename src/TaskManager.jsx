import Tsk from './TaskManager.module.css'

function TaskManager() {
    const inputValue = "";
  return (
    <div className={Tsk.taskManager}>
      <h1>Task Manager</h1>

      <input type="text" placeholder="Enter task description" value={inputValue}/>

      <AddTask />
      <RemoveTask />
      <EditTask />
    </div>
  );
}

function RemoveTask() {
  return (
    <div>
      {
      <button onClick={() => {
        if (confirm("Are you sure you want to remove this task?")) {
          console.log("Task removed");
        }
      }}>Remove Task</button>
      }
    </div>
  );
}

function EditTask() {
  return (
    <div>
      <button onClick={() => {const newDescription = prompt("Enter new task description:");
      if (newDescription) {
        console.log("Task updated:", newDescription);
      } }}>Edit Task
      </button>
      
    </div>
  );
}
function addTask() {
    inputValue = prompt("Enter task description:");
    if (inputValue) {
        console.log("Task added:", inputValue);
    }
}

function AddTask() {
  return (
    <div className="addTask">
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}



  export default TaskManager