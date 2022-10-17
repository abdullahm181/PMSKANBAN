import KanbanAPI from "../api/KanbanApi.js";

export default class Dashboard {
	constructor(id, title, description) {

		this.elements = {};
		this.elements.root = Dashboard.createRoot();
		this.elements.title = this.elements.root.querySelector("#BoardTitle");
		this.elements.description = this.elements.root.querySelector("#BoardDescription");


		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.description.textContent = description;

		this.elements.root.addEventListener("click", () => {
			//window.location = "/home/KanbanBoard?BoardId=" + id;
			//+ "?BoardId =" + sessionStorage.getItem("CurrentBoardId")
			var boardChossen = null;
			console.log(sessionStorage.getItem("CurrentBoardId"));
			sessionStorage.setItem("CurrentBoardId", id);
			boardChossen = document.querySelector("#GoToBoard");
			boardChossen.setAttribute('data-link', `/list`)
			GoToUri(boardChossen.dataset.link);
			
		});

	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
		<div class="board-card p-2 bg-white rounded border border-1 shadow-sm" >
			<div class="card-body px-2">
				<h5 id="BoardTitle" class="py-2 m-0">Card title</h5>
				<p id="BoardDescription" class="pb-1">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
		`).children[0];
	}

}