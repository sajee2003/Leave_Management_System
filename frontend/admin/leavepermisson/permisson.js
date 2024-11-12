(function () {
    // URL for the mock JSON API
    const apiUrl = 'http://localhost:3000/leaveRequests';
    const employess = "http://localhost:3000/employees"
    const employeeleaves = "http://localhost:3000/employeeleaves"

    let employeeleavedatas = []
    let employeedatas = []
    let leaveRequests = []


    let employees = []

    let leavecount = []
    let emleavecount = []



    let employeeleave = []
    let type = null




    // const fetchemployeeLeaveData = async () => {
    //     const response7 = await fetch(employeeleaves);
    //     leavecount = await response7.json();
    //     console.log(leavecount)
    //     // renderEmployees();

    // }





    const fetchLeavesdata = async () => {
        const response = await fetch(apiUrl);
        leaveRequests = await response.json();
        console.log(leaveRequests)
        // renderEmployees();
        getpendingleaves()

    }

    const fetchemployeesdata = async () => {
        const response3 = await fetch(employess);
        employeedatas = await response3.json();
        console.log(employeedatas)
        // renderEmployees();
        // getpendingleaves()

    }

    const fetchemployeeleavedata = async () => {
        const response5 = await fetch(employeeleaves);
        employeeleavedatas = await response5.json();
        console.log(employeeleavedatas)
        // renderEmployees();
        // getpendingleaves()

    }


    window.getpendingleaves = () => {
        employees = leaveRequests.filter(emp => emp.status == "pending");
        console.log(employees)

        display()
    };



    function display() {

        console.log("hi")

        const cardContainer = document.getElementById('card-container')
        console.log(cardContainer)
        console.log(employees)
        employees.forEach(element => {

            let dataemployeeId = element.employeeId
            console.log(dataemployeeId)

            let data = element.id
            console.log(data)

            console.log(employeedatas)
            let employee1 = []
            employee1 = employeedatas.find(emp => emp.employeeId == dataemployeeId);
            console.log(employee1)

            let dty = employee1.id
            console.log(dty)

            if (!dty) { // Check if element is null or undefined
                return; // Skip this iteration and continue to the next one
            }

            //
            console.log(employeeleavedatas)

            employeeleave = employeeleavedatas.find(emp => emp.employeeId == dataemployeeId);
            console.log(employeeleave)

            let dtyle = employeeleave.id
            console.log(dtyle)

            // get(dataemployeeId) 

            // async function get (dataemployeeId) {

            //     const response11 = await fetch(`http://localhost:3001/employees?employeeId=${dataemployeeId}`);
            //     employeesee11 = await response11.json();
            //     console.log(employeesee11)

            // }



            //Create a card for each leave request
            const card = document.createElement('div');
            card.classList.add('card');

            let employeesee = null
            async function set(dty, dtyle) {

                console.log(dtyle)
                console.log(dty)
                const response2 = await fetch(`${employess}/${dty}`);
                employeesee = await response2.json();

                const response8 = await fetch(`${employeeleaves}/${dtyle}`);
                employeeseellee = await response8.json();

                // const response5 = await fetch(`${employess}/${dty}`);
                // employeesee = await response5.json();

                console.log(employeesee)
                console.log(employeeseellee)
                console.log(employee1)
                console.log(employeesee.name)

                console.log(element.applicationDate)
                console.log(employeesee.role)
                console.log(employeesee.role)


                type = element.type

                card.innerHTML = `
                    <div class="card-header">
                        <div class="profile">
                            <div class="profile-img"></div>
                            <div>
                                <h4>${employeesee.name}</h4>
                                <p>${employeesee.role}</p>
                            </div>
                        </div>
              <p class="date">${element.applicationDate}</p>
                    </div>
                    <div class="date-range">
                        <div class="date-box"><strong>${element.dateFrom.split(" ")[0]}</strong></div>
                        <div class="arrow">→</div>
                        <div class="date-box"><strong>${element.dateto.split(" ")[0]}</strong></div>
                        <p class="days"> ${element.numOfDays} days</p>
                    </div>
                    <div class="leave-info">
                        <p><strong>${element.type}</strong></p>
                        <p>${element.reason}</p>
                    </div>
                    <p class=" Casual Leaves leaves-available">${employeeseellee.casualLeaves} Leaves Available</p>
                    <p class=" Stick leaves-available">${employeeseellee.sickLeaves} Leaves Available</p>
                    <div class="actions">
                    <button class="approve" onclick="approveRequest('${element.id}')">Approve</button>
                    <button class="reject" onclick="rejectRequest('${element.id}')">Reject</button>
                    </div>

                `;

                cardContainer.appendChild(card);
            }


            set(dty, dtyle)
            //  console.log(employeesee)










            // const fetchEmployees = async (dty) => {
            //     const response2 = await fetch(`${employess}/${dty}`);
            //     let emp = await response2.json();
            //     console.log(emp)
            //     //renderEmployees();
            // };

            //fetchEmployees(dataemployeeId)


        });

    }





    window.rejectRequest = async (dt) => {
        console.log(dt)
        
        await fetch(`${apiUrl}/${dt}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status:"reject"
            })

        })
        .then(response => response.json())
        .then(data => console.log("Request rejected:", data))
        .catch(error => console.error("Error rejecting request:", error));




        // emleavecount = leavecount.find(emp => emp.employeeId == dataemployeeId);
        // console.log(emleavecount)






    }

    window.approveRequest = async (dt) => {
        console.log(dt)
        // console.log(type)
        // console.log(days)
        // console.log(dtyle)


        let employeesee3 = []
        const response9 = await fetch(`${apiUrl}/${dt}`);
        employeesee3 = await response9.json();
        console.log(employeesee3)
        console.log(employeesee3.type)
        console.log(employeesee3.numOfDays)
        console.log(employeesee3.employeeId)
        let type = employeesee3.type
        let days = employeesee3.numOfDays


        let employeeleave2 = []
        employeeleave2 = employeeleavedatas.find(emp => emp.employeeId == employeesee3.employeeId);
        console.log(employeeleave2)
        console.log(employeeleave2.id)
        console.log(employeeleave2.sickLeaves)
        console.log(employeeleave2.earnedleave)
        console.log(employeeleave2.casualLeaves)



        let emleavecountid = employeeleave2.id
        let emleavecountcasual = employeeleave2.casualLeaves
        let emleavecountsick = employeeleave2.sickLeaves
        let emleavecountearn = employeeleave2.earnedleave

        let earnleave = employeeleave2.earnedleave

        if (type == "Casual leave") {
            console.log("hi")

            let finalcasuAL = emleavecountcasual - days
            if (finalcasuAL < 0) {


                earnleave = emleavecountearn + -(finalcasuAL)
                finalcasuAL = 0

            }

            await fetch(`${employeeleaves}/${emleavecountid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    casualLeaves: finalcasuAL,
                    earnedleave: earnleave

                })

            })
                .then(response => response.json())
                .then(data => console.log("Request rejected:", data))
                .catch(error => console.error("Error rejecting request:", error));


        } 
        else 
        {

            let finalsick = emleavecountsick - days
            if (finalsick < 0) {


                earnleave = emleavecountearn + -(finalsick)
                finalsick = 0

            }


            await fetch(`${employeeleaves}/${emleavecountid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sickLeaves: finalsick,
                    earnedleave: earnleave
                })

            })
                .then(response => response.json())
                .then(data => console.log("Request rejected:", data))
                .catch(error => console.error("Error rejecting request:", error));



        }




        await fetch(`${apiUrl}/${dt}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status:"confirm"
            })

        })
        .then(response => response.json())
        .then(data => console.log("Request rejected:", data))
        .catch(error => console.error("Error rejecting request:", error));




        emleavecount = leavecount.find(emp => emp.employeeId == dataemployeeId);
        console.log(emleavecount)






    }

    // function rejectRequest(id) {
    //     alert(`Leave Rejected for request ID: ${id}`);
    // }


    fetchemployeeleavedata()
    fetchemployeesdata()
    fetchLeavesdata()

    console.log("hi")

})(); 