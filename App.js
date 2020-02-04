class Product {

    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {

    addProduct(product) {
        const productList = document.getElementById("product-list"); // access product-list
        const element = document.createElement("div"); // create div to show product inside
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product:</strong> ${product.name}
                    <strong>Price:</strong> ${product.price}
                    <strong>Year:</strong> ${product.year}
                    <a href="#" name="delete" class="btn btn-outline-danger ml-1">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element); // append new element to product-list
        // this.resetForm(); // reset form after submit
    }

    resetForm() { // reset data from input fields on submit
        document.getElementById("product-form").reset();
    }

    deleteProduct(element) { //receives e.target
        if (element.name === "delete") { // if clicked element has name="delete" as attribute
            element.parentElement.parentElement.parentElement.remove();
            // remove the whole div, containing div "card", containing "card-body"
            this.showMessage("Product Successfully Deleted", "info");
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-4`; // css classes for div
        div.appendChild(document.createTextNode(message)) // create text for message
            // SHOW IN DOM
        const container = document.querySelector(".container"); // select container
        const app = document.querySelector('#app'); // select all content inside container
        container.insertBefore(div, app); // insert message('div') before content('app')
        setTimeout(function() {
                document.querySelector(".alert").remove(); // remove every element that has 'alert' class
            }, 3000) // hide message, in n miliseconds
    }

}


// DOM Events
document.getElementById("product-form")
    .addEventListener("submit", function(e) {
        //get input data
        const prodName = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const year = document.getElementById("year").value;

        const product = new Product(prodName, price, year); // new product

        const ui = new UI(); // new UI object that allow access to its methods

        // VALIDATE FORM before submit
        if (prodName === '' || price === '' || year === '') {
            return ui.showMessage("Please complete all fields", "danger"); // return stops program flow 
        }

        ui.addProduct(product); // calls addProduct with new product
        ui.resetForm();
        ui.showMessage("Product Successfully Added", "success"); // message for new product added, css/bootstrap class

        e.preventDefault();
    })

document.getElementById("product-list").addEventListener('click', function(e) {
    console.log(e.target); // capture which element is being clicked, to delete
    const ui = new UI();
    ui.deleteProduct(e.target); // pass e.target to UI method
})