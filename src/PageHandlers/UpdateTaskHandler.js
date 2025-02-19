import { checkResponse } from "../apis/API";
import { patchTask } from "../apis/Tasks";
import { router } from "../main";
import { localTasks, updateTask } from "./TasksHandler";

export function handleUpdateTaskPage() {
   if(!updateTask && localTasks.length == 0) {
      router.navigate("/tasks");
      return;
   }

   const cancelButton = document.getElementById("cancelButton");
   cancelButton.addEventListener("click", function(){
      router.navigate("/tasks");
   })

   const updateForm = document.getElementById("updateTaskForm");

   fillDataUpdateForm(updateForm);

   updateForm.addEventListener("submit", handleUpdateForm);
}

async function handleUpdateForm(event) {
   event.preventDefault();
   const formData = Object.fromEntries(new FormData(event.target));

   const updateTitle = formData.title.trim();
   if(updateTitle === "") {
      alert("Task Title must not be empty");
      return;
   }
   if(updateTitle !== updateTask.title) {
      if(localTasks.some(task => task.title === updateTitle)) {
         alert("This Task Title is duplicated, please try another");
         return;
      }
   }

   let patchBody = {}; 
   for(let key in updateTask) {
      const updatedValue = String(formData[key]).trim();
      if(updatedValue != updateTask[key]) {
         patchBody[key] = updatedValue;
      }
   }

   if(Object.keys(patchBody).length) {
      const response = await patchTask(updateTask.id, {...patchBody, userId: updateTask.userId});
      const updatedSuccess = checkResponse(response, 200);
      if(updatedSuccess) {
         alert("Task has been updated successfully");
         if(confirm("Do you want go back to Task Management page")) {
            router.navigate("/tasks");
         }
      }
   }
}

function fillDataUpdateForm(updateForm) {
   updateForm["title"].value = updateTask.title;
   updateForm["priority"].value = updateTask.priority;
   updateForm["status"].value = updateTask.status;
}