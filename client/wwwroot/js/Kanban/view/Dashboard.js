import KanbanAPI from "../api/KanbanApi.js";

export default class Dashboard {
	constructor(id, title, description) {

		this.elements = {};
		this.elements.root = Dashboard.createRoot();
		this.elements.title = this.elements.root.querySelector("#BoardTitle");
		this.elements.description = this.elements.root.querySelector("#BoardDescription");
		this.elements.body = this.elements.root.querySelector(".card-body");
		this.elements.boardLinkDelete = this.elements.root.querySelector("#BoardLinkDelete");
		this.elements.boardLinkEdit = this.elements.root.querySelector("#BoardLinkEdit");


		this.elements.root.dataset.board_id = id;
		this.elements.title.textContent = title;
		this.elements.description.textContent = description;
		this.elements.boardLinkDelete.addEventListener("click", () => {
			KanbanAPI.deleteBoard(id);

		});
		this.elements.boardLinkEdit.addEventListener("click", () => {
			KanbanAPI.EditBoard(id);

		});
		this.elements.body.addEventListener("click", () => {
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
		<div class="board-card p-2 bg-white rounded border border-1 shadow-sm overflow-hidden" >
			<ul class="d-flex flex-row justify-content-end m-0 px-2" >
                <li>
                  <a data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></a>
                  <ul class="dropdown-menu">
                    <li><a id="BoardLinkDelete" class="dropdown-item" href="javascript:void(0)">Delete</a></li>
                    <li><a id="BoardLinkEdit" class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#ModalData">Edit</a></li>
                  </ul>
                </li>
              </ul>
			<div class="card-body px-2 overflow-hidden">
				<h5 id="BoardTitle" class="py-2 m-0">Card title</h5>
				<p id="BoardDescription" class="pb-1">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
		`).children[0];
	}

}