let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <button class="edit-link" data-index="${i}">Edit</button>
                <button class="copy-link" data-index="${i}">Copy</button>
                <button class="remove-link" data-index="${i}">Delete</button>
                <button class="drag-link" data-index="${i}">Drag</button>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
  addListeners();
}

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function addListeners() {
  {
    const removeLinkBtn = document.querySelectorAll(".remove-link");
    removeLinkBtn.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        console.log(event.target);
        alert("Removed Link");
        const index = event.target.dataset.index;
        removeItem(index);
      });
    });
  }
}

function removeItem(index) {
  //remove index item
  myLeads.splice(index, 1);
  // remove from Local storage (set new array)
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  //console.log index
  console.log(`The index is ${index} `);
  // then just update the page with the modified item list
  render(myLeads);
}
