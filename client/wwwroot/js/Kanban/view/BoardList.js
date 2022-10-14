import KanbanAPI from "../api/KanbanApi.js";
import List from "./List.js";
export default class BoardList {
	constructor(root, BoardId) {
		this.BoardId = BoardId;
		this.root = root;
		//on Submit new list
		/*$("#AddColumnKanban").on("submit", () => {
			var data = {};
			$('#AddColumnKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
			data["items"] = [];
			const newColumn = KanbanAPI.insertColumn(data);


			if (newColumn) {
				this.renderColumn(newColumn);
				$('#addColumnModal').modal('hide');
			}
			event.preventDefault();

		});*/
		BoardList.Lists(this.root, this.BoardId);
	}
	
	static async Lists(root, BoardId) {
		this.root = root;
		var data = {};
		data["BoardId"] = BoardId;
		const kanbanlist = await KanbanAPI.Methode("GET", "list/GetByBoardId", data);
		kanbanlist.forEach(list => {
			const ListView = new List(list.id, list.name, list.board_Id);

			this.root.appendChild(ListView.elements.root);
		});
	}

	renderList(data) {
		const ListView = new List(data.id, data.title);

		this.root.appendChild(ListView.elements.root);
	}
}