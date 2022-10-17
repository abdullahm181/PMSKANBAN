import kanbanUser from "./view/kanbanUser.js";
import KanbanMember from "./view/kanbanMember.js";

new kanbanUser(
	document.querySelector("#ListOfBoardUser"), 2
);

new KanbanMember(
	document.querySelector("#ListOfBoardColab"), 2
);

