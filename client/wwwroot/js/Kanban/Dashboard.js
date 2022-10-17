import kanbanUser from "./view/kanbanUser.js";
import KanbanMember from "./view/kanbanMember.js";

new kanbanUser(
	document.querySelector("#ListOfBoardUser"), parseInt(sessionStorage.getItem("LoginUserId"))
);

new KanbanMember(
	document.querySelector("#ListOfBoardColab"), parseInt(sessionStorage.getItem("LoginUserId"))
);

