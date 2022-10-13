export default class Board {
	constructor(root) {  // masuk ke class kanban
		this.root = root;
		$("#AddColumnKanban").on("submit", () => {
			var data = {};
			$('#AddColumnKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
			data["items"] = [];

			const newColumn = KanbanAPI.insertColumn(data);


			if (newColumn) {
				this.renderColumn(newColumn);
				$('#addColumnModal').modal('hide');
			}
			event.preventDefault();

		});
		Board.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);

			this.root.appendChild(columnView.elements.root);
		});

	}

	static columns() {

		return KanbanAPI.getColumns();;
	}

	renderColumn(data) {
		const columnView = new Column(data.id, data.title);

		this.root.appendChild(columnView.elements.root);
	}
}