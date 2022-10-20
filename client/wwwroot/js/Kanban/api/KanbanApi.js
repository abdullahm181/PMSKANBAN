import Card from "../view/Card.js";
import Comment from "../view/Comment.js";
import ImageProfile from "../view/ImageProfile.js";
import Task from "../view/Task.js";
import Dashboard from "../view/Dashboard.js";
export default class KanbanAPI {
    static Methode(TypeMethode, requestUri, BodyData = null, callback) {
        var data;
        const Get = $.ajax({
            type: `${TypeMethode}`,
            url: `/${requestUri}`,
            data: BodyData ? BodyData : null,
            beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
                $('#loader').removeClass('hidden')
            },
            success: function (resp) {

                if (/<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(resp)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error read the response',
                        text: 'Pless reach out the web owner!',
                    });
                }
                data = resp;
                callback(data);
            },
            complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                setTimeout(function () { $('#loader').addClass('hidden') }, 300)
                
            },
        }).fail((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: error.status,
                text: error.statusText,
            });
        });
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
    static UpdateCard(newCard) {
        const targetCard = document.querySelector(`[data-card_id="${newCard.Id}"]`);
        console.log(newCard);
        console.log(targetCard);
        var data = {};
        data["CardId"] = newCard.Id;
        KanbanAPI.Methode("GET", "list/GetCard", data, function (d) {
            targetCard.querySelector("#CardTitle").textContent = newCard.Name ? newCard.Name : d.name;
            targetCard.querySelector("#CardTaskItem").textContent = d.numberTaskItem;
            targetCard.querySelector("#CardComment").textContent = d.numbercomment;
            var data = {};
            data["id"] = newCard.PersonInCharge ? newCard.PersonInCharge : d.personIncharge;
            KanbanAPI.Methode("GET", "memberBoard/Get", data, function (d) {
                //processing the data
                var imageProfileInitial = KanbanAPI.putImageName(d.user.employees.firstName + " " + d.user.employees.lastName);
                targetCard.querySelector("#CardPersonImg").textContent = imageProfileInitial;
            });
        });
    }
    static EditList(ListId) {
        var data = {};
        data["id"] = ListId;
        let text = "";
        text = `<form id="EditColumnKanban" method="POST" action="javascript:void(0);">
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="NameList" name="Name" required>
                    </div>
                    <div class="mb-3">
                        <input type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>`;
        $("#ModalTitle").text("Edit List");
        $("#ModalBody").html(text);

        //$('#EditListModal').modal('show');
       
        document.getElementById("EditColumnKanban").reset();
        KanbanAPI.Methode("GET", "list/Get", data, function (d) {
            document.getElementById("NameList").value = d.name;
            var newList = {
                "Id": d.id,
                "Board_Id": d.board_Id,
                "Order": d.order
            };
            $("#EditColumnKanban").on("submit", function () {
                $('#EditColumnKanban').serializeArray().map(function (x) { newList[x.name] = x.value; });
                KanbanAPI.Methode("PUT", "list/Put", newList, function (d) {
                    //processing the data
                    KanbanAPI.UpdateList(newList);
                    $('#ModalData').modal('hide');
                });
            });
        });
        
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
        //$('#addCardModal').modal('show');
        let text = "";
        text = `<form id="AddCardKanban" method="POST" action="javascript:void(0);">
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" name="Name" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" placeholder="Description" aria-label="Description" name="Description" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <div class="input-group date " id="datepicker">
                            <input type="text" class="form-control" placeholder="DeadLine" aria-label="DeadLine" name="DeadLine" required>
                            <span class="input-group-append">
                            </span>
                            <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                        </div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <div class="input-group mb-3">
                            <select class="form-select" placeholder="PersonInCharge" name="PersonInCharge" id="PersonCardCreate" required>
                                <option value="0" selected>Please select Person</option>
                            </select>
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></i></span>
                        </div>
                        <div class="invalid-feedback">Please chosee.</div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>`;
        $("#ModalTitle").text("Add Card");
        $("#ModalBody").html(text);
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd'
        });
        document.getElementById("AddCardKanban").reset();
        var dataMember = {};
        dataMember["BoardId"] = boardId;
        KanbanAPI.Methode("GET", "memberBoard/getbyboardid", dataMember, function (d) {
            $("#PersonCardCreate").empty()
            $.each(d, function () {
                $("#PersonCardCreate").append($("<option />").val(this.id).text(`${this.user.employees.firstName} ${this.user.employees.lastName} --- ${this.user.employees.jobs.jobTitle}`));

            });
        });

        $("#AddCardKanban").on("submit", function () {
            var root = document.querySelector(`[data-list_id="${ListId}"]`);
            var rootCardContainer = root.querySelector(".board__conatiner");
            const cardContainer = Array.from(root.querySelectorAll(".board__boxes"));
            console.log(cardContainer.length);
            var data = {};
            data["Order"] = cardContainer.length;
            data["List_Id"] = ListId;
            $('#AddCardKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
            data["PersonInCharge"] = parseInt(data["PersonInCharge"]);
            console.log(data);
            KanbanAPI.Methode("POST", "list/CreateCard", data, function (d) {
                var newData = {};
                console.log(d);
                newData["CardId"] = d.id;
                KanbanAPI.Methode("GET", "list/GetCard", newData, function (d) {
                    const cardView = new Card(d.id, d.name, d.numberTaskItem, d.numbercomment, d.personIncharge, d.list_Id, boardId);
                    rootCardContainer.appendChild(cardView.elements.root);
                    $('#ModalData').modal('hide');
                });
            });
            event.preventDefault();
        });
        //Name,Order,Description,DeadLine,List_Id,PersonInCharge
    }
    static editCard(CardId, ListId, BoardId) {
        console.log(CardId, ListId, BoardId);
        let text = "";
        text = `<form id="EditCardKanban" method="POST" action="javascript:void(0);">
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" id="NameCard" name="Name" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" placeholder="Description" aria-label="Description" id="DescriptionCard" name="Description" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <div class="input-group date " id="datepickerEditCard">
                            <input type="text" class="form-control" placeholder="DeadLine" aria-label="DeadLine" id="DeadLineCard" name="DeadLine" required>
                            <span class="input-group-append">
                            </span>
                            <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                        </div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <div class="input-group mb-3">
                            <select class="form-select" placeholder="PersonInCharge" name="PersonInCharge" id="PersonCardEdit" required>
                                <option value="0" selected>Please select Person</option>
                            </select>
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></i></span>
                        </div>
                        <div class="invalid-feedback">Please chosee.</div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>`;
        $("#ModalTitle").text("Edit Card");
        $("#ModalBody").html(text);
        $('#datepickerEditCard').datepicker({
            format: 'yyyy-mm-dd'
        });
        document.getElementById("EditCardKanban").reset();
        var data = {};
        data["id"] = CardId;
        KanbanAPI.Methode("GET", "card/Get", data, function (d) {
            var Card = d;
            var dataMember = {};
            dataMember["BoardId"] = BoardId;
            KanbanAPI.Methode("GET", "memberBoard/getbyboardid", dataMember, function (d) {
                document.getElementById("NameCard").value = Card.name;
                document.getElementById("DescriptionCard").value = Card.description;
                document.getElementById("DeadLineCard").value = Card.deadLine;
                $("#PersonCardEdit").empty()
                $.each(d, function () {
                    if (this.id == Card.personInCharge)
                        $("#PersonCardEdit").append($("<option selected='selected'/>").val(this.id).text(`${this.user.employees.firstName} ${this.user.employees.lastName} --- ${this.user.employees.jobs.jobTitle}`));
                    else
                        $("#PersonCardEdit").append($("<option />").val(this.id).text(`${this.user.employees.firstName} ${this.user.employees.lastName} --- ${this.user.employees.jobs.jobTitle}`));
                });
                $("#EditCardKanban").on("submit", () => {
                    var data = {};
                    data["Id"] = Card.id;
                    data["Order"] = Card.order;
                    data["List_Id"] = Card.list_Id;
                    $('#EditCardKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
                    data["PersonInCharge"] = parseInt(data["PersonInCharge"]);
                    console.log(data);
                    KanbanAPI.Methode("PUT", "card/Put", data, function (d) {
                        //processing the data
                        KanbanAPI.UpdateCard(data);
                        $('#ModalData').modal('hide');
                    });
                });
            });
        });
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
        });
    }
    static detailCard(CardId, ListId, BoardId) {
        let text = "";
        text = `<div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <h5 class="border-bottom border-3 border-warning" >Person in  Charge:</h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h6 id="PersonCard"></h6>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <h5 class="border-bottom border-3 border-warning" >DeadLine :</h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h6 id="DeadLineCard">Deadline</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <h5 class="border-bottom border-3 border-warning" >Description :</h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h6  id="DescriptionCard">Test</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="" >sub-Task :</h5>
            <div class="actionBox">
              
              <ul id="task-container" class="" data-card_id_task=${CardId}>
              </ul>
              <form class="form-inline item" role="form" id="AddTask" method="POST" action="javascript:void(0);">
                   <div class="hstack gap-3">
                      <input type="text" class="form-control" placeholder="Add new sub task" aria-label="Text" name="Text" required></textarea>
                      <button type="submit" class="btn btn-secondary">Add</button>
                    </div>
              </form>
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="" >Comments :</h5>
            <div class="actionBox">
              <ul class="commentList" data-card_id_comment=${CardId}>
              </ul>
              <form class="form-inline item" role="form" id="AddComment" method="POST" action="javascript:void(0);">
                   <div class="hstack gap-3">
                      <textarea class="form-control me-auto"  type="text" placeholder="Your comments ...." name="Text"></textarea>
                      <button type="submit" class="btn btn-secondary">Add Comment</button>
                    </div>
              </form>
          </div>
          </div>
        </div>`;
        const CurrenntLoginUserId = parseInt(sessionStorage.getItem("LoginUserId"));
        var data = {};
        data["id"] = CardId;
        KanbanAPI.Methode("GET", "card/Get", data, function (d) {
            console.log(d);
            $("#ModalTitle").text(d.name);
            $("#ModalBody").html(text);
            $("#PersonCard").text(d.memberBoard.user.employees.firstName + " "+d.memberBoard.user.employees.lastName);
            $("#DeadLineCard").text(d.deadLine);
            $("#DescriptionCard").text(d.description);
            const CommentContainer = document.querySelector(`[data-card_id_comment="${CardId}"]`);
            const TaskContainer = document.querySelector(`[data-card_id_task="${CardId}"]`);
            console.log(TaskContainer);
            //belom task
            var dataTask = {};
            dataTask["CardId"] = CardId;
            KanbanAPI.Methode("GET", "taskcard/GetByCardId", dataTask, function (d) {
                console.log(d, data);
                d.forEach(task => {
                    KanbanAPI.renderTask(TaskContainer, task);
                });
                $("#AddTask").on("submit", () => {
                    var dataPostTask = {};
                    $('#AddTask').serializeArray().map(function (x) { dataPostTask[x.name] = x.value; });
                    dataPostTask["Card_Id"] = CardId;
                    dataPostTask["Status"] = false;
                    KanbanAPI.Methode("POST", "taskcard/Post", dataPostTask, function (d) {
                        KanbanAPI.renderTask(TaskContainer, d);
                        KanbanAPI.Methode("GET", "list/GetCard", dataComments, function (d) {
                            console.log(d);
                            var update = {};
                            update["Id"] = CardId;
                            KanbanAPI.UpdateCard(update);
                        });
                        document.getElementById("AddTask").reset();
                    });
                    event.preventDefault();

                });
            });
            var dataComments = {};
            dataComments["CardId"] = CardId;
            KanbanAPI.Methode("GET", "comments/GetByCardId", dataComments, function (d) {
                console.log(d,data);
                d.forEach(comments => {

                    KanbanAPI.renderComment(CommentContainer, comments);

                });
                $("#AddComment").on("submit", () => {
                    var dataPost = {};
                    $('#AddComment').serializeArray().map(function (x) { dataPost[x.name] = x.value; });
                    dataPost["Card_Id"] = CardId;
                    dataPost["User_Id"] = CurrenntLoginUserId;//"SesisonUser sakrang
                    KanbanAPI.Methode("POST", "comments/Post", dataPost, function (d) {
                        var dataGet = {
                            "Id":d.id
                        };
                        KanbanAPI.Methode("GET", "comments/Get", dataGet, function (d) {
                            KanbanAPI.renderComment(CommentContainer, d);
                            KanbanAPI.Methode("GET", "list/GetCard", dataComments, function (d) {
                                console.log(d);
                                var update = {};
                                update["Id"] = d.id;
                                update["Name"] = d.name;
                                update["PersonInCharge"] = d.personIncharge;
                                KanbanAPI.UpdateCard(update);
                            });
                            document.getElementById("AddComment").reset();
                        });
                        
                    });
                    event.preventDefault();

                });
            });
        });
    }
    static renderComment(root, objNewComment) {
        console.log(objNewComment);
        const commentView = new Comment(objNewComment.id, objNewComment.text, objNewComment.user.employees.firstName + " " + objNewComment.user.employees.lastName, objNewComment.card_Id, objNewComment.user_Id);

        root.appendChild(commentView.elements.root);
    }
    static deleteComment(id, CardId, UserId) {
        //console.log(id, "---", CardId, "---", UserId);
        const CurrenntLoginUserId = parseInt(sessionStorage.getItem("LoginUserId"));
        //const CurrenntLoginUserId = 2;
        if (UserId == CurrenntLoginUserId) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure delete this comments?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    var data = {};
                    data["id"] = id;
                    KanbanAPI.Methode("DELETE", "comments/DeleteEntity", data, function (d) {
                        const CommentContainer = document.querySelector(`[data-card_id_comment="${CardId}"]`);
                        CommentContainer.removeChild(CommentContainer.querySelector(`[data-comment_id="${id}"]`));
                        var dataCard = {};
                        dataCard["CardId"] = CardId;
                        KanbanAPI.Methode("GET", "list/GetCard", dataCard, function (d) {
                            console.log(d);
                            var update = {};
                            update["Id"] = d.id;
                            update["Name"] = d.name;
                            update["PersonInCharge"] = d.personIncharge;
                            KanbanAPI.UpdateCard(update);
                        });
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
            });
        } else {
            Swal.fire(
                'Error!',
                'you are not the creator of this comment!',
                'error'
            );
        }
        
    }
    static putImageName(Name) {
        var ProfilName =Name;
        const myArray = ProfilName.split(" ");
        var intials = "";
        if (myArray.length > 2) {
            for (let index = 0; index < 2; index++) {
                intials += myArray[index].charAt(0);

            }
        } else {
            myArray.forEach(element => {
                intials += element.charAt(0);

            });
        }
        return intials;
    }
    static renderMemberBoard(root,newProps) {
        const imageMemberView = new ImageProfile(newProps.id, newProps.status, newProps.fullname);

        root.appendChild(imageMemberView.elements.root);
    }
    static addMemberBoard(BoardId) {
        let text = "";
        text = `<form id="AddMemberBoard" method="POST" action="javascript:void(0);">
                    <div class="form-outline mb-4">
                        <div class="input-group mb-3">
                            <select class="form-select" placeholder="inviteColaborator" name="User_Id" id="inviteColaborator" >
                                <option value="0" selected>Please select new Member</option>
                            </select>
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></i></span>
                        </div>
                        <div class="invalid-feedback">Please chosee.</div>
                    </div>
                    <div class="mb-3">
                        <input id="AddMember" type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>
                `;
        $("#ModalTitle").text("Add Colaborator");
        $("#ModalBody").html(text);
        var dataReq = {}
        var dataMember = {};
        dataMember["BoardId"] = BoardId

        KanbanAPI.Methode("GET", "user/GetUserLeftByBoardId", dataMember, function (d) {
            $("#inviteColaborator").empty()
            $.each(d, function () {
                $("#inviteColaborator").append($("<option />").val(this.id).text(`${this.employees.firstName} ${this.employees.lastName} --- ${this.employees.jobs.jobTitle}`));

            });
            dataReq = {
                "InvitedDate": new Date(Date.now()).toISOString().slice(0, 10),
                "Status": "request",
                "Board_Id": BoardId
            };
            console.log(dataReq);
            document.querySelector("#AddMember").addEventListener("click", () => {
                dataReq["User_Id"] = parseFloat($("#inviteColaborator").find(":selected").val());
                console.log(dataReq);
                KanbanAPI.Methode("POST", "invitedmembers/Post", dataReq, function (d) {
                    console.log(d);
                    if (d != null) {
                        if (d.id !== undefined && d.id != null) {
                            $('#ModalData').modal('hide');
                            Swal.fire(
                                'Succes !',
                                'Succes send colaborator request !',
                                'success'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Error !',
                            'Error send colaborator request !',
                            'error'
                        );
                    }
                });
            });
        });
        /*$("#AddMemberBoard").on("submit", function () {
            //IdX , InvitedDate,Status="request",Board_Id,User_Id
            $('#AddMemberBoard').serializeArray().map(function (x) { dataReq[x.name] = x.value; });
            console.log(dataReq);
            KanbanAPI.Methode("POST", "invitedmembers/Post", newBoard, function (d) {
                console.log(d);
                if (d.id !== undefined && d.id != null) {
                    $('#ModalData').modal('hide');
                    Swal.fire(
                        'Succes !',
                        'Succes send colaborator request to  ' + d.user.employees.firstName + ' ' + d.user.employees.lastName + '! Wait user response.. ',
                        'success'
                    );
                }
            });
        });*/
    }
    static renderTask(root, todo) {
        const taskView = new Task(todo);

        root.appendChild(taskView.elements.root);
        //root.appendChild(dummy.children[0]);


    }
    static deleteTask(id, CardId) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure delete this sub Task?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {};
                data["id"] = id;
                KanbanAPI.Methode("DELETE", "taskcard/DeleteEntity", data, function (d) {
                    const TaskContainer = document.querySelector(`[data-card_id_task="${CardId}"]`);
                    TaskContainer.removeChild(TaskContainer.querySelector(`[data-task_id="${id}"]`));
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
        });
    }
    static createBoard() {
        const CurrenntLoginUserId = parseInt(sessionStorage.getItem("LoginUserId"));
        let text = "";
        text = `<form id="AddBoardKanban" method="POST" action="javascript:void(0);">
                    <div class="form-outline mb-4">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" name="Name" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <textarea type="text" class="form-control" placeholder="Description" aria-label="Description" name="Description" required></textarea>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>`;
        $("#ModalTitle").text("Add Board");
        $("#ModalBody").html(text);
        document.getElementById("AddBoardKanban").reset();
        $("#AddBoardKanban").on("submit", function () {
            //id,Name,description,create date
            /*var root = document.querySelector(`[data-list_id="${ListId}"]`);
            var rootCardContainer = root.querySelector(".board__conatiner");
            const cardContainer = Array.from(root.querySelectorAll(".board__boxes"));*/
            var root=document.querySelector("#ListOfBoardUser")
            //dari form baru dapet Name + description , kurang User_Id,CreateDate,Status
            var data = {};
            data["User_Id"] = CurrenntLoginUserId;
            data["CreateDate"] = new Date(Date.now()).toISOString().slice(0, 10);
            data["Status"] = "owner";
            $('#AddBoardKanban').serializeArray().map(function (x) { data[x.name] = x.value; });
            console.log(data);
            KanbanAPI.Methode("POST", "home/Create", data, function (d) {
                console.log(d);
                if (d.result == 200) {
                    const boardView = new Dashboard(d.data.id, d.data.name, d.data.description);
                    root.appendChild(boardView.elements.root);
                    $('#ModalData').modal('hide');
                    Swal.fire(
                        'Succes create board!',
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
    }
    static deleteBoard(id) {
        //console.log(id, "---", CardId, "---", UserId);
        const CurrenntLoginUserId = parseInt(sessionStorage.getItem("LoginUserId"));
        var data = {};
        data["BoardId"] = id;
        //dapetin owner
        KanbanAPI.Methode("GET", "memberboard/GetOwnerByBoardId", data, function (d) {
            console.log(d, " ", CurrenntLoginUserId)
            if (d.user_Id == CurrenntLoginUserId) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure delete this Board?',
                    text: "You won't be able to revert this, and data that related to this board will be delete too!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        var data = {};
                        data["BoardId"] = id;
                        KanbanAPI.Methode("DELETE", "home/DeleteBoard", data, function (d) {
                            const boardUserContainer = document.querySelector("#ListOfBoardUser");
                            boardUserContainer.removeChild(boardUserContainer.querySelector(`[data-board_id="${id}"]`));
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your Board has been deleted.',
                                'success'
                            )
                        });
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your Board is safe :)',
                            'error'
                        )
                    }
                });
            } else {
                Swal.fire(
                    'Error!',
                    'you are not the creator of this Board!',
                    'error'
                );
            }
        });
        //const CurrenntLoginUserId = 2;
        

    }
    static EditBoard(BoardId) {
        var data = {};
        data["id"] = BoardId;
        let text = "";
        text = `<form id="EditBoardKanban" method="POST" action="javascript:void(0);">
                    <div class="form-outline mb-4">
                        <input id="NameBoard" type="text" class="form-control" placeholder="Name" aria-label="Name" name="Name" required>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <textarea id="DescriptionBoard" type="text" class="form-control" placeholder="Description" aria-label="Description" name="Description" required></textarea>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" value="Save" class="btn btn-primary" />
                    </div>
                </form>`;
        $("#ModalTitle").text("Edit Board");
        $("#ModalBody").html(text);

        //$('#EditListModal').modal('show');

        document.getElementById("EditBoardKanban").reset();
        KanbanAPI.Methode("GET", "home/Get", data, function (d) {
            console.log(d)
            document.getElementById("NameBoard").value = d.name;
            document.getElementById("DescriptionBoard").value = d.description;
            var newBoard = {
                "Id": d.id,
                "Owner_Id": d.owner_Id
            };
            $("#EditBoardKanban").on("submit", function () {
                $('#EditBoardKanban').serializeArray().map(function (x) { newBoard[x.name] = x.value; });
                console.log(newBoard);
                KanbanAPI.Methode("PUT", "home/Put", newBoard, function (d) {
                    console.log(d);
                    const targetBoard = document.querySelector(`[data-board_id="${BoardId}"]`);
                    targetBoard.querySelector("#BoardTitle").textContent = newBoard.Name;
                    targetBoard.querySelector("#BoardDescription").textContent = newBoard.Description;
                    $('#ModalData').modal('hide');
                });
            });
        });

    }
    static EditProfile(id) {
        let text = "";
        KanbanAPI.Methode("GET", "user/Get", { "id": id }, function (d) {
            console.log(d);
            text += `
            <form id="EditProfile" method="POST" action="javascript:void(0);">
                <div class="text-center mb-3">
                    <!-- Name input -->
                    <div class="row">
                        <div class="col">
                            <div class="form-outline mb-4">
                                <input type="text" class="form-control" placeholder="First Name" aria-label="FirstName" name="FirstName" value="${d.employees.firstName}" required />
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline mb-4">
                                <input type="text" class="form-control" placeholder="Last Name" aria-label="LastName" name="LastName" value="${d.employees.lastName}" required />
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-outline mb-4">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="PhoneNumber" aria-label="PhoneNumber" name="PhoneNumber" value="${d.employees.phoneNumber}" required />
                                    <span class="input-group-text"><i class="fas fa-solid fa-phone"></i></span>
                                </div>
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline mb-4">
                                <div class="input-group date mb-3" id="datepicker">
                                    <input type="text" class="form-control" placeholder="HireDate" aria-label="HireDate" name="HireDate" value="${d.employees.hireDate.split('T')[0]}" required />
                                    <span class="input-group-append">
                                    </span>
                                    <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                                </div>
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-outline mb-4">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Email" aria-label="Email" name="Email" value="${d.employees.email}" required />
                                    <span class="input-group-text"><i class="fas fa-at"></i></span>
                                </div>
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-outline mb-4">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Salary" aria-label="Salary" name="Salary" value="${d.employees.salary}" required />
                                    <span class="input-group-text"><i class="far fa-money-bill-alt"></i></span>
                                </div>
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                    </div>

                    <div class="form-outline mb-4">
                        <div class="input-group mb-3">
                            <select class="form-select" placeholder="Jobs" name="Job_Id" id="JobEditProfile" required />
                            <option selected>Please select jobs</option>
                            </select>
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></i></span>
                        </div>
                        <div class="invalid-feedback">Please chosee.</div>
                    </div>
                    <div class="form-outline mb-4">
                        <div class="input-group mb-3">
                            <select class="form-select" placeholder="Departments" name="Department_Id" id="DepartmentsEditProfile" required />
                            <option selected>Please select departments</option>
                            </select>
                            <span class="input-group-text"><i class="fas fa-building"></i></i></span>
                        </div>
                        <div class="invalid-feedback">Please chosee.</div>
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary btn-block mb-3 opacity-75">Save</button>
                    </div>

            </form>`;
            $("#ModalTitle").text("Edit Profile");
            $("#ModalBody").html(text);
            $('#datepicker').datepicker({
                format: 'yyyy-mm-dd'
            });
            document.getElementById("EditProfile").reset();
            KanbanAPI.Methode("GET", "jobs/GetAll", {}, function (jobs) {
                $("#JobEditProfile").empty()
                $.each(jobs, function () {
                    if (this.id == d.employees.job_Id) {
                        $("#JobEditProfile").append($("<option selected='selected'/>").val(this.id).text(`${this.jobTitle}`));
                    } else {
                        $("#JobEditProfile").append($("<option />").val(this.id).text(`${this.jobTitle}`));
                    }
                });
                KanbanAPI.Methode("GET", "departments/GetAll", {}, function (departments) {
                    $("#DepartmentsEditProfile").empty()
                    $.each(departments, function () {
                        if (this.id == d.employees.department_Id) {
                            $("#DepartmentsEditProfile").append($("<option selected='selected'/>").val(this.id).text(`${this.name}`));
                        } else {
                            $("#DepartmentsEditProfile").append($("<option />").val(this.id).text(`${this.name}`));
                        }
                    });
                    $("#EditProfile").on("submit", function () {
                        //PUT Employees
                        var newProfile = {
                            "Id": d.employees.id
                        };
                        $('#EditProfile').serializeArray().map(function (x) { newProfile[x.name] = x.value; });
                        newProfile["Department_Id"] = parseInt(newProfile["Department_Id"]);
                        newProfile["Job_Id"] = parseInt(newProfile["Job_Id"]);
                        newProfile["Salary"] = parseInt(newProfile["Salary"]);
                        console.log(newProfile);
                        KanbanAPI.Methode("PUT", "Employees/Put", newProfile, function (d) {
                            console.log(d);
                            if (d == 200) {
                                KanbanAPI.UpdateProfileHTML(newProfile);
                                $('#ModalData').modal('hide');
                                Swal.fire(
                                    'Succes !',
                                    'Succes edit profile !',
                                    'success'
                                );
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Pless reach out the web owner!',
                                });
                            }
                        });
                    });
                });
            });
        });
    }
    static UpdateProfileHTML(newProp) {
        
        KanbanAPI.Methode("GET", "jobs/Get", { "id": newProp.Job_Id}, function (jobs) {
            KanbanAPI.Methode("GET", "departments/Get", { "id": newProp.Department_Id }, function (departments) {
                var imageProfileInitial = KanbanAPI.putImageName(newProp.FirstName + " " + newProp.LastName);
                document.querySelector("#profileImagePage").textContent = imageProfileInitial;
                document.querySelector("#profilFullname").textContent = newProp.FirstName + " " + newProp.LastName;
                document.querySelector("#profilPhonenumber").textContent = newProp.PhoneNumber;
                document.querySelector("#profilHiredate").textContent = String(moment(newProp.HireDate.split("T")[0]).format('MMMM Do YYYY'));
                document.querySelector("#profilEmail").textContent = newProp.Email;
                //salary
                var bilangan = newProp.Salary;

                var reverse = bilangan.toString().split('').reverse().join(''),
                    ribuan = reverse.match(/\d{1,3}/g);
                ribuan = ribuan.join('.').split('').reverse().join('');

                document.querySelector("#profilSalary").textContent = "Rp. " + ribuan;
                document.querySelector("#profilJob").textContent = jobs.jobTitle;
                document.querySelector("#profilDepartment").textContent = departments.name;
            });
        });
        
    }
}