import TimeIndex from "./view/TimeIndex.js";
import KanbanAPI from "./api/KanbanApi.js";

new TimeIndex(
	document.querySelector(".timer"), sessionStorage.getItem("CurrentBoardId")
);
/*new kanbanUser(
	document.querySelector("#ListOfBoardUser"), parseInt(sessionStorage.getItem("LoginUserId"))
);

new KanbanMember(
	document.querySelector("#ListOfBoardColab"), parseInt(sessionStorage.getItem("LoginUserId"))
);
*/