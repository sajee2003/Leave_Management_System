(function () {

    const leaveTable = document.getElementById('leaveTable').getElementsByTagName('tbody')[0];
    const leavesUrl = 'http://localhost:3000/leaveRequests';

    let allleaves = []

    const fetchleaves = async () => {
        const response = await fetch(leavesUrl);
        allleaves = await response.json();
        console.log(allleaves)
        renderleaves();
    };


    const renderleaves = () => {
        leaveTable.innerHTML = "";
        allleaves.forEach((employee) => {
            console.log("hi")


            const row = leaveTable.insertRow();
            row.innerHTML = `
              <td>${employee.employeeId}</td>
                <td>${employee.dateFrom}</td>
                <td>${employee.dateto}</td>
                <td>${employee.numOfDays}</td>
                 <td>${employee.applicationDate}</td>
                <td>${employee.type}</td>
                <td>${employee.reason}</td>
                <td>${employee.status}</td>
        `;


        document.querySelectorAll("table tr td").forEach(cell => {

            if (cell.textContent.trim() == "confirm") {

                cell.classList.add("confirm-text")
            } else if (cell.textContent.trim() === "reject") {

                cell.classList.add("reject-text");

            }
              else if (cell.textContent.trim() === "pending")
              {

                cell.classList.add("pending-text");

            }

        });
        });
    };





    // Search Employees
    document.getElementById("searchInput").oninput = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredleaves = allleaves.filter(emp => {
            return emp.employeeId.toLowerCase().includes(query) ||
                emp.status.toLowerCase().includes(query)

        });
        console.log(filteredleaves)
        renderFilteredEmployees(filteredleaves);
    };
    const renderFilteredEmployees = (filteredleaves) => {
        leaveTable.innerHTML = "";
        filteredleaves.forEach((employee) => {


            const row = leaveTable.insertRow();
            row.innerHTML = `
     <td>${employee.employeeId}</td>
                <td>${employee.dateFrom}</td>
                <td>${employee.dateto}</td>
                <td>${employee.numOfDays}</td>
                 <td>${employee.applicationDate}</td>
                <td>${employee.type}</td>
                <td>${employee.reason}</td>
                <td>${employee.status}</td>`
        })

    }

    fetchleaves()
})(); 