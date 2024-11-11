
(function ()  {

    
let user =  JSON.parse(localStorage.getItem('loggedInUser'))
console.log(user)

let findprofileemployeedatasId = null

    let employeesUrl = "http://localhost:3000/employees"

    let emdatas =[]

    const fetchEmployeesdata = async () => {
        const response = await fetch(employeesUrl);
       emdatas = await response.json();
        console.log(emdatas)
        getEmployee(user)
    }

    
    window.getEmployee = (user) => {
        console.log(user)
        console.log(emdatas)
        const findprofileemployeesdatas = emdatas.find(emp => emp.employeeId == user);
        // console.log(leavesdatas)
        
        console.log(findprofileemployeesdatas)
           findprofileemployeedatasId = findprofileemployeesdatas.id
        console.log(findprofileemployeedatasId)
        fetchemData(findprofileemployeedatasId)
        
    };


    async function fetchemData(findprofileemployeedatasId) {
        console.log(findprofileemployeedatasId)
        const response2 = await fetch(`${employeesUrl}/${findprofileemployeedatasId}`);
        const emdata = await response2.json();






// Display profile data in edit fields
    document.getElementById("emname").textContent = emdata.name;
    document.getElementById("edit-name").value = emdata.name;
    document.getElementById("emrole").textContent = emdata.role;
    document.getElementById("edit-job").value = emdata.role;
    document.getElementById("edit-age").value = emdata.dob;
    document.getElementById("edit-address").value = emdata.email;
    document.getElementById("edit-nic").value = emdata.nic;
    }

// function editProfile() {
//     displayProfile();
//     document.querySelector(".edit-btn").style.display = "none";
//     document.querySelector(".save-btn").style.display = "inline";
//     document.querySelector(".cancel-btn").style.display = "inline";
// }

// function saveProfile() {
//     profileData.name = document.getElementById("edit-name").value;
//     profileData.job = document.getElementById("edit-job").value;
//     profileData.age = document.getElementById("edit-age").value;
//     profileData.address = document.getElementById("edit-address").value;
//     profileData.nic = document.getElementById("edit-nic").value;

//     editProfile();
//     cancelEdit();
// }

// function cancelEdit() {
//     document.querySelector(".edit-btn").style.display = "inline";
//     document.querySelector(".save-btn").style.display = "none";
//     document.querySelector(".cancel-btn").style.display = "none";
// }



fetchEmployeesdata()
})();  
