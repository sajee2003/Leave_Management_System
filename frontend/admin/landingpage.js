const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});



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
      else if (page === 'search/search .html') {
        loadScript('search/search.js');
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
document.getElementById('btn_tasks').addEventListener('click', function () {
  loadPage('addemployee/addemployee.html');  // Load the Task page
});

document.getElementById('btn_notifications').addEventListener('click', function () {
  loadPage('leavepermisson/permisson.html');  // Load the Notification page
});

document.getElementById('btn_leaves').addEventListener('click', function () {
  loadPage('search/search .html');  // Load the Notification page
});


//Optionally, load the Task page by default when the page first loads
window.onload = function() {
  loadPage('leavepermisson/permisson.html');  // Default to Task page
};
