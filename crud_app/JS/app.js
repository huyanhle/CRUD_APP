const apiUrl = "http://localhost/crud_app/api/users/";

// Fetch users
const fetchUsers = async () => {
  const response = await fetch(apiUrl + "read.php");
  const users = await response.json();

  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";

  users.forEach(user => {
    userTable.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};

const searchUsers = async () => {
  const query = document.getElementById("search").value;
  const response = await fetch(apiUrl + "search.php?query=" + query);
  const users = await response.json();

  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";

  users.forEach(user => {
    userTable.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};



// Add user
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(apiUrl + "create.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  document.getElementById("userForm").reset();
  fetchUsers();
});

// Delete user
const deleteUser = async (id) => {
  await fetch(apiUrl + "delete.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  fetchUsers();
};

// Fetch users on page load
fetchUsers();


let currentPage = 1;

const fetchUsersWithPagination = async (page = 1) => {
  const response = await fetch(apiUrl + "paginate.php?page=" + page);
  const data = await response.json();
  const users = data.users;
  const totalPages = data.totalPages;

  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";

  users.forEach(user => {
    userTable.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="btn btn-secondary btn-sm ${i === page ? 'active' : ''}" onclick="fetchUsersWithPagination(${i})">${i}</button>
    `;
  }
};

fetchUsersWithPagination();

