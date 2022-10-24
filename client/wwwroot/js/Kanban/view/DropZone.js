import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];

		dropZone.addEventListener("dragover", e => {

			e.preventDefault();
			dropZone.classList.add("kanban__dropzone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		dropZone.addEventListener("drop", e => {
			e.preventDefault();
			dropZone.classList.remove("kanban__dropzone--active");


			const columnElement = dropZone.closest(".board");
			const columnId = Number(columnElement.dataset.list_id);
			const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
			const droppedIndex = dropZonesInColumn.indexOf(dropZone);
			const itemId = Number(e.dataTransfer.getData("text/plain"));
			const droppedItemElement = document.querySelector(`[data-card_id="${itemId}"]`);
			const insertAfter = dropZone.parentElement.classList.contains("board__boxes") ? dropZone.parentElement : dropZone;
			//console.log(itemId);
			if (droppedItemElement.contains(dropZone)) {
				return;
			}

			insertAfter.after(droppedItemElement);
			//columnt id itu id dari list, item id itu id dari card, position isinya ->
			KanbanAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex
			});
		});

		return dropZone;
	}
}