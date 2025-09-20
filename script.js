const form = document.getElementById("activityForm");
const tableBody = document.querySelector("#recordsTable tbody");

// Load saved data from localStorage
let activities = JSON.parse(localStorage.getItem("activities")) || [];

function renderTable() {
  tableBody.innerHTML = "";
  activities.forEach(activity => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${activity.name}</td>
      <td>${activity.id}</td>
      <td>${activity.type}</td>
      <td>${activity.date}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const activity = {
    name: document.getElementById("studentName").value,
    id: document.getElementById("studentID").value,
    type: document.getElementById("activityType").value,
    date: document.getElementById("activityDate").value
  };
  activities.push(activity);
  localStorage.setItem("activities", JSON.stringify(activities));
  renderTable();
  form.reset();
});

renderTable(); // Initial load
