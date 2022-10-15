import BoardList from "./view/BoardList.js";

new BoardList(
	document.querySelector("#main__kanban"), sessionStorage.getItem("CurrentBoardId")
);

