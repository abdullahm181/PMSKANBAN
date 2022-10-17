
import KanbanAPI from "../api/KanbanApi.js";
export default class ImageProfile {
	constructor(id, status, Fullname) {
		console.log(id, " ", status, " ", Fullname);
		this.elements = {};
		this.elements.root = ImageProfile.createRoot();
		var imageProfileInitial = KanbanAPI.putImageName(Fullname);
		this.elements.root.textContent = imageProfileInitial;

		this.elements.root.dataset.card_id = id;
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div id="profileImageMember" class="" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content-id="popover-content-userPeek"></div>
		`).children[0];
	}
}