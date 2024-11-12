(function () {

    const baseUrl = "http://localhost:3000/leaveRequests";
    const leavesdata = "http://localhost:3000/employeeleaves";


    let leavesdatas = [];
    let allemrequestdatas = []

    let count = 0;
    let set = null;
    let findprofileemployeeleavesdatasId = null

    let user = JSON.parse(localStorage.getItem('loggedInUser'))
    console.log(user)

    const fetchEmployeesleavedata = async () => {
        const response = await fetch(leavesdata);
        leavesdatas = await response.json();
        console.log(leavesdatas)

        getEmployee(user)

    };


    async function fetchLeaveData(findprofileemployeeleavesdatasId) {
        console.log(findprofileemployeeleavesdatasId)
        const response2 = await fetch(`${leavesdata}/${findprofileemployeeleavesdatasId}`);
        const data = await response2.json();
        console.log(data)


        let casAv = data.casualLeaves;
        let sicAv = data.sickLeaves;
        let earLe = data.earnedleave;


        document.getElementById('leaves-Casualavailable').innerText = `${casAv}\nCasual Leaves Available Total of 46`;
        document.getElementById('leaves-Sickavailable').innerText = `${sicAv}\n Sick Leaves Available Total of 20`;
        document.getElementById('leaves-extrataken').innerText = `${earLe}\nLeaves Taken`;
        document.getElementById('leaves-year').innerText = "This Year";
    }



    // document.getElementById("from-date").addEventListener("change", calculateLeaveDays);
    document.getElementById("to-date").addEventListener("change", calculateLeaveDays);

    function calculateLeaveDays() {
        const fromDate = document.getElementById("from-date").value;
        const toDate = document.getElementById("to-date").value;

        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        if (endDate > startDate) {
            countLeaveDays(startDate, endDate)

            function countLeaveDays(startDate, endDate) {

                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    // Check if the current day is not Saturday (6) or Sunday (0)
                    const dayOfWeek = currentDate.getDay();
                    if (dayOfWeek !== 6 && dayOfWeek !== 0) {
                        count++;
                    }
                    // Move to the next day
                    currentDate.setDate(currentDate.getDate() + 1);

                }
                console.log(count)
                console.log(15 >count > 10)
                if (15 >count > 10) {
                    alert("you can take  10 days  leaves more 10 days salay cut on extra days ")
                    // document.getElementById('leave-form').reset()
                   

                }else if (count>15)
                {
                    alert("you can not take more 15 days ")
                  document.getElementById('leave-form').reset()
                    count = 0
                }
                document.getElementById('no-of-days').value = count

                set = true;
                return count;



            }
        } else {
            alert("check Dates")
            document.getElementById('leave-form').reset()
        }
    }
    // Submit leave application to JSON server
    document.getElementById('leave-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(set)

        let today = new Date();
        let formattedDate = today.getFullYear() + '-'
            + String(today.getMonth() + 1).padStart(2, '0') + '-'
            + String(today.getDate()).padStart(2, '0');

        if (set) {

            const leaveData = {
                employeeId: user,
                dateFrom: document.getElementById('from-date').value,
                dateto: document.getElementById('to-date').value,
                numOfDays: document.getElementById('no-of-days').value,
                applicationDate:formattedDate,
                type: document.getElementById('leave-type').value,
                reason: document.getElementById('reason').value,
                status: "pending"



            };

            await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leaveData),
            });
            alert("Leave application submitted successfully!");
            document.getElementById('leave-form').reset();

        }

    });




    window.getEmployee = (user) => {
        console.log(user)
        console.log(leavesdatas)
        const findprofileemployeeleavesdatas = leavesdatas.find(emp => emp.employeeId == user);
        // console.log(leavesdatas)

        console.log(findprofileemployeeleavesdatas)
        findprofileemployeeleavesdatasId = findprofileemployeeleavesdatas.id
        console.log(findprofileemployeeleavesdatasId)

        fetchLeaveData(findprofileemployeeleavesdatasId);
    };

    fetchEmployeesleavedata();

    // showTab('applyLeave');

    document.getElementById('btnintial').onclick = function () {
        document.getElementById('applyLeave').style.display = 'block';

    };

    document.getElementById('btnsecond').onclick = function () {
        document.getElementById('applyLeave').style.display = 'none';
        document.getElementById('leaveStatus').style.display = 'block';
        fetchEmployeesrequestdata()
    };

 


    const fetchEmployeesrequestdata = async () => {

        const response12 = await fetch(baseUrl);
        allemrequestdatas = await response12.json();
        console.log(allemrequestdatas)

        const filteredrequestdatas = allemrequestdatas.filter(emp => emp.employeeId == user);

        const employeerequestTable = document.getElementById('employeerequestTable').getElementsByTagName('tbody')[0];
        employeerequestTable.innerHTML = "";
        filteredrequestdatas.forEach((employee) => {


            const row = employeerequestTable.insertRow();
            row.innerHTML = `
                <td>${employee.employeeId}</td>
                <td>${employee.dateFrom}</td>
                <td>${employee.dateto}</td>
                <td>${employee.numOfDays}</td>
                 <td>${employee.applicationDate}</td>
                <td>${employee.type}</td>
                <td>${employee.reason}</td>
                <td>${employee.status}</td>
                  `


        })


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



    };





})();  
