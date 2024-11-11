(function () {
    // URL for the mock JSON API
    const apiUrl = 'http://localhost:3000/leaveRequests';
    const employess = "http://localhost:3000/employees"
    const employeeleaves = "http://localhost:3000/employeeleaves"

    let leaveRequests = []

    let employeeleavedatas = []
    let employees = []



    let employeedatas = []





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
            let employeeleave = []
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
                console.log('bh4wgb')
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
                console.log(employeesee.role)
                console.log(employeesee.role)

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










    // // Fetch data from the mock API
    // fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         const cardContainer = document.getElementById('card-container');
    //         data.forEach(request => {
    //             // Create a card for each leave request
    //             const card = document.createElement('div');
    //             card.classList.add('card');

    //             // Fill in card content with data from the JSON API
    //             card.innerHTML = `
    //                 <div class="card-header">
    //                     <div class="profile">
    //                         <div class="profile-img"></div>
    //                         <div>
    //                             <h4>${request.name}</h4>
    //                             <p>${request.role}</p>
    //                         </div>
    //                     </div>
    //                     <p class="date">${request.requestDate}</p>
    //                 </div>
    //                 <div class="date-range">
    //                     <div class="date-box">${request.startDate.split(" ")[0]} <strong>${request.startDate.split(" ")[1]}</strong></div>
    //                     <div class="arrow">→</div>
    //                     <div class="date-box">${request.endDate.split(" ")[0]} <strong>${request.endDate.split(" ")[1]}</strong></div>
    //                     <p class="days">${request.days} days</p>
    //                 </div>
    //                 <div class="leave-info">
    //                     <p><strong>${request.leaveType}</strong></p>
    //                     <p>${request.description}</p>
    //                 </div>
    //                 <p class="leaves-available">${request.leavesAvailable} Leaves Available</p>
    //                 <div class="actions">
    //                     <button class="approve" onclick="approveRequest(${request.id})">Approve</button>
    //                     <button class="reject" onclick="rejectRequest(${request.id})">Reject</button>
    //                 </div>
    //             `;

    //             // Add the card to the card container
    //             cardContainer.appendChild(card);
    //         });
    //     })
    //     .catch(error => console.error('Error fetching data:', error));

    // Functions for Approve and Reject actions


    window.approveRequest = async (data) =>{
        await fetch(`${apiUrl}/${data}`, {
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

    }

    // function rejectRequest(id) {
    //     alert(`Leave Rejected for request ID: ${id}`);
    // }
    fetchemployeeleavedata()
    fetchemployeesdata()
    fetchLeavesdata()

    console.log("hi")

})(); 