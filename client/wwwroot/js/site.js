
// ------- Enable Popover-----


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

