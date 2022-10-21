import KanbanAPI from "./api/KanbanApi.js";

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

async function showAvatar(id) {
	KanbanAPI.Methode("GET", "home/Get", { "id": id }, async function (board) {
		document.getElementById('ChartPageTitle').textContent = board.name;
		var coloR = [];


		//bar chart
		var labelList = [];
		var NameMember = [];
		// read our JSON
		let response = await fetch('https://localhost:44358/list/GetByBoardId?BoardId=' + id);
		let lists = await response.json();
		let responseCard = await fetch('https://localhost:44358/card/GetByBoardId?BoardId=' + id);
		let cards = await responseCard.json();
		let responseMember = await fetch('https://localhost:44358/MemberBoard/GetByBoardId?BoardId=' + id);
		let members = await responseMember.json();

		members.forEach(member => {
			NameMember.push(member.user.employees.firstName + " " + member.user.employees.lastName);
		});
		var StuckedBar = {};

		lists.forEach(list => {
			//var jumlahcardObj = {};
			var cardsNumber = [];
			members.forEach(member => {
				var jumlahcard = 0;
				cards.forEach(card => {
					if (card.personIncharge == member.id && card.list_Id == list.id) {
						jumlahcard += 1;

					}
				});
				cardsNumber.push(jumlahcard);
			});
			StuckedBar[`${list.name}`] = cardsNumber;
			labelList.push(list.name);
			coloR.push(getRandomColor());
		});

		var datasetsChart = [];
		var colorNumber = 0;
		labelList.forEach(labels => {

			var newDataset = {
				label: labels,
				data: StuckedBar[`${labels}`],
				backgroundColor: coloR[colorNumber],
				order: 3,
				stack: 'stack1'
			};
			datasetsChart.push(newDataset);
			colorNumber += 1;
		});

		const data = {
			labels: NameMember,
			datasets: datasetsChart
		}

		const config = {
			type: 'bar',
			data: data,
			options: {
				indexAxis: 'y',
				plugins: {
					tooltip: {
						mode: 'index'
					}
				},
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true
					}
				}
			},
		};

		const reportOutput = new Chart(
			document.getElementById('StackedBar'),
			config
		);
		//dounut chart
		var Doughnut = {
			"BoardId": parseInt(sessionStorage.getItem("CurrentBoardId"))
		};
		KanbanAPI.Methode("GET", "home/GetDataDoughnutChart", Doughnut, async function (d) {
			const dataDoughnut = {
				labels: d.labelName,
				datasets: [{
					label: 'My First Dataset',
					data: d.numberCards,
					backgroundColor: coloR,
					hoverOffset: 4
				}]
			};
			const configDoughnut = {
				type: 'doughnut',
				data: dataDoughnut,
			};
			var myChartDoughnut = new Chart(document.getElementById('Doughnut'), configDoughnut)

		});
		
	});
	document.getElementById('StackedBar').parentNode.style.height = '100%';
	document.getElementById('StackedBar').parentNode.style.width = '100%';
	document.getElementById('Doughnut').parentNode.style.height = '100%';
	document.getElementById('Doughnut').parentNode.style.width = '100%';
}
if (sessionStorage.getItem("CurrentBoardId") === undefined || sessionStorage.getItem("CurrentBoardId") == null || sessionStorage.getItem("CurrentBoardId") == 0) {
	Swal.fire({
		icon: 'error',
		title: "No board selected!",
		text: "Please select a board on your dashboard",
	});
} else {
	showAvatar(parseInt(sessionStorage.getItem("CurrentBoardId")));
}
