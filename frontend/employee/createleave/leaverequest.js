(function ()  {

    const baseUrl = "http://localhost:3000/leaveRequests"; // Change this to your mock server URL
    const leavesdata = "http://localhost:3000/employeeleaves";


    let leavesdatas = [];
    //leavesdatas =[]
    let count = 0;
    let set = null;
    let user =  JSON.parse(localStorage.getItem('loggedInUser'))
    console.log(user)

    // Show the active tab section
    // function showSection(sectionId) {
    //     const sections = document.querySelectorAll('.leave-application');
    //     const tabs = document.querySelectorAll('.tab');

    //     sections.forEach(section => {
    //         section.style.display = (section.id === sectionId) ? 'block' : 'none';
    //     });

    //     tabs.forEach(tab => {
    //         tab.classList.toggle('active', tab.getAttribute('onclick').includes(sectionId));
    //     });
    // }





    const fetchEmployeesdata = async () => {
        const response = await fetch(leavesdata);
        leavesdatas = await response.json();
        console.log(leavesdatas)
        // renderEmployees();
        getEmployee(user)

        //     //console.log(empId)
        //    // console.log(leavesdatas)
        //     const employee = leavesdatas.find(emp => emp.employeeId == 123);
        //     employeeii =employee.id
        //    // console.log(leavesdatas)
        //     console.log(employee)
        //     const response2 = await fetch(`${leavesdata}/${employee}`);
        //     const data = await response2.json();

    };

    // Fetch leave data from JSON server
    async function fetchLeaveData(findprofileemployeeleavesdatasId) {
        console.log(findprofileemployeeleavesdatasId)
        const response2 = await fetch(`${leavesdata}/${findprofileemployeeleavesdatasId}`);
        const data = await response2.json();


        let casAv =  data.casualLeaves;
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

        if (set) {


        
            const leaveData = {
                employeeId: user,
                dateFrom: document.getElementById('from-date').value,
                dateto: document.getElementById('to-date').value,
                numOfDays: document.getElementById('no-of-days').value,
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

        // Example usage:
        // const startDate = document.getElementById('to-date').value;
        // const endDate = document.getElementById('from-date').value;
        // console.log(countLeaveDays(startDate, endDate)); // Outputs the number of leave days excluding Saturdays and Sundays




        // alert("Leave application submitted successfully!");
        // document.getElementById('leave-form').reset();
    });

    // Initialize default section and fetch data

    //showSection('apply-leave');


    window.getEmployee = (user) => {
        console.log(user)
        console.log(leavesdatas)
        const findprofileemployeeleavesdatas = leavesdatas.find(emp => emp.employeeId == user);
        // console.log(leavesdatas)
        
        console.log(findprofileemployeeleavesdatas)
        let findprofileemployeeleavesdatasId = findprofileemployeeleavesdatas.id
        console.log(findprofileemployeeleavesdatasId)

        fetchLeaveData(findprofileemployeeleavesdatasId);
    };

    fetchEmployeesdata();

})();  
