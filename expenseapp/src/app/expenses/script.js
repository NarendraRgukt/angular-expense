// Sample data for expenses (you can replace this with your backend data)
const expensesData = [
  {
    id: 1,
    name: "Expense 1",
    category: "Category A",
    date: "2023-07-20",
    amount: 100,
    updated_at: "2023-07-25",
    created_by: "me",
  },
  { id: 2, name: "Expense 2", category: "Category B", date: "2023-07-18", amount: 30, updated_at: "2023-07-19", created_by: "user2@example.com" },
  { id: 3, name: "Expense 3", category: "Category c", date: "2023-07-17", amount: 40, updated_at: "2023-07-19", created_by: "user3@example.com"},
  // Add more expenses here
];

// Function to display expenses in the table
function displayExpenses() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  const dateFilter = document.getElementById("date-picker").value;
  const searchInput = document.getElementById("search-input").value.toLowerCase();

  expensesData.forEach((expense) => {
      if ((dateFilter === "" || expense.date === dateFilter) &&
          (searchInput === "" || expense.name.toLowerCase().includes(searchInput))) {
          const row = tableBody.insertRow();
          row.innerHTML = `
              <td>${expense.name}</td>
              <td>${expense.category}</td>
              <td>${expense.date}</td>
              <td>${expense.amount}</td>
              <td>${expense.updated_at}</td>
              <td>${(expense.created_by === "me") ? "me" : expense.created_by}</td>
              <td>
                  ${(expense.created_by === "me") ?
                      `<span class="edit-btn" onclick="editExpense(${expense.id})">&#9998;</span>` : ""}
                  ${(expense.created_by === "me" || isAdmin()) ?
                      `<span class="delete-btn" onclick="deleteExpense(${expense.id})">&#128465;</span>` : ""}
              </td>
          `;
      }
  });
}

// Function to simulate checking if the user is an admin (you need to implement your own authentication mechanism)
function isAdmin() {
  return true; // Replace this with your authentication logic
}

// Function to handle the edit expense modal
function editExpense(expenseId) {
  // Implement your modal logic here for editing an expense
  // You can use a library like Bootstrap Modal or create your own custom modal.
}

// Function to handle deleting an expense
function deleteExpense(expenseId) {
  const confirmation = confirm("Are you sure you want to delete this expense?");
  if (confirmation) {
      // Implement your logic here to delete the expense (e.g., make an API call to the backend)
      // After successful deletion, you may want to refresh the table by calling displayExpenses() again.
  }
}

// Event listeners for date filter and search input
document.getElementById("date-picker").addEventListener("change", displayExpenses);
document.getElementById("search-input").addEventListener("keyup", displayExpenses);

// Initial display of expenses
displayExpenses();
