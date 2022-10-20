import KanbanAPI from "./api/KanbanApi.js";

var dataUser = {
    "id": parseInt(sessionStorage.getItem("LoginUserId"))
};

KanbanAPI.Methode("GET", "user/Get", dataUser, function (d) {

    var imageProfileInitial = KanbanAPI.putImageName(d.employees.firstName + " " + d.employees.lastName);
    document.querySelector("#profileImagePage").textContent = imageProfileInitial;
    document.querySelector("#profilUsername").textContent = d.userName;
    document.querySelector("#profilFullname").textContent = d.employees.firstName + " " + d.employees.lastName;
    document.querySelector("#profilPhonenumber").textContent = d.employees.phoneNumber;
    document.querySelector("#profilHiredate").textContent = String(moment(d.employees.hireDate.split("T")[0]).format('MMMM Do YYYY'));
    document.querySelector("#profilEmail").textContent = d.employees.email;

    //salary
    var bilangan = d.employees.salary;

    var reverse = bilangan.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');

    document.querySelector("#profilSalary").textContent = "Rp. " + ribuan;
    document.querySelector("#profilJob").textContent = d.employees.jobs.jobTitle;
    document.querySelector("#profilDepartment").textContent = d.employees.departments.name;
    document.querySelector("#profileEditPage").addEventListener("click", () => {
        KanbanAPI.EditProfile(d.id);
    });
    document.querySelector("#accountEdit").addEventListener("click", () => {
        KanbanAPI.EditUserName(d.id);
    });
    document.querySelector("#ChangePWProfile").addEventListener("click", () => {
        KanbanAPI.ChangePassword(d.id);
    });
});