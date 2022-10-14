import KanbanAPI from "../api/KanbanApi.js";
import DropZone from "./DropZone.js";
import Card from "./Card.js";

export default class List {
	constructor(id, Name, Board_Id) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = List.createRoot();
		this.elements.title = this.elements.root.querySelector("#ColumnTitle");
		this.elements.cards = this.elements.root.querySelector("#ColumnCard");
		this.elements.addItem = this.elements.root.querySelector("#ColumnAddCard");

		this.elements.root.dataset.id = id;
		this.elements.root.dataset.board_id = Board_Id;
		console.log(this.elements.root.dataset)
		this.elements.title.textContent = Name;
		this.elements.cards.appendChild(topDropZone);
		console.log(id);
		List.Cards(this.elements.cards,id);
		/*this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});*/

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
			console.log(d);
			d.forEach(card => {
				//id,name, jumlahTaskItem,jumlahcomment, personInchargeName
				console.log(card);
				const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge);

				root.appendChild(cardView.elements.root);

			});
		});
		/*console.log(cards);
		cards.forEach(card => {
			//id,name, jumlahTaskItem,jumlahcomment, personInchargeName
			console.log(card);
			const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge);

			this.root.appendChild(cardView.elements.root);

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

	renderItem(root, card) {
		this.root = root;
		const cardView = new Card(card.id, card.name, card.numberTaskItem, card.numbercomment, card.personIncharge);

		this.root.appendChild(cardView.elements.root);
	}
}