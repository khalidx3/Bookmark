//Refractor the code so that it uses .addEventListner() when you click the SAVE INPUT button

//create two variable
//myLeads-> should be assinged to an empty array
// inputEL-> should be assigned to the text input field
let myLeads = [];
const inputEL = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
//Grab the unordered list and store it in a const variable called ulEl
const ulEl = document.getElementById("ul-el");

// Get the leads from the localStorage
// Store it in a variable, leadsFromLocalStorage
// Store the delete button in a deleteBtn variable
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//Grab the SAVE TAB button and store it in a tabBtn variable
let tabBtn = document.getElementById("tab-btn");

//check if leadsFromLocalStorage is truthy
//If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//Listen for clicks on tabBtn. Log per's LinkedIn URL to the console.

tabBtn.addEventListener("click", function () {
  //Grab the url of the current tab
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //Save the url instead of loging in out
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//Log out the items in the myLeads array using a for loop
//Render the leads in the unordered list using ulEl.innerhtml
//Create a varible,listItems, to hold all the HTML for list items
//Assign it to an empty string to begin with

//Wrap the code below in a renderLeads() function
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //Add the item to the listItems variable instead of the ulEl.innerHTML
    //Wrap the lead in an anchor tag (<a>) inside the <li>
    //Can you make the link open in a new tab?
    //listItems+= "<li><a target= '_blank' href = '"+ myLeads + "'>" + myLeads[i] + "</a></li> "
    //Refactor the code below to use a template string
    listItems += `<li>
      <a target= '_blank' href = '${leads} '> ${leads[i]}</a>
      </li> `;
  }
  //Render the listItem inside the unorderd list using ulEl.innerhtml
  ulEl.innerHTML = listItems;
}

//Listen for double clicks on the delete button (google it)
// when clicked, clear localStorage, myLeads and the DOM
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputbtn.addEventListener("click", function () {
  //Push the value from the inputEl into the myLeads array
  myLeads.push(inputEL.value);
  //clear out the inputfiled
  inputEL.value = "";
  //Save the myLeads array to localstorage
  //ps: remember Json.stringyfy
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});





