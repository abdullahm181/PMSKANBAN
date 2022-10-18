import kanbanUser from "./view/kanbanUser.js";
import KanbanMember from "./view/kanbanMember.js";
import KanbanAPI from "./api/KanbanApi.js";

new kanbanUser(
	document.querySelector("#ListOfBoardUser"), parseInt(sessionStorage.getItem("LoginUserId"))
);

new KanbanMember(
	document.querySelector("#ListOfBoardColab"), parseInt(sessionStorage.getItem("LoginUserId"))
);


document.querySelector("#CreateBoardBtn").addEventListener("click", () => {
	KanbanAPI.createBoard();
});

