let tbody = document.querySelector('table tbody');
let wishlist = [];

if(!localStorage.getItem("wishlist")){
    localStorage.setItem("wishlist", JSON.stringify([]));
}else{
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
}

function show(){
    wishlist.forEach(async function(item){
     let res = await axios(`https://66d6a9fc006bfbe2e64e1410.mockapi.io/Pizza/${item}`);
     let pizza = res.data;
     let row = document.createElement('tr');
     row.classList.add('product');
     row.innerHTML = `
        <th>${item}</th>
        <td>${pizza.name}</td>
        <td>${pizza.price.md} ₼</td>
        <td class="text-center">
        <button class = "btn btn-danger delete">
        <i class="fa-solid fa-trash"></i>
        </button>
        </td>`
     tbody.appendChild(row);

     row.querySelector(".delete").addEventListener('click', function(){
             deleteItem(item,row);
     })

    })
}


function deleteItem(id, row){
     wishlist = wishlist.filter(fav => fav !== id);

     localStorage.setItem("wishlist", JSON.stringify(wishlist));

     row.remove();


}

show();