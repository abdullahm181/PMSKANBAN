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
function ComfirmRequest(reqId, UserId, BoardId, newStatus) {
    console.log(reqId, UserId, BoardId, newStatus);
    Swal.fire({
        title: 'Are you sure to ' + newStatus + ' this invitation?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (newStatus == "accepted") {
                //status,User_Id,Boards_Id
                var newPostMember = {
                    "status": "member",
                    "User_Id": UserId,
                    "Board_Id": BoardId
                };
                console.log(newPostMember)
                KanbanAPI.Methode("POST", "memberBoard/Post", newPostMember, function (d) {
                    console.log(d);
                    if (d == null) {
                        Swal.fire('Error!', '', 'error');
                        return 0;
                    }
                });
            };
            var deleteReq = {
                "id": reqId
            };
            KanbanAPI.Methode("DELETE", "invitedMembers/DeleteEntity", deleteReq, function (d) {
                console.log(d);
                //$('#tInvitation').DataTable().ajax.reload();
                window.location.reload();
                Swal.fire(newStatus + '!', '', 'success');
            });


        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
}
function updateRequest(reqId, UserId, BoardId, newStatus) {

    if (newStatus == "accepted" || newStatus == "rejected") {
        ComfirmRequest(reqId, UserId, BoardId, newStatus)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
};
$(document).ready(function () {
    //$('#tInvitation').DataTable();
    var inviteTable = $('#tInvitation').DataTable({

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
                title: 'invitatioBoard',
                sheetName: 'invitatioBoard',
                text: '<i class="fas fa-download"></i>',
                titleAttr: 'Download',
                className: 'btn-default',
                filename: 'invitatioBoard',
                autoFilter: true,
                exportOptions: {
                    columns: [0, 1,2,3,4]
                }
            }
        ],
        "ajax": async function (d, callback, s) {
            let invite = [];
            let board = [];
            invite.push(...await fetchData('/invitedMembers/GetRequestByUserId', { "UserId": parseInt(sessionStorage.getItem("LoginUserId")) }));
            board.push(...await fetchData('/home/GetAll'));
            const uniqueInvited = new Map(board.map(s => [s.id, s]));
            const result = invite.map(s => ({
                ...s,
                boardOf: uniqueInvited.get(s.board_Id)
            }));
            console.log(result);
            /*result.forEach(a => {
                inviteTable.row.add([
                    a.id,
                    a.boardOf.name,
                    a.boardOf.description,
                    a.boardOf.user.employees.firstName + " " + a.boardOf.user.employees.lastName,
                    a.invitedDate,
                    `<div class="d-flex justify-content-center">
                        <button id="btnAccept" type="button" class="btn btn-success me-2">Accept</button>
                        <button id="btnReject" type="button" class="btn btn-danger">Reject</button>
                    </div>`
                ]).draw(false);
            })*/
            callback({
                'data': result
            });
        },
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
                    return `${row.boardOf.name}`;
                }
            },
            {
                "data": "",
                "render": function (data, type, row) {

                    return `${row.boardOf.description}`;
                }
            },
            {
                "data": "",
                "render": function (data, type, row) {
                    return `${row.boardOf.user.employees.firstName} ${row.boardOf.user.employees.lastName}`;
                }
            },
            { "data": "invitedDate" },
            {
                "data": "",
                "render": function (data, type, row) {
                    return `<button id="btnAccept" type="button" class="btn btn-success me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Accept"><i class="fas fa-check"></i></button>
                                    <button id="btnReject" type="button" class="btn btn-danger"data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reject"><i class="fas fa-times"></i></button>
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
    $('#tInvitation tbody').on('click', 'button#btnAccept', function () {
        var data = inviteTable.row($(this).parents('tr')).data();
        updateRequest(data.id, data.user_Id, data.board_Id, "accepted");
    });
    $('#tInvitation tbody').on('click', 'button#btnReject', function () {
        var data = inviteTable.row($(this).parents('tr')).data();
        updateRequest(data.id, data.user_Id, data.board_Id, "rejected");
    });


});