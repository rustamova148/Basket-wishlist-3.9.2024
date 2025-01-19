let tbody = document.querySelector("table tbody");
let basket = [];
let totalPrice = 0;

if(!localStorage.getItem("basket")){
    localStorage.setItem("basket", JSON.stringify([]))
}else{
    basket = JSON.parse(localStorage.getItem("basket"));
}

function show(){
    totalPrice = 0;
    tbody.innerHTML = "";
    basket.forEach(async function(item){
        try {
        let res = await axios(`https://66d6a9fc006bfbe2e64e1410.mockapi.io/Pizza/${item.id}`);
        let pizza = res.data;
        let itemTotal = item.quantity * pizza.price.md;
        totalPrice += itemTotal;
        document.querySelector('#totalPrice').innerText = totalPrice + ' ₼'; 

        let row = document.createElement('tr');
        row.classList.add('product');
        row.innerHTML = `   
            <th>
            <img src=${pizza.img} style='width: 300px; height: 200px'>
            </th>
            <td>${pizza.name}</td>
            <td>${pizza.price.md} ₼</td>
            <td>${item.quantity}</td>
            <td>${item.quantity * pizza.price.md} ₼</td>
            <td class="text-center">
            <button class = "btn btn-danger delete">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>`
        tbody.appendChild(row);

        row.querySelector('.delete').addEventListener('click', function(){
            deleteItem(item.id, row, itemTotal);
        });
        } catch (error) {
            console.error("error", error)
        }
    })
}


function deleteItem(id, row, itemTotal){
    basket = basket.filter(item => item.id !== id);
    
    localStorage.setItem("basket", JSON.stringify(basket));
    row.remove();
    totalPrice -= itemTotal;
    document.querySelector('#totalPrice').innerText = totalPrice + ' ₼'; 
}
show();

function buy(){
    localStorage.setItem("basket", JSON.stringify([]));
    basket = [];
    totalPrice = 0;
    document.querySelector('#totalPrice').innerText =  0 + " ₼";
    show();
}