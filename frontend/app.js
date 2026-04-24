const API = "https://project-food-backend-w4nh.onrender.com";

let cart = [];

/* LOAD MENU */
async function loadMenu(){
  const res = await fetch(API + "/menu");
  const data = await res.json();

  document.getElementById("menu").innerHTML =
    data.map(i => `
      <div>
        <h3>${i.name}</h3>
        <p>${i.price}</p>
        <button onclick='add("${i.name}",${i.price})'>Add</button>
      </div>
    `).join("");
}

/* ADD CART */
function add(name, price){
  cart.push({name, price});
  render();
}

/* RENDER CART */
function render(){
  document.getElementById("cart").innerHTML =
    cart.map(i => `<li>${i.name}</li>`).join("");
}

/* CHECKOUT */
async function checkout(){
  await fetch(API + "/order", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({items: cart})
  });

  cart = [];
  render();
  loadOrders();
}

/* LOAD ORDERS */
async function loadOrders(){
  const res = await fetch(API + "/orders");
  const data = await res.json();

  document.getElementById("orders").innerHTML =
    data.map(o =>
      `<li>${o.items.map(i=>i.name).join(", ")} - ${o.status}</li>`
    ).join("");
}

loadMenu();
loadOrders();