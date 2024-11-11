


document.addEventListener('DOMContentLoaded', () => {



    const signinModal = document.getElementById('signin-modal');
    const signupModal = document.getElementById('signup-modal');

    const signinBtn = document.getElementById('signin-btn');
    const signupBtn = document.getElementById('signup-btn');

    const signinClose = document.getElementById('signin-close');
    const signupClose = document.getElementById('signup-close');

    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    signinBtn.addEventListener('click', () => openModal(signinModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));

    signinClose.addEventListener('click', () => closeModal(signinModal));
    signupClose.addEventListener('click', () => closeModal(signupModal));

    window.addEventListener('click', (event) => {
        if (event.target === signinModal) {
            closeModal(signinModal);
        }
        if (event.target === signupModal) {
            closeModal(signupModal);
        }
    });


    signinForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const employeeId = document.getElementById('signin-username').value;
        const password = document.getElementById('signin-password').value;

        try {

            if ((employeeId == "admin123") || (password == "ad123")) {

              localStorage.setItem('loggedInUser', JSON.stringify('loggedInUser'));
                window.location.href ="admin/landingpage.html";
            }

            else {
                const response = await fetch(`http://localhost:3001/users?employeeId=${employeeId}&password=${password}&_embed=employee`);

                    
                const users = await response.json();
                console.log(users);



                if (users.length > 0) {
                    const user = users[0];
                    console.log(user);


                    if (user) {
                        console.log(user);
                        console.log(user.employeeId)

                        let loggedInUser =user.employeeId
                       localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  window.location.href = "employee/createleave/leaverequest.html";

                    } else {
                        alert('Employee data not found.');
                    }
                } else {
                    alert('Invalid username or password.');
                }


            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in.');
        }

    });





    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const employeeId = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const nic = document.getElementById('signup-nic').value;

        const re = await
            fetch(`http://localhost:3001/employees?employeeId=${employeeId}`);

        if (re) {
            const newsignup = {
                employeeId,
                password,
                nic
            };
            console.log(newsignup)
            try {
                const response = await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newsignup)
                });

                alert('success')
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred .');
            }

        } else {
            alert('yor profile not created by admin')
        }


    });


});
