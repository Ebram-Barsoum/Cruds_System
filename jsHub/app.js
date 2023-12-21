let productName = document.getElementById("product-name");
let productPrice = document.getElementById("product-price");
let productCategory = document.getElementById("product-category");
let productDescription = document.getElementById("product-description");
let searchInput = document.getElementById("search-input");

let addBtn = document.getElementById("add-btn");
let updateBtn = document.getElementById("update-btn");
let closePopupBtn = document.getElementById("close-popup-btn");
let newProductBtn = document.getElementById("new-product-btn");

let validName = (validPrice = validCategory = validDescription = true);
let products = [];
let indexToBeUpdated;
let row = document.getElementById("products");

// displaying products in the web page
function display_products(list) {
  let content = ``;

  for (let index = 0; index < list.length; index++) {
    let customBg = "";
    if (index % 2 == 0) customBg = "bg-info-subtle";

    content += `
        <tr class="bg-info-subtle">
            <td>${index + 1}</td>
            <td>${list[index].name}</td>
            <td>${list[index].price}</td>
            <td>${list[index].category}</td>
            <td>${list[index].description}</td>
            <td><button class="btn btn-warning" onclick=prepare_date(${index}) data-bs-toggle="modal" data-bs-target="#product-info"><i class="fa-regular fa-pen-to-square"></i></button></td>
            <td><button class="btn btn-danger " onclick="delete_product(${index})"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>
        `;
  }

  row.innerHTML = content;
}

// handling adding product
newProductBtn.onclick = function () {
  if (addBtn.classList.contains("d-none")) {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
};
function add_product() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  products.push(product);
  window.localStorage.setItem("products", JSON.stringify(products));
}
addBtn.onclick = function () {
  if (!validName || !validPrice || !validCategory || !validDescription) return;
  add_product();
  display_products(products);
  clear_inputs();
};

// handling deleting product
function delete_product(index) {
  if (confirm("Sure, You want to delete this product")) {
    products.splice(index, 1);
    window.localStorage.setItem("products", JSON.stringify(products));
    display_products(products);
  }
}

//handling clearing inputs from the data
function clear_inputs() {
  let inputs = document.querySelectorAll("input");
  let sz = inputs.length;
  for (let index = 0; index < sz; index++) {
    inputs[index].value = "";
    inputs[index].classList.remove("is-valid", "is-invalid");
  }
}

// handling search input
function search(searchValue) {
  let searchedList = [];

  for (let index = 0; index < products.length; index++) {
    if (
      products[index].name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      searchedList.push(products[index]);
    }
  }

  display_products(searchedList);
}
searchInput.oninput = function () {
  let searchValue = searchInput.value;
  search(searchValue);
};

// handling updating a product
function prepare_date(index) {
  if (updateBtn.classList.contains("d-none")) {
    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
  }

  indexToBeUpdated = index;

  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productCategory.value = products[index].category;
  productDescription.value = products[index].description;
}
updateBtn.onclick = function () {
  if (!validName || !validPrice || !validCategory || !validDescription) return;
  products[indexToBeUpdated].name = productName.value;
  products[indexToBeUpdated].price = productPrice.value;
  products[indexToBeUpdated].category = productCategory.value;
  products[indexToBeUpdated].description = productDescription.value;

  clear_inputs();
  display_products(products);
  window.localStorage.setItem("products", JSON.stringify(products));
};
closePopupBtn.onclick = function () {
  clear_inputs();
};

// inputs validation
let nameRegEx = /^[A-Z]\w{1,6}$/;
let priceRegEx = /([7-9]\d{3,4}|[1-6]\d{4}|(100000))/g;
let categoryRegEx = /^\w{2,7}$/i;
let descriptionRegEx = /^[\w.]{4,15}$/i;

function validate_input(input, regEx) {
  if (regEx.test(input.value)) {
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.add("is-invalid");
    return false;
  }
}

productName.addEventListener("input", function () {
  productName.classList.remove("is-valid");
  productName.classList.remove("is-invalid");

  validName = validate_input(productName, nameRegEx);
});

productPrice.oninput = function () {
  productPrice.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");

  validPrice = validate_input(productPrice, priceRegEx);
};

productCategory.oninput = function () {
  productCategory.classList.remove("is-valid");
  productCategory.classList.remove("is-invalid");

  validCategory = validate_input(productCategory, categoryRegEx);
};

productDescription.oninput = function () {
  productDescription.classList.remove("is-valid");
  productDescription.classList.remove("is-invalid");

  validDescription = validate_input(productDescription, descriptionRegEx);
};

// retrieving data from local storage
function initialize() {
  if (window.localStorage.getItem("products") != null) {
    products = JSON.parse(window.localStorage.getItem("products"));
    display_products(products);
  }
}
initialize();
