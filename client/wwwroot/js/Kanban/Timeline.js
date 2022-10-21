import TimeIndex from "./view/TimeIndex.js";
import KanbanAPI from "./api/KanbanApi.js";

if (sessionStorage.getItem("CurrentBoardId") === undefined || sessionStorage.getItem("CurrentBoardId") == null || sessionStorage.getItem("CurrentBoardId") == 0) {
	Swal.fire({
		icon: 'error',
		title: "No board selected!",
		text: "Please select a board on your dashboard",
	});
} else {
	KanbanAPI.Methode("GET", "home/Get", { "id": parseInt(sessionStorage.getItem("CurrentBoardId")) }, function (board) {
		document.getElementById('TimelinePageTitle').textContent = board.name;
		new TimeIndex(
			document.querySelector(".timer"), sessionStorage.getItem("CurrentBoardId")
		);
	});
	
}

/*new kanbanUser(
	document.querySelector("#ListOfBoardUser"), parseInt(sessionStorage.getItem("LoginUserId"))
);

new KanbanMember(
	document.querySelector("#ListOfBoardColab"), parseInt(sessionStorage.getItem("LoginUserId"))
);
*/