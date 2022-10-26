import KanbanAPI from "../api/KanbanApi.js";
export default class Time {
	constructor(id, name, description, numberTaskItem, numbercomment, ListId, BoardId, number, deadline,List_Name) {


		this.elements = {};
		this.elements.root = Time.createRoot();
		this.elements.number = this.elements.root.querySelector("#numberTime");
		this.elements.title = this.elements.root.querySelector("#numberName");
		this.elements.description = this.elements.root.querySelector("#numberDescription");
		this.elements.deadline = this.elements.root.querySelector("#numberDeadline");
		this.elements.listName = this.elements.root.querySelector("#numberListName");
		this.elements.taskItem = this.elements.root.querySelector("#CardTaskItem");
		this.elements.comment = this.elements.root.querySelector("#CardComment");
		this.elements.root.dataset.time_id = id;
		this.elements.number.textContent = number;
		this.elements.title.textContent = name;
		this.elements.description.textContent = description;
		this.elements.deadline.textContent = String(moment(deadline.split("T")[0]).format('MMMM Do YYYY'));
		this.elements.taskItem.textContent = numberTaskItem;
		this.elements.listName.textContent = List_Name;
		this.elements.comment.textContent = numbercomment;
	
		if (List_Name == "Done") {
			this.elements.listName.classList.remove("text-bg-info");
			this.elements.listName.classList.add("text-bg-success");
		}
	
		/*this.elements.root.querySelector("#CardLinkDetail").addEventListener("click", () => {
			KanbanAPI.detailCard(id, ListId, BoardId);
		});*/

	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<li class="step">
                <span id="numberTime"></span>
                <div class="content-timer">
                    <h3 id="numberName" ></h3>
                    <p id="numberDescription">
                    </p>
                </div>
				<div class="step_info d-flex justify-content-start">
					<i class="fas fa-tasks"></i>
					<span id="CardTaskItem">3</span>
					<i class="fas fa-comment-dots"></i>
					<span id="CardComment">3</span>
					<span id="numberDeadline" class="badge text-bg-warning ms-0 me-1"></span>
					<span id="numberListName" class="badge text-bg-info ms-0"></span>
				</div>
            </li>
		`).children[0];
	}
}