let pizzacontainer = document.querySelector('#pizzacontainer');
let wishlist = [];

if(!localStorage.getItem("basket")){
   localStorage.setItem("basket", JSON.stringify([]));
}

if(!localStorage.getItem("wishlist")){
  localStorage.setItem("wishlist", JSON.stringify([]));
}else{
  wishlist = JSON.parse(localStorage.getItem("wishlist"));
}


axios("https://66d6a9fc006bfbe2e64e1410.mockapi.io/Pizza").then((res) =>
  showData(res.data)
);

function showData(data) {
  let singleCard = data.map((pizza) => {
    console.log(wishlist.includes(+pizza.id) ? "fa-solid": "fa-regular");

    return(
    `<div class="card" style="width: 18rem;">
    <img src=${pizza.img} class="card-img-top" style={{height: '40px'}}>
    <div class="card-body">
    <h5 class="card-title">${pizza.name}</h5>
    <p class="card-text">${pizza.desc}</p>
    <p>${pizza.price.md} ₼</p>
    <button class="btn btn-danger" onclick="addBasket(${pizza.id})">Add to Cart</button>
    <span onclick="toggleWishlist(${pizza.id})"><i id = "heart-${pizza.id}" class="${wishlist.includes(+pizza.id) ? "fa-solid": "fa-regular"} fa-heart" style="font-size: 25px; color:red; cursor:pointer"></i></span>
    </div>
    </div>`
    )});
    let cards = document.createElement('div');
    pizzacontainer.appendChild(cards);
    cards.innerHTML = singleCard.join("");
}

function addBasket(id){
      console.log(id);
      let basket = JSON.parse(localStorage.getItem("basket"));
      let item = basket.find(item => item.id == id);
      if(!item){
        basket.push({id, quantity: 1});
      }else{
        item.quantity++
      }

      localStorage.setItem("basket", JSON.stringify(basket));
}

function toggleWishlist(id){
  let heart = document.querySelector(`#heart-${id}`);
  console.log(id);

  if(!wishlist.includes(id)){
     wishlist.push(id);
     heart.classList.add("fa-solid");
     heart.classList.remove("fa-regular");
  }else{
     wishlist = wishlist.filter(item => item !== id);
     heart.classList.add("fa-regular");
     heart.classList.remove("fa-solid");
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}