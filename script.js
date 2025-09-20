const form = document.getElementById("activityForm");
const tableBody = document.querySelector("#recordsTable tbody");

let activities = JSON.parse(localStorage.getItem("activities")) || [];

// Update Stats Cards
function updateStats() {
  document.getElementById("totalStudents").innerHTML =
    new Set(activities.map(a => a.id)).size + "<br><span>Students</span>";
  document.getElementById("totalActivities").innerHTML =
    activities.length + "<br><span>Activities</span>";
  document.getElementById("sportsCount").innerHTML =
    activities.filter(a => a.type === "Sports").length + "<br><span>Sports</span>";
  document.getElementById("culturalCount").innerHTML =
    activities.filter(a => a.type === "Cultural").length + "<br><span>Cultural</span>";
}

// Render Table
function renderTable() {
  tableBody.innerHTML = "";
  activities.forEach((activity, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${activity.name}</td>
      <td>${activity.id}</td>
      <td>${activity.type}</td>
      <td>${activity.date}</td>
      <td><button class="delete-btn" onclick="deleteActivity(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
  updateStats();
}

// Add Activity
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

// Delete Activity
function deleteActivity(index) {
  activities.splice(index, 1);
  localStorage.setItem("activities", JSON.stringify(activities));
  renderTable();
}

// Initial Load
renderTable();
