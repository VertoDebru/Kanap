/* Global Variables */
const url = "http://localhost:3000/api/products/";
const itemsBox = document.getElementById("cart__items");
const myDivTotalQte = document.getElementById("totalQuantity");
const myDivTotalPrice = document.getElementById("totalPrice");
const btnOrder = document.getElementById("order");
const isOrder = new URLSearchParams(document.location.search).has('firstName');
