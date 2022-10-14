import KanbanAPI from "../api/KanbanApi.js";
import DropZone from "./DropZone.js";

export default class List {
	constructor(id, Name,Board_Id) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = List.createRoot();
		this.elements.title = this.elements.root.querySelector("#ColumnTitle");
		this.elements.items = this.elements.root.querySelector("#ColumnCard");
		this.elements.addItem = this.elements.root.querySelector("#ColumnAddCard");

		this.elements.root.dataset.id = id;
		this.elements.root.dataset.board_id = Board_Id;
		console.log(this.elements.root.dataset)
		this.elements.title.textContent = Name;
		this.elements.items.appendChild(topDropZone);

		/*this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});*/

		/*KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});*/
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
		<div class="board">
			<div class="board__header board__style">
				<i class="fas fa-dot-circle"></i>
				<span id="ColumnTitle"></span>
				<i class="fas fa-ellipsis-h"></i>
			</div>
			<div class="board__conatiner" id="ColumnCard">
			</div>
			<button class="add__card" id="ColumnAddCard"> <i class="fas fa-plus"></i> Add Card</button>
		</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}