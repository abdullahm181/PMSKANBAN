//Id,InvitedDate,Status,Board_Id,User_Id
import KanbanAPI from "./api/KanbanApi.js";


$(document).ready(function () {
    KanbanAPI.Methode("GET", "home/GetByManager", { "ManagerId": parseInt(sessionStorage.getItem("LoginUserId")) }, function (data) {
        console.log(data);
        var managersTable = $('#tManagers').DataTable({

            dom: "<'row'<'col'l><'col'B><'col'f>>"
                + "<'row'<'col-sm-12'tr>>"
                + "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
            //dom: 'lBfrtip'
            ,
            buttons: [

                {
                    extend: 'excelHtml5',
                    name: 'excel',
                    title: 'DepartmentBoard',
                    sheetName: 'DepartmentBoard',
                    text: 'download',
                    className: 'btn-default',
                    filename: 'DepartmentBoard',
                    autoFilter: true,
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ],
            data: data.Boards,
            "columns": [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                // {
                //     "data": "",
                //     "render": function ( data, type, row ) {
                //         return  `Rp. ${row.name} ${row.gender}`;
                //     }
                // },
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
                        return `<button id="btnSeeBoard" type="button" class="btn btn-outline-primary">See Board</button>
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
            console.log(data);
            sessionStorage.setItem("CurrentBoardId", data.id);
            boardChossen = document.querySelector("#GoToBoard");
            boardChossen.setAttribute('data-link', `/list`)
            GoToUri(boardChossen.dataset.link);
        });

    });

});