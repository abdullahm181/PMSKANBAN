
import KanbanAPI from "../api/KanbanApi.js";
export default class ImageProfile {
	constructor(id, status, Fullname) {
		//console.log(id, " ", status, " ", Fullname);
		this.elements = {};
		this.elements.root = ImageProfile.createRoot(Fullname);
		var imageProfileInitial = KanbanAPI.putImageName(Fullname);
		this.elements.root.textContent = imageProfileInitial;
		this.elements.root.dataset.card_id = id;
		$(function () {
			$('[data-bs-toggle="tooltip"]').tooltip();
		})
	}

	static createRoot(Fullname) {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div id="profileImageMember" class="" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${Fullname}"></div>
		`).children[0];
	}
}