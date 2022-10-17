
// ------- Enable Popover-----
const list = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
list.map((el) => {
    let opts = {
        animation: false,
    }
    if (el.hasAttribute('data-bs-content-id')) {
        opts.content = document.getElementById(el.getAttribute('data-bs-content-id')).innerHTML;
        opts.html = true;
    }
    new bootstrap.Popover(el, opts);
});

// ------- Enable tooltip-----
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

/*===== Sidebar navigation enable =====*/
const SideBarCollapse = document.querySelectorAll("#ifBoardSelect");
console.log(SideBarCollapse);
function SideBarSetCollapse() {
    if (SideBarCollapse) {
        SideBarCollapse.forEach((l) => l.classList.remove("collapse"));
    }
}
function SideBarUnSetCollapse() {
    if (SideBarCollapse) {
        SideBarCollapse.forEach((l) => l.classList.add("collapse"));
    }
}

const linkColor = document.querySelectorAll(".sidebar__inner li a");
console.log(linkColor);
function GoToUri(uri) {
    window.location = uri;
}
function colorLink(root) {
    if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        if (root!=null) {
            root.classList.add("active");
        } else {
            this.classList.add("active");
        }
        //root.dataset.link
    }
}
linkColor.forEach((l) => l.addEventListener("click", function () {
    colorLink(this);
    GoToUri(this.dataset.link)
} ));


$(document).ready(function () {
    console.log(window.location.pathname);
    if (window.location.pathname =="/list") {
        boardChossen = document.querySelector("#GoToBoard");
        boardChossen.setAttribute('data-link', `/list`)
        colorLink(boardChossen);
    }
   
    // var ProfilName = $('#ProfilName').text();
    var ProfilName = "Muhammad Amin Abdullah";
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
    var profileImage = $('#profileImage').text(intials);
    var profileImageMember = $('#profileImageMember').text(intials);
    // ------- popover-----

    $(".hamburger .hamburger__inner").click(function () {
        $(".wrapper").toggleClass("active")
    })

    $(".top_navbar .fas").click(function () {
        $(".profile_dd").toggleClass("active");
    });
})


//CRUD
function EditList(ListId) {
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
    $("#ModalTitle").text("Edit");
    $("#ModalBody").html(text);

    //$('#EditListModal').modal('show');
    document.getElementById("EditColumnKanban").reset();
    $("#EditColumnKanban").on("submit", function(){
        Methode("GET", "list/Get", data, function (d) {
            var newList = {
                "Id": d.id,
                "Board_Id": d.board_Id,
                "Order": d.order
            };
            $('#EditColumnKanban').serializeArray().map(function (x) { newList[x.name] = x.value; });
            Methode("PUT", "list/Put", newList, function (d) {
                //processing the data
                UpdateList(newList);
                $('#ModalData').modal('hide');
            });
        });
    });

    alert("You want to edit list Id : " + ListId);
}

function Methode(TypeMethode, requestUri, BodyData = null, callback) {
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
function UpdateList(newList) {
    const targetColumn = document.querySelector(`[data-list_id="${newList.Id}"]`);
    targetColumn.querySelector("#ColumnTitle").textContent = newList.Name;
}