let links = document.querySelector(".nav-links");
let subnav = document.querySelector(".sub-navs");
let icon = document.querySelector(".icon-dropdown");
var cards = document.querySelector(".cards");
let cartbtn = document.querySelector(".cart-btn");
let closebtn =  document.querySelector(".close-cart");
let clrbtn = document.querySelector(".clr-cart");
let cart = document.querySelector(".cart-products");
let cartoverlay = document.querySelector(".cart-overlay");
let cartitem = document.querySelector(".cart-item");
let cartfooter = document.querySelector(".cart-footer");
let cartbox = document.querySelector(".cart-box");
let side = document.querySelector(".menus");
let cartID = 1;

icon.addEventListener('click',()=>{
side.classList.toggle("toggle");
})

cartbtn.addEventListener('click',()=>{
  cartoverlay.classList.add("show");
  cart.classList.add("show");
  })

  closebtn.addEventListener('click',()=>{
    cartoverlay.classList.remove("show");
    cart.classList.remove("show");
    })

function Show() {
    links.classList.add("nav-show");
    subnav.classList.add("active");
    document.getElementById('overlay').style.display = 'block';
}

function Hide() {
    links.classList.remove("nav-show");
    subnav.classList.remove("active");
    document.getElementById('overlay').style.display = 'none';
}



// eventListeners();

// function eventListeners(){
//     window.addEventListener('DOMContentLoaded', () => {
//         products();
//     });

//   }

  cards.addEventListener('click', purchaseProduct);
  cartfooter.addEventListener('click', deleteAllProduct);
 cartbox.addEventListener('click',removeitem);
  // function products(){
  
var data= fetch("products.json")
.then(response => {
   return response.json();
})

.then(data =>
  {

      const trend = data.products.filter(product => product.category === "trend");
   
        trend.forEach(trending =>
        {
          var card = ` <article class="card">
          <div class="card-box">
          <img src="${trending.image}" alt="camera" class="img">
          <div class="text">
              <div class="name">${trending.title}</div>
              <h6 class="topic">${trending.price}</h6>  
          </div>
      </div>
          <div class="product-cart">
            <a class="search-cart"</a>
              <a class="bag-btn"><i class="icon-shoppingcart" ></i></a>
              <a class="analytics"></a>
              </div>
      </article>`
      cards.innerHTML += card
      })
    


  })


function purchaseProduct(e){
  if(e.target.classList.contains('icon-shoppingcart')){
    
      let product = e.target.parentElement.parentElement.parentElement;
      let productInfo = {
        id: cartID,
        image: product.querySelector('.img').src,
        title: product.querySelector('.name').textContent,
  
        price: product.querySelector('.topic').textContent
    }
    cartID++;
    addToCartList(productInfo);

  }
}


function addToCartList(product){
 
  const cartItem = document.createElement('div');
    cartItem.classList.add('cart-content');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `  
    <div class="cart-item">
    <img src="${product.image}" alt="laptop">
    <div>
        <div class="name">${product.title}</div>
        <h6 class="topic">${product.price}</h6>
        <span class="remove-item">Remove</span>
    </div> `;

    cartbox.appendChild(cartItem);
    alert(`Product Added Successfully`);
  cartupdate();
}


function deleteAllProduct(e){

  if(e.target.classList.contains('clr-cart')){
    cartbox.remove();
    cartupdate();
  }
}

function removeitem(e){

  if(e.target.classList.contains('remove-item')){
      let item = e.target;
      alert(`Do you want to remove Item ?`);
      item.parentElement.parentElement.remove();
      cartupdate();
   
}
}
function cartupdate() {

   
    var cartRows = document.getElementsByClassName('cart-item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('topic')[0].textContent
        var price = parseFloat(priceElement.replace('$', ''))
        total = total + (price)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total')[0].innerText =   total
    document.getElementsByClassName('cart-count')[0].innerText = cartRows.length
}

