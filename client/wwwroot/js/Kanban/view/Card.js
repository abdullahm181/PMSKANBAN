import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanApi.js";
export default class Item {
	constructor(id, name, numberTaskItem, numbercomment, personIncharge, ListId, BoardId) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.title = this.elements.root.querySelector("#CardTitle");
		this.elements.taskItem = this.elements.root.querySelector("#CardTaskItem");
		this.elements.comment = this.elements.root.querySelector("#CardComment");
		this.elements.person = this.elements.root.querySelector("#CardPerson");

		this.elements.root.dataset.card_id = id;
		this.elements.title.textContent = name;
		this.elements.taskItem.textContent = numberTaskItem;
		this.elements.comment.textContent = numbercomment;
		this.elements.person.textContent = personIncharge;

		this.elements.root.appendChild(bottomDropZone);

		this.elements.root.querySelector("#CardLinkDelete").addEventListener("click", () => {
			KanbanAPI.deleteCard(id, ListId);
		});
		this.elements.root.querySelector("#CardLinkEdit").addEventListener("click", () => {
			KanbanAPI.editCard(id, ListId, BoardId);
		});

		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.title.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="board__boxes board__style" draggable="true">
              <ul class="d-flex flex-row justify-content-end m-0 ">
                <li>
                  <a data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></a>
                  <ul class="dropdown-menu">
                    <li><a id="CardLinkDelete" class="dropdown-item" href="javascript:void(0)">Delete</a></li>
                    <li><a id="CardLinkEdit" class="dropdown-item" href="javascript:void(0)">Edit</a></li>
                    <li><a id="CardLinkDetail" class="dropdown-item" href="javascript:void(0)">Detail</a></li>
                  </ul>
                </li>
              </ul>
              <p id="CardTitle" ></p>
              <div class="board__boxes__info">
                <i class="fas fa-tasks"></i>
                <span id="CardTaskItem">3</span>
                <i class="fas fa-comment-dots"></i>
                <span id="CardComment">3</span>
				<div id="CardPerson"></div>
              </div>
            </div>
		`).children[0];
	}
}