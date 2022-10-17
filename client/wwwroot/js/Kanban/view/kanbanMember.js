import KanbanAPI from "../api/KanbanApi.js";
import Dashboard from "./Dashboard.js";
export default class kanbanMember {
	constructor(root, UserId) {  // masuk ke class kanban
		this._UserId = UserId;
		this.UserId = UserId;
		this.root = root;
		kanbanMember.boards(this.root, this.UserId);

		

	}

	static async boards(root, UserId) {
		this.root = root;
		var data = {};
		data["MemberId"] = UserId;
		KanbanAPI.Methode("GET", "home/GetbyMember", data, function (d) {
			//processing the data
			console.log(d);
			d.forEach(board => {
				const boardView = new Dashboard(board.id, board.name, board.description);

				root.appendChild(boardView.elements.root);
			});
		});
	}

	renderBoard(data) {
		const boardView = new Board(data.id, data.title);

		this.root.appendChild(boardView.elements.root);
	}
}