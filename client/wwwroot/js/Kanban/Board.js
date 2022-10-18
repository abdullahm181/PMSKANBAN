import BoardList from "./view/BoardList.js";
import KanbanAPI from "./api/KanbanApi.js";

new BoardList(
	document.querySelector("#main__kanban"), sessionStorage.getItem("CurrentBoardId")
);

document.querySelector("#AddMemberBoard").addEventListener("click", () => {
	KanbanAPI.addMemberBoard(sessionStorage.getItem("CurrentBoardId"));
});

const memberImgContainer = document.querySelector("#MemberBoard");
var data = {};
data["BoardId"] = sessionStorage.getItem("CurrentBoardId");
KanbanAPI.Methode("GET", "MemberBoard/GetByBoardId", data, function (d) {
	console.log(d);
	d.forEach(member => {
		var newMember = {
			id: member.id,
			status:member.status,
			fullname: member.user.employees.firstName + " " + member.user.employees.lastName
		};
		KanbanAPI.renderMemberBoard(memberImgContainer, newMember);
		/*const imageMemberView = new ImageProfile(member.id, member.status, member.user.employees.firstName + " " + member.user.employees.lastName);

		memberImgContainer.appendChild(imageMemberView.elements.root);*/
	});
});
