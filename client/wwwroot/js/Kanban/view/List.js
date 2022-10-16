import KanbanAPI from "../api/KanbanApi.js";
import DropZone from "./DropZone.js";
import Card from "./Card.js";

export default class List {
	constructor(id, Name, Board_Id ) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = List.createRoot(Name);
		this.elements.title = this.elements.root.querySelector("#ColumnTitle");
		this.elements.cards = this.elements.root.querySelector("#ColumnCard");
		this.elements.addItem = this.elements.root.querySelector("#ColumnAddCard");
		this.elements.EditList = this.elements.root.querySelector("#EditList");
		this.elements.DeleteList = this.elements.root.querySelector("#DeleteList");

		this.elements.root.dataset.list_id = id;
		this.elements.root.dataset.board_id = Board_Id;
		this.elements.title.textContent = Name;
		this.elements.cards.appendChild(topDropZone);
		List.Cards(this.elements.cards, id);

		if (Name != "To-do" && Name != "Done") {
			this.elements.EditList.addEventListener("click", () => {
				KanbanAPI.EditList(id);
			});
			this.elements.DeleteList.addEventListener("click", () => {
				KanbanAPI.DeleteList(id);
			});
		}
		this.elements.addItem.addEventListener("click", () => {
			KanbanAPI.addCard(id, Board_Id);
		});

		/*KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});*/
	}
	static async Cards(root, ListId) {
		this.root = root;
		var data = {};
		data["ListId"] = ListId;
		KanbanAPI.Methode("GET", "list/GetCardByListId", data, function (d) {
			//processing the data
			d.forEach(card => {
				//id,name, jumlahTaskItem,jumlahcomment, personInchargeName
				const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge, card.list_Id);

				root.appendChild(cardView.elements.root);

			});
		});
		/*console.log(cards);
		cards.forEach(card => {
			//id,name, jumlahTaskItem,jumlahcomment, personInchargeName
			console.log(card);
			const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge,card.list_Id);

			this.root.appendChild(cardView.elements.root);

		});*/
	}

	static createRoot(Name) {
		const range = document.createRange();

		range.selectNode(document.body);
		if (Name == "To-do" || Name == "Done") {
			return range.createContextualFragment(`
			<div class="board">
				<div class="board__header board__style">
					<i class="fas fa-dot-circle"></i>
					<span id="ColumnTitle"></span>
				</div>
				<div class="board__conatiner" id="ColumnCard">
				</div>
				<button class="add__card" id="ColumnAddCard"> <i class="fas fa-plus"></i> Add Card</button>
			</div>
			`).children[0];
		}
		return range.createContextualFragment(`
		<div class="board">
			<div class="board__header board__style">
				<i class="fas fa-dot-circle"></i>
				<span id="ColumnTitle"></span>
				<i id="menuList" data-bs-toggle="dropdown" aria-expanded="false" class="fas fa-ellipsis-h"></i>
                  <ul class="dropdown-menu">
                    <li><a id="DeleteList" class="dropdown-item" href="javascript:void(0)">Delete</a></li>
                    <li><a id="EditList" class="dropdown-item" href="javascript:void(0)">Edit</a></li>
                  </ul>
			</div>
			<div class="board__conatiner" id="ColumnCard">
			</div>
			<button class="add__card" id="ColumnAddCard"> <i class="fas fa-plus"></i> Add Card</button>
		</div>
		`).children[0];
	}

	renderItem(root, card) {
		this.root = root;
		const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge, card.list_Id);

		this.root.appendChild(cardView.elements.root);
	}
}