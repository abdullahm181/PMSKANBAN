import KanbanAPI from "../api/KanbanApi.js";
export default class Comment {
	constructor(id, text,UserId,CardId) {

		this.elements = {};
		this.elements.root = Comment.createRoot();
		this.elements.text = this.elements.root.querySelector("#TextComment");
		this.elements.createBy = this.elements.root.querySelector("#CreateBy");
		this.elements.deleteComment = this.elements.root.querySelector("#deleteComment");


		this.elements.root.dataset.comment_id = id;
		this.elements.text.textContent = text;
		this.elements.createBy.textContent = UserId;

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
                <img src="http://placekitten.com/50/50" />
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