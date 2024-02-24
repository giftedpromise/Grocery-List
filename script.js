const databaseURL = "https://grocery-list-fc939-default-rtdb.firebaseio.com/";

const inputFieldEl = document.getElementById("inputTitle");
const inputAmountEl = document.getElementById("inputAmount");
const inputQuantityEl = document.getElementById("quantity");
const addItemBtnEl = document.getElementById("item-btn");
const listEl = document.getElementById("list");
const totalAmountEl = document.getElementById("totalAmountSect");

// Array to store all subtotal amounts
const itemsArray = [];
let itemId = 0; // Variable to assign unique IDs to each item

addItemBtnEl.addEventListener("click", function (event) {
  event.preventDefault();

  const itemName = inputFieldEl.value.trim();
  const amount = parseFloat(inputAmountEl.value) || 0; // Parse as float or default to 0
  const quantity = parseInt(inputQuantityEl.value) || 1; // Parse as integer or default to 1

  // Check if all required fields are filled
  if (!itemName || isNaN(amount) || isNaN(quantity)) {
    alert("Please fill in all required fields.");
    return;
  }

  // Calculate total amount for the item
  const subTotalAmount = amount * quantity;

  // Add the item to the array
  const newItem = {
    id: itemId++,
    name: itemName,
    quantity: quantity,
    subTotal: subTotalAmount,
  };

  itemsArray.push(newItem);

  // Update the total amount in the UI
  updateTotalAmount();

  // Add the item to the list
  addItemToList(newItem);

  // Clear input fields
  inputFieldEl.value = "";
  inputAmountEl.value = "";
  inputQuantityEl.value = "1";
});

function updateTotalAmount() {
  // Calculate the total amount from the itemsArray
  const newTotalAmount = itemsArray.reduce(
    (acc, item) => acc + item.subTotal,
    0
  );

  // Display the updated total amount in the UI
  totalAmountEl.textContent = `₦ ${newTotalAmount.toFixed(2)}`;
}
function addItemToList(newItem) {
  // Create a new list item
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", newItem.id); // Set the data-id attribute

  listItem.innerHTML = `
    <span class="descriptionInput">${newItem.name}</span>
    <span class="qty">${newItem.quantity}</span>
    <span class="subTotal">${newItem.subTotal.toFixed(2)}</span>
    <button class="btnDelete">X</button>
  `;

  // Append the list item to the transaction history list
  listEl.appendChild(listItem);
}

listEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDelete")) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    deleteItem(itemId);
  }
});

function deleteItem(id) {
  console.log("Deleting item with ID:", id);

  // Remove the item from the array based on the provided ID
  const indexToRemove = itemsArray.findIndex((item) => item.id == id);
  console.log("Index to remove:", indexToRemove);

  if (indexToRemove !== -1) {
    itemsArray.splice(indexToRemove, 1);
  }

  // Update the total amount in the UI
  updateTotalAmount();

  // Remove the item from the list
  const listItem = document.querySelector(`li[data-id="${id}"]`);
  if (listItem) {
    listItem.remove();
  } else {
    console.log("List item not found:", id);
  }
}

listEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDelete")) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    deleteItem(itemId);
  }
});
