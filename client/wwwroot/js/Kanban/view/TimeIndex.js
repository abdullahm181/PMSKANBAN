import KanbanAPI from "../api/KanbanApi.js";
import Time from "./Time.js";
export default class TimeIndex {
	constructor(root, BoardId) {  // masuk ke class kanban
		this.BoardId = BoardId;
		this.root = root;
		TimeIndex.times(this.root, this.BoardId);

	}

	static async times(root, BoardId) {
		this.root = root;
		var data = {};
		data["BoardId"] = BoardId;
		var number = 1;
		KanbanAPI.Methode("GET", "card/GetByBoardId", data, function (d) {
			//processing the data
			console.log(d);
			d.forEach(time => {
				if (time != null) {
					const timeView = new Time(time.id, time.name, time.description, time.numberTaskItem, time.numbercomment, time.list_Id, BoardId, number, time.deadLine, time.list_Name);

					root.appendChild(timeView.elements.root);
				}
				number+=1;
			});
		});
	}

}