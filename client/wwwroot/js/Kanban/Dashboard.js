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

var imageProfileDashboardInitial = KanbanAPI.putImageName(sessionStorage.getItem("LoginName"));
document.querySelector("#profileImageDashboard").textContent = imageProfileDashboardInitial;
document.querySelector("#profileImageTopNav").textContent = imageProfileDashboardInitial;
document.querySelector("#titleHome").textContent = sessionStorage.getItem("LoginName")+"'s Workspace";
