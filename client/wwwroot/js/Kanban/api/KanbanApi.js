import Card from "../view/Card.js";

export default class KanbanAPI {
    static Methode(TypeMethode, requestUri, BodyData = null, callback) {
        var data;
        const Get = $.ajax({
            type: `${TypeMethode}`,
            url: `/${requestUri}`,
            data: BodyData ? BodyData : null,
            success: function (resp) {
                data = resp;
                callback(data);
            }
        }).fail((error) => {
            console.log(error);
        });
        console.log(Get)
        return data;
    }
    static updateItem(itemId, newProps) {
        var data = {};
        data["CardId"] = itemId;
        this.Methode("GET", "list/GetCard", data, function (d) {
            console.log(d);
            const currentColumn = document.querySelector(`[data-list_id="${d.list_Id}"]`);

            const AllcardCC = currentColumn.getElementsByClassName("board__boxes");
            console.log(currentColumn);
            console.log(AllcardCC);
            if (AllcardCC.length != 0)
            {
                for (let index = 0; index < AllcardCC.length; index++) {
                    var cardId = AllcardCC[index].getAttribute("data-card_id");
                    var dataNew = {};
                    dataNew["CardId"] = cardId;
                    KanbanAPI.Methode("GET", "list/GetCard", dataNew, function (d) {
                        //processing the data
                        console.log(d);
                        d.order = index;
                        var newCard = {
                            "Id": d.id,
                            "Name": d.name,
                            "Order": d.order,
                            "Description": d.description,
                            "DeadLine": d.deadLine,
                            "List_Id": d.list_Id,
                            "personIncharge": d.personIncharge
                        };
                        console.log(newCard);
                        KanbanAPI.Methode("PUT", "list/EditCard", newCard, function (d) {
                            //processing the data
                            console.log(d);
                        });
                    });
                }
            }
            
            const targetColumn = document.querySelector(`[data-list_id="${newProps.columnId}"]`);
            const AllcardTC = targetColumn.getElementsByClassName("board__boxes");
            
            console.log(targetColumn);
            console.log(AllcardTC);
            if (AllcardTC.length != 0) {
                for (let index = 0; index < AllcardTC.length; index++) {
                    var cardId =AllcardTC[index].getAttribute("data-card_id");
                    var dataNew = {};
                    dataNew["CardId"] = cardId;
                    KanbanAPI.Methode("GET", "list/GetCard", dataNew, function (d) {
                        //processing the data
                        console.log(d);
                        if (d.id == itemId) {
                            d.list_Id = newProps.columnId;
                        };
                        d.order = index;
                        console.log(d);
                        var newCard = {
                            "Id": d.id,
                            "Name": d.name,
                            "Order": d.order,
                            "Description": d.description,
                            "DeadLine": d.deadLine,
                            "List_Id": d.list_Id,
                            "personIncharge": d.personIncharge
                        };
                        console.log(newCard);
                        KanbanAPI.Methode("PUT", "list/EditCard", newCard, function (d) {
                            //processing the data
                            console.log(d);
                        });
                    });
                    //disini update setiap card sesuai sama ordernya/ option selainnya cara dibawah
                }
            }
        });
    }
    static UpdateList(newList) {
        const targetColumn = document.querySelector(`[data-list_id="${newList.Id}"]`);
        targetColumn.querySelector("#ColumnTitle").textContent = newList.Name;
    }
    static EditList(ListId) {
        var data = {};
        data["id"] = ListId;
        $('#EditListModal').modal('show');
        $("#EditColumnKanban").on("submit", () => {
            KanbanAPI.Methode("GET", "list/Get", data, function (d) {
                var newList = {
                    "Id": d.id,
                    "Board_Id": d.board_Id,
                    "Order": d.order
                };
                $('#EditColumnKanban').serializeArray().map(function (x) { newList[x.name] = x.value; });
                KanbanAPI.Methode("PUT", "list/Put", newList, function (d) {
                    //processing the data
                    KanbanAPI.UpdateList(newList);
                    $('#EditListModal').modal('hide');
                });
            });
        });
        
        alert("You want to edit list Id : " + ListId);
    }
    static DeleteList(ListId) {
        const targetColumn = document.querySelector(`[data-list_id="${ListId}"]`);
        const AllcardTC = targetColumn.getElementsByClassName("board__boxes");
        
        console.log(AllcardTC);
        if (AllcardTC.length == 0) {
            KanbanAPI.Methode("DELETE", "list/DeleteEntity", { "id": ListId }, function (d) {
                const ListElements = document.getElementsByClassName("board");
                const listContainer = document.querySelector("#main__kanban");
                listContainer.removeChild(document.querySelector(`[data-list_id="${ListId}"]`));
                for (let index = 0; index < ListElements.length; index++) {
                    console.log(ListElements[index].dataset.list_id);
                    var data = {};
                    data["id"] = ListElements[index].dataset.list_id;
                    KanbanAPI.Methode("GET", "list/Get", data, function (d) {
                        d.order = index;
                        KanbanAPI.Methode("PUT", "list/Put", d, function (d) {

                        });
                    });
                }
            });
        } else {
            Swal.fire(
                'Error!',
                'This list contain cards, Please empty this list if you want to delete it!',
                'error'
            );
        }
        
        //alert("You want to delete list Id : " + ListId);
    }
    static addCard(ListId, boardId) {
        $('#addCardModal').modal('show');
        var dataMember = {};
        dataMember["BoardId"] = boardId;
        KanbanAPI.Methode("GET", "memberBoard/getbyboardid", dataMember, function (d) {
            $.each(d, function () {
                $("#PersonCardCreate").append($("<option />").val(this.id).text(`${this.user.employees.firstName} ${this.user.employees.lastName} --- ${this.user.employees.jobs.jobTitle}`));

            });
        });

        $("#AddCardKanban").on("submit", () => {
            var root = document.querySelector(`[data-list_id="${ListId}"]`);
            var rootCardContainer = root.querySelector(".board__conatiner");
            const cardContainer = Array.from(root.querySelectorAll(".board__boxes"));
            console.log(cardContainer.length);
            var data = {};
            data["Order"] = cardContainer.length;
            data["List_Id"] = ListId
            $('#AddCardKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
            data["PersonInCharge"] = parseInt(data["PersonInCharge"]);
            console.log(data);
            KanbanAPI.Methode("POST", "list/CreateCard", data, function (d) {
                var newData = {};
                console.log(d);
                newData["CardId"] = d.id;
                KanbanAPI.Methode("GET", "list/GetCard", newData, function (d) {
                    const cardView = new Card(d.id, d.name, d.numberTaskItem, d.numbercomment, d.personIncharge, d.list_Id);
                    rootCardContainer.appendChild(cardView.elements.root);
                    $('#addCardModal').modal('hide');
                });
            });
            event.preventDefault();
        });
        //Name,Order,Description,DeadLine,List_Id,PersonInCharge
    }
    static deleteCard(CardId, ListId) {

        console.log(CardId, "---", ListId);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure delete this card?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {};
                data["id"] = CardId;
                KanbanAPI.Methode("DELETE", "card/DeleteEntity", data, function (d) {
                    const listContainer = document.querySelector(`[data-list_id="${ListId}"]`);
                    var CardContainer = listContainer.querySelector(".board__conatiner");
                    CardContainer.removeChild(CardContainer.querySelector(`[data-card_id="${CardId}"]`));
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your card has been deleted.',
                        'success'
                    )
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your card is safe :)',
                    'error'
                )
            }
        })
    }
}