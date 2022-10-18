import KanbanAPI from "../api/KanbanApi.js";
export default class Comment {
	constructor(id, text,fullname,CardId) {

		this.elements = {};
		this.elements.root = Comment.createRoot();
		this.elements.text = this.elements.root.querySelector("#TextComment");
		this.elements.createBy = this.elements.root.querySelector("#CreateBy");
		this.elements.deleteComment = this.elements.root.querySelector("#deleteComment");
		this.elements.profilImage = this.elements.root.querySelector("#CardPersonImg");


		this.elements.root.dataset.comment_id = id;
		this.elements.text.textContent = text;
		this.elements.createBy.textContent = fullname;
		this.elements.profilImage.textContent = KanbanAPI.putImageName(fullname);

		this.elements.deleteComment.addEventListener("click", () => {
			KanbanAPI.deleteComment(id, CardId, UserId);
		});
		
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<li class="hstack gap-3">
              <div class="commenterImage">
                <div id="CardPersonImg" class="" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content-id="popover-content-userPeek" ></div>
              </div>
              <div class="commentText me-auto">
					<p id="TextComment" class=""></p>
					<span class="date sub-text">Creater by : <span id="CreateBy"> </span></span>
              </div>
			  <div class="">
				 <i id="deleteComment" class="fas fa-times"></i>
              </div>
			</li>`).children[0];
	}
}