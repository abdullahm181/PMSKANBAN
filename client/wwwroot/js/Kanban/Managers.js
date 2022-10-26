//Id,InvitedDate,Status,Board_Id,User_Id
import KanbanAPI from "./api/KanbanApi.js";

function fetchData(url, BodyData = null) {
    return $.ajax({
        url,
        data: BodyData ? BodyData : null,
        dataType: 'json'
    })
        .done(function (res) {
            return res;
        })
        .fail(function (err) {
            return 'error';
        });
}
function format(d) {
    var totalCard = 0;
    d.numberCards.forEach(card => {
        //console.log(list);
        totalCard += card;
    });
    let indexDone = d.labelName.indexOf("Done");
    var porgres;
    if (totalCard <= 0) {
        porgres = '0%';
    } else {
        porgres = (d.numberCards[indexDone] / totalCard) * 100 + '%';
    }
    
    console.log(porgres);
    //var card = await fetchData('/home/GetDataDoughnutChart', { "BoardId": d.id });
    //console.log(card);
   /* progress.style.width = (d.numberCards[indexDone] / totalCard) * 100 + '%';
    progress.textContent = (d.numberCards[indexDone] / totalCard) * 100 + '%';
    progress.style.opacity = 1*/
    /*KanbanAPI.Methode("GET", "home/GetDataDoughnutChart", { "BoardId": d.id }, function (card) {
        return (`
            <div class="progress my-auto">
                <div class="progress-done" style="width='50%';opacity=1;">
                    50%
                </div>
            </div>
                `);
    });*/
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Progress:</td>' +
        '<td>' +
        `<div class="progress my-auto">
                <div class="progress-done" style="width:${porgres};opacity:1;">
                   ${porgres}
                </div>
            </div>` +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Total Task:</td>' +
        '<td>' +
        `${totalCard }`+
        '</td>' +
        '</tr>' +
        '</table>'
    );
}
$(document).ready(function () {
    KanbanAPI.Methode("GET", "home/GetByManager", { "ManagerId": parseInt(sessionStorage.getItem("LoginUserId")) }, function (data) {
        
        

        var managersTable = $('#tManagers').DataTable({

            dom: "<'row'<'col'l><'col'B><'col'f>>"
                + "<'row'<'col-sm-12'tr>>"
                + "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
            //dom: 'lBfrtip'
            ,
            fnInitComplete: function () {
                $("[data-bs-toggle='tooltip']").tooltip({
                    container: 'body'
                });
            },
            buttons: [

                {
                    extend: 'excelHtml5',
                    name: 'excel',
                    title: 'DepartmentBoard',
                    sheetName: 'DepartmentBoard',
                    text: '<i class="fas fa-download"></i>',
                    className: 'btn-default',
                    titleAttr: 'Download',
                    filename: 'DepartmentBoard',
                    autoFilter: true,
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ],
            data: data.Boards,
            "columns": [
                /*{
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },*/
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: '',
                },
                {
                    "data": "",
                    "render": function (data, type, row) {
                        return `${row.name}`;
                    }
                },
                {
                    "data": "",
                    "render": function (data, type, row) {

                        return `${row.description}`;
                    }
                },
                {
                    "data": "",
                    "render": function (data, type, row) {
                        return `${row.user.employees.firstName} ${row.user.employees.lastName}`;
                    }
                },
                {
                    "data": "",
                    "render": function (data, type, row) {
                        return moment(row.createDate.split("T")[0]).format('MMMM Do YYYY');
                    }
                },
                {
                    "data": "",
                    "render": function (data, type, row) {
                        return `<button id="btnSeeBoard" type="button" class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="See Board"><i class="far fa-eye"></i></button>
                                    `;
                    }
                }
            ]
            /*"ajax": {
                url: "/invitedMembers/GetRequestByUserId",
                type: "GET",
                data: { "UserId": parseInt(sessionStorage.getItem("LoginUserId")) },
                dataSrc: "",
                dataType: "JSON"
            },
            */
        });
        $('#tManagers tbody').on('click', 'button#btnSeeBoard', function () {
            var data = managersTable.row($(this).parents('tr')).data();
            
            sessionStorage.setItem("CurrentBoardId", data.id);
            var boardChossen = document.querySelector("#GoToBoard");
            boardChossen.setAttribute('data-link', `/list`)
            GoToUri(boardChossen.dataset.link);
        });
        // Add event listener for opening and closing details
        $('#tManagers tbody').on('click', 'td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = managersTable.row(tr);
            KanbanAPI.Methode("GET", "home/GetDataDoughnutChart", { "BoardId": row.data().id }, function (card) {
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    // Open this row
                    row.child(format(card)).show();
                    tr.addClass('shown');
                }
            });
            
        });

    });

});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))