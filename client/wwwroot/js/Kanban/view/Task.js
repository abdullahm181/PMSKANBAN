import KanbanAPI from "../api/KanbanApi.js";
export default class Task {
	constructor(todo) {

		this.elements = {};
		this.elements.root = Task.createRoot(todo);
		this.elements.checkStatus = this.elements.root.querySelector("#checkStatus");
		this.elements.deleteTask = this.elements.root.querySelector("#deleteTask");
        this.elements.textTask = this.elements.root.querySelector("#textTask");
        this.elements.deleteTask.addEventListener('click', () => {
            KanbanAPI.deleteTask(todo.id, todo.card_Id);
        });
        this.elements.checkStatus.addEventListener('change', (event) => {
            var dataPut = {
                "Id":todo.id,
                "Text":todo.text,
                "Card_Id":todo.card_Id,
                "Status":todo.status,
            };
            if (event.currentTarget.checked) {
                dataPut["Status"] = true;
                KanbanAPI.Methode("PUT", "taskcard/Put", dataPut, function (d) {
                    
                });
                //console.log("Checkbox is checked. id : " + todo.id);
                this.elements.textTask.classList.add("todo-done");
            } else {
                dataPut["Status"] = false;
                KanbanAPI.Methode("PUT", "taskcard/Put", dataPut, function (d) {

                });
                //console.log("Checkbox is not checked. id :" + todo.id);
                this.elements.textTask.classList.remove("todo-done");
            }

        });

	}

	static createRoot(todo) {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="input-group mb-3" data-task_id="${todo.id}">
          <div class="input-group-text">
            <input id="checkStatus" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ${todo.status && "checked"}>
          </div>
          <input id="textTask" readonly type="text" class="form-control ${todo.status && "todo-done"}" aria-label="Text input with checkbox"  value="${todo.text}">
          <button id="deleteTask" class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-times"></i></button>
         </div>`).children[0];
	}
}