const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

// document.addEventListener("DOMContentLoaded", (event) => {
//   // const welcomeHeading = document.getElementById("admin_greet");
//   // welcomeHeading.textContent = `Welcome ${capitalizeFirstLetter(loggedInUser.username)}`;
//  // showDashboard();
//   //document.getElementById("btn_dashboard").addEventListener("click", showDashboard);

//   //checkAndUpdateOverdueMembers();

//   window.onload = function() {
//     loadContent("addemployee/em.html","addemployee/em.js");  // Default to Task page
//   };

//   document.getElementById("btn_tasks").addEventListener("click", function(){
//     loadContent("addemployee/em.html","addemployee/em.js");
//   });
  
//   document.getElementById('btn_notifications').addEventListener('click', function () {
//     loadContent("leave/rr.html","leave/rr.js");
//   });

//   // document.getElementById('btn-user-reports').addEventListener('click', function () {
   
//   //   loadContent("reports/member-report/member-report.html","reports/member-report/member-report.js");
//   // });
  
//   // document.getElementById('btn-payment-reports').addEventListener('click', function () {
//   //   loadContent("reports/payment-report/payment-report.html","reports/payment-report/payment-report.js");
//   // })
  
//   // document.getElementById('btn-training-reports').addEventListener('click', function () {
//   //   loadContent("reports/training-report/training-programe-report.html","reports/training-report/training-report.js");
//   // });

// })


// // function showDashboard() {
// //   loadContent("","");
// // }

// function loadContent(htmlPath, scriptPath){
//   fetch(htmlPath)
//   .then((response) => {
//     console.log(`Fetched ${htmlPath}:, ${response}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.text();
//   })
//   .then((data) => {
//     console.log("HTML content:", data);
//     document.querySelector("#main-content").innerHTML = data;
//     const script = document.createElement("script");
//     script.src = scriptPath;
//     document.body.appendChild(script);
//   })
//   .catch((error) => {
//     console.log(`Error loading ${htmlPath}:, ${error}`);
//   })

// }


// main.js

// Function to load HTML content from an external file
function loadPage(page) {
  const mainContent = document.getElementById('main-content');

console.log(mainContent)
  // Use fetch to load the external HTML content
  fetch(page)
      .then(response => response.text())  // Get the text from the response
      .then(data => {
          // Inject the loaded content into the main content area
          console.log(mainContent)
          mainContent.innerHTML = data;

          // After loading the content, load the corresponding JS file
          if (page === 'addemployee/addemployee.html') {
              loadScript('addemployee/addemployee.js');
          } else if (page === 'leavepermisson/permisson.html') {
              loadScript('leavepermisson/permisson.js');
          }
      })
      // .catch(error => {
      //     console.log('Error loading page:', error);
      // });
}

// Function to dynamically load a JS script
function loadScript(scriptUrl) {
  const scriptElement = document.createElement('script');
  scriptElement.src = scriptUrl;
//  console.log(scriptElement)
  document.body.appendChild(scriptElement);
 //console.log(document.body)

}

// Add event listeners for sidebar links to switch between pages
document.getElementById('btn_tasks').addEventListener('click', function() {
  loadPage('addemployee/addemployee.html');  // Load the Task page
});

document.getElementById('btn_notifications').addEventListener('click', function() {
  loadPage('leavepermisson/permisson.html');  // Load the Notification page
});

// Optionally, load the Task page by default when the page first loads
window.onload = function() {
  loadPage('leavepermisson/permisson.html');  // Default to Task page
};
