function putImageName(Name) {
    var ProfilName = Name;
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
//Topnav function
const topNav = document.querySelectorAll(".menu .right_menu ul li a");
topNav.forEach((l) => l.addEventListener("click", function () {
    GoToUri(this.dataset.link)
}));

//Sidebar function
const linkColor = document.querySelectorAll(".sidebar__inner li a");

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
    document.querySelector("#profileImageTopNav").textContent = putImageName(sessionStorage.getItem("LoginName"));
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
    if (window.location.pathname.includes("/Home") || window.location.pathname.includes("/home")) {
        boardChossen = document.querySelector("#GoToHome");
        boardChossen.setAttribute('data-link', `/home/index`)
        colorLink(boardChossen);
    }
    if (window.location.pathname.includes("/list") || window.location.pathname.includes("/List")) {
        boardChossen = document.querySelector("#GoToBoard");
        boardChossen.setAttribute('data-link', `/list`)
        colorLink(boardChossen);
    }
    if (window.location.pathname.includes("/invitedmembers") || window.location.pathname.includes("/InvitedMembers")) {
        boardChossen = document.querySelector("#GoToInvitation");
        boardChossen.setAttribute('data-link', `/invitedmembers/index`)
        colorLink(boardChossen);
    }
    if (window.location.pathname.includes("/Card") || window.location.pathname.includes("/card")) {
        boardChossen = document.querySelector("#GoToTimeline");
        boardChossen.setAttribute('data-link', `/card`)
        colorLink(boardChossen);
    }
   
    // ------- popover-----

    $(".hamburger .hamburger__inner").click(function () {
        $(".wrapper").toggleClass("active")
    })

    $(".top_navbar .fas").click(function () {
        $(".profile_dd").toggleClass("active");
    });
})

