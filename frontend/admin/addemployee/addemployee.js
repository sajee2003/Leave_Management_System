(function () {

    const apiUrl = "http://localhost:3000/employees";
    const userApiUrl = "http://localhost:3000/users";
    const emleaves = "http://localhost:3000/employeeleaves"

    let employees = [];

    let editingEmployeeId = null;
    let ee = null



    const employeeForm = document.getElementById('employeeForm');
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];

    // Fetch Employees
    const fetchEmployees = async () => {
        const response = await fetch(apiUrl);
        employees = await response.json();
        renderEmployees();
    };


    const renderEmployees = () => {
        employeeTable.innerHTML = "";
        employees.forEach((employee) => {


            const row = employeeTable.insertRow();
            row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.nic}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td>${employee.joinDate}</td>
            <td>${employee.role}</td>
            <td>
                <button class="edit" onclick="editEmployee('${employee.employeeId}')">Edit</button>
                <button class="delete" onclick="deleteEmployee('${employee.employeeId}')">Delete</button>
            </td>
        `;
        });
    };

    document.getElementById("addEmployeeBtn").onclick = () => {
        openEmployeeModal();
    };

    const employeeModal = document.getElementById('employeeModal');

    const openEmployeeModal = (employee = null) => {
        employeeModal.style.display = "block";


        const modalTitle = document.getElementById("modalTitle");
        const saveButton = document.getElementById("saveButton");
        if (employee) {
            modalTitle.innerText = "Edit Employee";
            saveButton.innerText = "Update";

            const employeeIdInput = document.getElementById('employeeId');
            document.getElementById("employeeId").disabled = true;
            const nameInput = document.getElementById('firstName');
            const nicInput = document.getElementById('nic');
            const dobInput = document.getElementById('dob');
            const emailInput = document.getElementById('email');
            const joinDateInput = document.getElementById('joinDate');
            const roleInput = document.getElementById('role');
            roleInput.addEventListener('change', function() {
                const selectedOption = roleInput.value;
               if(selectedOption==""){
                alert("select promotion or not")
               }
            });
            const role1 = document.getElementById('role1');
            const role2 = document.getElementById('role2');


            employeeIdInput.value = employee.employeeId
            nameInput.value = employee.name
            nicInput.value = employee.nic
            dobInput.value = employee.dob
            emailInput.value = employee.email
            joinDateInput.value = employee.joinDate

            role1.textContent = "Current Position - " + employee.role
            role2.textContent = "Upgraded : "

            editingEmployeeId = employee.employeeId;
            ee = employee.id
            console.log(employeeIdInput.value)

        }
        else {
            employeeForm.reset();
            modalTitle.innerText = "Add Employee";
            saveButton.innerText = "Save";
            editingEmployeeId = null;
        }
    };

    // // Close Modal
    document.querySelectorAll(".close").forEach(btn => {
        btn.onclick = () => {
            employeeModal.style.display = "none";
            credentialsModal.style.display = "none";
        };
    });


    // Function to generate unique EMP ID
    const generateEmpId = () => {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let empId;
        do {
            empId = 'EMP_' + Array.from({ length: 5 }, () =>
                characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        } while (employees.some(emp => emp.empId === empId));
        return empId;
    };

    // Save Employee

    document.getElementById('employeeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        //const empId = editingEmployeeId;
       

        const employeeIdInput = editingEmployeeId || generateEmpId();
        const nameInput = document.getElementById('firstName');
        const nicInput = document.getElementById('nic');
        const dobInput = document.getElementById('dob');
        const emailInput = document.getElementById('email');
        const joinDateInput = document.getElementById('joinDate');
        const roleInput = document.getElementById('role');

        const employeeData = {

            employeeId: employeeIdInput,
            name: nameInput.value,
            nic: nicInput.value,
            dob: dobInput.value,
            email: emailInput.value,
            joinDate: joinDateInput.value,
            role: roleInput.value
        };

        // console.log(editingEmployeeId)
        // console.log(ee)
        if (editingEmployeeId) {
            // Update employee
            await fetch(`${apiUrl}/${ee}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeData)
            });
            //    const url  =  await fetch(`${apiUrl}/${editingEmployeeId}`)
            //    console.log(url)

            //         .then(data => console.log(data))
            //         .catch(error => {
            //             console.error(error);
            //             // Optionally, show a user-friendly message here
            //         });

        } else {

            // Create new employee
            await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeData)
            });

            let casualLeavescount = 46
            let sickLeavesscount = 20
            let earnedleavescount = 0
            let today = new Date();
            let formattedDate = today.getFullYear() + '-'
                + String(today.getMonth() + 1).padStart(2, '0') + '-'
                + String(today.getDate()).padStart(2, '0');


            const newlwave = {

                employeeId: employeeIdInput,
                casualLeaves: casualLeavescount,
                sickLeaves: sickLeavesscount,
                earnedleave: earnedleavescount,
                lastdate: formattedDate

            };

            await fetch(emleaves, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newlwave)
            });

            console.log(formattedDate)
             employeeModal.style.display = "none";
           fetchEmployees();
            // await fetchUsers(); // To refresh user data if needed
        };


    })

    // Delete Employee
    window.deleteEmployee = async (empId) => {
        const employee = employees.find(emp => emp.employeeId === empId)
        ee = employee.id
        console.log(ee)
        if (confirm("Are you sure you want to delete this employee?")) {
            await fetch(`${apiUrl}/${ee}`, {
                method: "DELETE"
            });
            // await fetch(`${userApiUrl}/${empId}`, {
            //     method: "DELETE"
            // });
            showToast("Deleted Successfully");
            await fetchEmployees();
        }
    };
    // Edit Employee
    window.editEmployee = (empId) => {
        const employee = employees.find(emp => emp.employeeId === empId);
        openEmployeeModal(employee);
    };
    // Open Credentials Modal
    // window.editCredentials = (empId) => {
    //     const user = users.find(usr => usr.employeeId === empId);
    //     if (user) {
    //         credentialsModal.style.display = "block";
    //         credentialsForm.username.value = user.username;
    //         credentialsForm.password.value = user.password;
    //         credentialsForm.userrole.value = user.role;
    //         credentialsForm.credentialsEmpId.value = user.employeeId;
    //     }
    // };
    // Save Credentials
    // credentialsForm.onsubmit = async (e) => {
    //     e.preventDefault();
    //     const userData = {
    //         username: credentialsForm.username.value,
    //         password: credentialsForm.password.value,
    //         role: credentialsForm.userrole.value,
    //         employeeId: credentialsForm.credentialsEmpId.value
    //     };
    //     const user = users.find(usr => usr.employeeId === userData.employeeId);
    //     if (user) {
    //         await fetch(`${userApiUrl}/${user.id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(userData)
    //         });
    //     } else {
    //         await fetch(userApiUrl, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(userData)
    //         });
    //     }
    //     credentialsModal.style.display = "none";
    //     await fetchUsers();
    // };
    // Show Toast
    // const showToast = (message) => {
    //     toast.innerText = message;
    //     toast.classList.add("show");
    //     setTimeout(() => {
    //         toast.classList.remove("show");
    //     }, 3000);
    // };
    // Search Employees
    document.getElementById("searchInput").oninput = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredEmployees = employees.filter(emp => {
            return emp.nic.toLowerCase().includes(query) ||
                emp.name.toLowerCase().includes(query)

        });
        console.log(filteredEmployees)
        renderFilteredEmployees(filteredEmployees);
    };
    const renderFilteredEmployees = (filteredEmployees) => {
        employeeTable.innerHTML = "";
        filteredEmployees.forEach((employee) => {


            const row = employeeTable.insertRow();
            row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.nic}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td>${employee.joinDate}</td>
            <td>${employee.role}</td>
            <td>
                <button class="edit" onclick="editEmployee('${employee.employeeId}')">Edit</button>
                <button class="delete" onclick="deleteEmployee('${employee.employeeId}')">Delete</button>
            </td>`


        })

    };
    // Initialize
    fetchEmployees();






})();  
