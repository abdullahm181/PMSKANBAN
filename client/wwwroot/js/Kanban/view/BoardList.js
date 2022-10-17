import KanbanAPI from "../api/KanbanApi.js";
import List from "./List.js";
export default class BoardList {
	constructor(root, BoardId) {
		this.BoardId = BoardId;
		this.root = root;
		//on Submit new list
		$("#AddColumnKanban").on("submit", () => {
			const ListContainer = Array.from(document.querySelectorAll(".board"));
			console.log(ListContainer.length);
			var data = {};
			$('#AddColumnKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
			data["Order"] = ListContainer.length-1;
			data["Board_Id"] = BoardId;
			//kalau pake create data order donenya langsung berubah
			KanbanAPI.Methode("POST", "list/Create", data, function (d) {
				var getdata = {};
				getdata["ListName"] = data.Name;
				getdata["BoardId"] = data.Board_Id;
				console.log(getdata);
				$('#addListModal').modal('hide');
				KanbanAPI.Methode("Get", "list/GetByName", getdata, function (d) {
					console.log(d);
					const addListView = new List(d.id, d.name, d.board_Id);
					root.insertBefore(addListView.elements.root, ListContainer[ListContainer.length - 1]);
					
				});
			});
			
			event.preventDefault();

		});
		BoardList.Lists(this.root, this.BoardId);
	}
	
	static async Lists(root, BoardId) {
		this.root = root;
		var data = {};
		data["BoardId"] = BoardId;
		KanbanAPI.Methode("GET", "list/GetByBoardId", data, function (d) {
			//processing the data
			console.log(d);
			d.forEach(list => {
				console.log(list);
				const ListView = new List(list.id, list.name, list.board_Id);

				root.appendChild(ListView.elements.root);
			});
		});
		/*kanbanlist.forEach(list => {
			console.log(list);
			const ListView = new List(list.id, list.name, list.board_Id);

			this.root.appendChild(ListView.elements.root);
		});*/
	}

	renderList(data) {
		const ListView = new List(data.id, data.title);

		this.root.appendChild(ListView.elements.root);
	}
}