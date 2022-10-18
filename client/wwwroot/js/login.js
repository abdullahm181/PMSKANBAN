import KanbanAPI from "./Kanban/api/KanbanApi.js";
$("#LoginUser").on("submit", () => {
	var data = {};
	$('#LoginUser').serializeArray().map(function (x) { data[x.name] = x.value; });
	KanbanAPI.Methode("POST", "Auth/login", data, function (d) {
		console.log(d);
		if (d.result == 200) {
			window.location = "/Home/index";
		} else {
			Swal.fire({
				icon: 'error',
				title: d.result,
				text: d.message,
			})
		}
	});

	event.preventDefault();

});
$("#RegisterNav").on("click", () => {
	document.getElementById("RegisterUser").reset();
	console.log("masuk register");
	KanbanAPI.Methode("GET", "departments/GetAll", {}, function (d) {
		console.log(d);
		$("#DepartmentsRegister").empty()
		$.each(d, function () {
			$("#DepartmentsRegister").append($("<option />").val(this.id).text(`${this.name}`));

		});
	});
	KanbanAPI.Methode("GET", "jobs/GetAll", {}, function (d) {
		console.log(d);
		$("#JobRegister").empty()
		$.each(d, function () {
			$("#JobRegister").append($("<option />").val(this.id).text(`${this.jobTitle}`));

		});
	});
});
$("#RegisterUser").on("submit", () => {
	var data = {};
	$('#RegisterUser').serializeArray().map(function (x) { data[x.name] = x.value; });
	KanbanAPI.Methode("POST", "Auth/register", data, function (d) {
		console.log(d);
		if (d.result == 200) {
			document.getElementById("RegisterUser").reset();
			Swal.fire(
				'Registered!',
				d.message,
				'success'
			);
		} else {
			Swal.fire({
				icon: 'error',
				title: d.result,
				text: d.message,
			});
		}
	});

	event.preventDefault();

});