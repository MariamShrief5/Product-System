// HTML Elements
var nameInput = document.getElementById("name");
var categoryInput = document.getElementById("category");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var fileInput = document.getElementById("fileInput");
var productContainer = document.getElementById("productContainer");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");


// App Variables

// var productList = JSON.parse(localStorage.getItem("Obj1")) || [];

// Another Way To Do Array with dynamic data from Local Storage

var productList = [];
if(localStorage.getItem("Obj1")!==null){
    productList = JSON.parse(localStorage.getItem("Obj1"));
}

// Functions

function addProduct(){
  if(nameValidation()== true){
    if(isExist() == true){
      document.getElementById("existMes").classList.replace('d-none' , 'd-block');
      clearInputs();
    
     }else{
      document.getElementById("existMes").classList.replace('d-block' , 'd-none');
        var product = {
          name : nameInput.value,
          category : categoryInput.value,
          price : priceInput.value,
          description : descriptionInput.value,
          imagePath : "./assets/images/" + fileInput.files[0].name,
      };
      productList.push(product);
      localStorage.setItem("Obj1" , JSON.stringify(productList));
      displayProduct(productList.length -1);
      clearInputs();
     }
  }
}

function displayProduct(index){
    var productHTML = `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="inner">
                  <picture>
                    <img class="w-100 d-block p-3" src="${productList[index].imagePath}" alt="">
                  </picture>

                  <div class="d-flex justify-content-between align-items-center text-white py-2 px-3">
                    <h2 class="h4">${productList[index].name}</h2>
                    <h4 class="h5">${productList[index].price}$</h4>
                  </div>

                  <div class="d-flex align-items-center text-white py-2 px-3">
                    <i class="fa-solid fa-tag pe-2 fs-6"></i>
                    <h4 class="h6">${productList[index].category}</h4>
                  </div>

                  <p class="text-secondary py-2 px-3">${productList[index].description}</p>
                  <div class="pb-4 ps-3">
                    <button type="button" class="btn btn-outline-warning" onclick="setValue(${index})">Update</button>
                    <button type="button" class="btn btn-outline-danger ms-2" onclick="deleteProduct(${index})">Delete</button>
                  </div>
                </div>
              </div>
    `
    productContainer.innerHTML += productHTML;
}

function displayAllProduct(){
  for(var i = 0 ; i< productList .length ; i++){
    displayProduct(i);
  }
}
displayAllProduct();

function clearInputs(){
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  fileInput.value = null;
}

function deleteProduct(index){
  // 1- Delete Product From ProductList
  productList.splice(index , 1);
  // 2- Delete localstorage Of This ProductList index
  localStorage.setItem("Obj1" , JSON.stringify(productList));
  // 3- 
  productContainer.innerHTML = "";
  // 4- Show all remain products again after deleted product 
  displayAllProduct();
} 

function searchProduct(){
  productContainer.innerHTML = "";
  for(i=0; i<productList.length;i++){
    if(productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      displayProduct(i);
    }
  }
}
  
  var superIndex;
function setValue(index) {
    superIndex = index;
    nameInput.value = productList[superIndex].name;
    categoryInput.value = productList[superIndex].category;
    priceInput.value = productList[superIndex].price;
    descriptionInput.value = productList[superIndex].description;

    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';
}

function updateData() {
  productList[superIndex].name = nameInput.value;
  productList[superIndex].category = categoryInput.value;
  productList[superIndex].price = priceInput.value;
  productList[superIndex].description = descriptionInput.value;

  // Update localStorage
  localStorage.setItem("Obj1", JSON.stringify(productList));

  // Clear the product container and re-display all products
  productContainer.innerHTML = "";
  displayAllProduct();

  // Clear input fields
  clearInputs();

  // Reset button visibility
  addBtn.style.display = 'block';
  updateBtn.style.display = 'none';
}

function isExist(){
  for(i=0; i<productList.length;i++){
    if(nameInput.value == productList[i].name){
      return true;
    }
  }
}

  var nameRegex = /^[A-Z]{1}[a-z]{3,}$/;
function nameValidation(){
  if(nameRegex.test(nameInput.value)){
    document.getElementById("nameValid").innerHTML = "";
    nameInput.classList.add('is-valid');
    nameInput.classList.remove('is-invalid');
    return true;
  }else{
    document.getElementById("nameValid").innerHTML = `Name Must start with Capital Letter <i class="fa-solid fa-circle-exclamation"></i>`;
    nameInput.classList.add('is-invalid');
    nameInput.classList.remove('is-valid');
  }

}
