const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


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
          if (page === 'employeeprofile/emProfile.html') {
              loadScript('employeeprofile/emProfile.js');
          } else if (page === 'createleave/leaverequest.html') {
              loadScript('createleave/leaverequest.js');
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
  console.log(scriptElement)
  document.body.appendChild(scriptElement);
  console.log(document.body)

}

// Add event listeners for sidebar links to switch between pages
document.getElementById('btn_tasks').addEventListener('click', function() {
  loadPage('createleave/leaverequest.html');  // Load the Task page
});

document.getElementById('btn_profile').addEventListener('click', function() {
  loadPage('employeeprofile/emProfile.html');  // Load the Notification page
});

// Optionally, load the Task page by default when the page first loads
window.onload = function() {
  loadPage('employeeprofile/emProfile.html');  // Default to Task page
};
