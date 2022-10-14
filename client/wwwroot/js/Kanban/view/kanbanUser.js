import KanbanAPI from "../api/KanbanApi.js";
import Dashboard from "./Dashboard.js";
export default class kanbanUser {
	constructor(root, UserId) {  // masuk ke class kanban
		this._UserId = UserId;
		this.UserId = UserId;
		this.root = root;
		$("#AddBoardKanban").on("submit", () => {
			var data = {};
			data["OwnerId"] = UserId;
			$('#AddBoardKanban').serializeArray().map(function (x) { data[x.name] = x.value; });

			const newBoard = KanbanAPI.Methode("GET", "home/GetbyOwner", data);

			if (newBoard) {
				this.renderBoard(newBoard);
				$('#addBoardModal').modal('hide');
			}
			event.preventDefault();

		});
		kanbanUser.boards(this.root, this.UserId);

		

	}

	static async boards(root, UserId) {
		this.root = root;
		var data = {};
		data["OwnerId"] = UserId;
		const kanbanlist = await KanbanAPI.Methode("GET", "home/GetbyOwner", data);
		kanbanlist.forEach(board => {
			const boardView = new Dashboard(board.id, board.name, board.description);

			this.root.appendChild(boardView.elements.root);
		});

	}

	renderBoard(data) {
		const boardView = new Board(data.id, data.title);

		this.root.appendChild(boardView.elements.root);
	}
}