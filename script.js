// ==============================
// PRODUCTS
// ==============================

const products = [
{
id:1,
name:"Wireless Headphones",
category:"Electronics",
price:2999,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
},
{
id:2,
name:"Running Shoes",
category:"Shoes",
price:3499,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},
{
id:3,
name:"Smart Watch",
category:"Electronics",
price:5999,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
},
{
id:4,
name:"Backpack",
category:"Accessories",
price:1499,
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
},
{
id:5,
name:"T-Shirt",
category:"Fashion",
price:799,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
},
{
id:6,
name:"Sunglasses",
category:"Accessories",
price:999,
image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
}
];

// ==============================
// ELEMENTS
// ==============================

const productContainer=document.getElementById("product-container");
const search=document.getElementById("search");
const filterButtons=document.querySelectorAll(".filter-btn");

let cart=[];

// ==============================
// DISPLAY PRODUCTS
// ==============================

function displayProducts(items){

productContainer.innerHTML="";

items.forEach(product=>{

productContainer.innerHTML+=`

<div class="product">

<img src="${product.image}"
loading="lazy"
alt="${product.name}">

<div class="product-content">

<h3>${product.name}</h3>

<p>${product.category}</p>

<h2 class="price">
₹${product.price}
</h2>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

displayProducts(products);

// ==============================
// SEARCH
// ==============================

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});

// ==============================
// CATEGORY FILTER
// ==============================

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

const category=button.dataset.category;

if(category==="All"){

displayProducts(products);

}else{

const filtered=products.filter(product=>

product.category===category

);

displayProducts(filtered);

}

});

});

// ==============================
// ADD TO CART
// ==============================

function addToCart(id){

const item=products.find(product=>product.id===id);

cart.push(item);

updateCart();

saveCart();

}

// ==============================
// SAVE LOCAL STORAGE
// ==============================

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

// ==============================
// LOAD LOCAL STORAGE
// ==============================

function loadCart(){

const data=localStorage.getItem("cart");

if(data){

cart=JSON.parse(data);

updateCart();

}

}

loadCart();