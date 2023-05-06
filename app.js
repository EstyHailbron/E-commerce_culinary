
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
 let hello = document.querySelector('#hello');
const timeNow = new Date();
if (timeNow.getHours() > 7 && timeNow.getHours() < 13)
    hello.innerHTML = ` ${currentUser.Name} בוקר טוב `;
else if (timeNow.getHours() > 13 && timeNow.getHours() < 17)
    hello.innerHTML = ` ${currentUser.Name} צהריים טובים `;
else if (timeNow.getHours() > 17 && timeNow.getHours() < 22)
    hello.innerHTML = ` ${currentUser.Name} ערב טוב `;
else if (timeNow.getHours() >= 22 || timeNow.getHours() < 7)
    hello.innerHTML = ` ${currentUser.Name} לילה טוב `;
date.innerHTML = `${timeNow.getDay()}/${timeNow.getMonth()}/${timeNow.getFullYear()}`;
hour.innerHTML = `${timeNow.getHours()} :${timeNow.getMinutes()}: ${timeNow.getSeconds()} `;

let users = [];
let ProductsArray = [];
const loadProducts = () => {
    $.ajax({
        method: 'GET',
        url: '/packages.json',
        success: (data) => {
            debugger;
            ProductsArray = data;
            localStorage.setItem('Products', JSON.stringify(ProductsArray));
            debugger;

        }
    });
}


debugger
const search_find = document.querySelector('#search_find');
const label_search = document.querySelector('#label_search');
const search = document.querySelector('.sub');
search.onclick = () => {
    debugger
    loadProducts();
    for (let j = 0; j < ProductsArray.length; j++) {
        if (ProductsArray[j].description.includes(label_search.value)) {
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            let bbutton = document.createElement('button');
            let image = document.createElement('img');
            bbutton.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 3vh; color: white !important; background-color: black !important;border: none;"></i>`;
            bbutton.dataset['value'] = ProductsArray[j].code;
            image.src = ProductsArray[j].path;
            h2.innerHTML = `${ProductsArray[j].description} ${ProductsArray[j].price}₪`;
            bbutton.classList.add('btn');
            div.classList.add('foods');
            bbutton.setAttribute("data-toggle", "modal");
            bbutton.setAttribute("data-target", "#exampleModal");
            div.appendChild(image);
            div.appendChild(h2);
            div.appendChild(bbutton);
            bbutton.onclick = () => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                if (cart.length === 0) {
                    cart = [];
                    cart.push(ProductsArray[j])
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                else {
                    let b = false;
                    for (let j = 0; j < cart.length && b == false; j++) {
                        if (parseInt(cart[j].code) === parseInt(bbutton.dataset['value'])) {
                            cart[j].quantity += 1;
                            b = true;
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }
                    }
                    if (b === false)
                        cart.push(ProductsArray[j]);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

            }
            bbutton.classList.add('hidden');

            search_find.append(div);

        }
    }
}


// סל מוצרים//
let price = 0;
let bagProducts = JSON.parse(localStorage.getItem('cart'));
debugger
const func = (bagProducts) => {
    debugger
    product_container.innerHTML = '';
    for (let i = 0; i < bagProducts.length; i++) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let but = document.createElement('button');
        let img = document.createElement('img');
        h2.innerHTML += bagProducts[i].description + "  " + bagProducts[i].price + "₪" + " כמות :" + bagProducts[i].quantity;
        img.src = bagProducts[i].path;
        but.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        div.append(h2, but, img);
        but.onclick = () => {
            debugger
            if ((parseInt(bagProducts[i].quantity) > 1)) {
                bagProducts = JSON.parse(localStorage.getItem('cart'));
                bagProducts[i].quantity -= 1;

                localStorage.setItem('cart', JSON.stringify(bagProducts));
                func(bagProducts);
            } else {
                bagProducts.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(bagProducts));
                func(bagProducts);
            }
        }
        price += bagProducts[i].price * bagProducts[i].quantity;
        product_container.append(div);
    }
}
loadProducts();
func(bagProducts);
button.append(price);
document.querySelector(".openChatBtn").addEventListener("click", openForm);
document.querySelector(".close").addEventListener("click", closeForm);
function openForm() {
    document.querySelector(".openChat").style.display = "block";
}
function closeForm() {
    document.querySelector(".openChat").style.display = "none";
}

document.querySelector(".btn btn-primary").addEventListener("click", openForm);
document.querySelector(".close").addEventListener("click", closeForm);
function openForm() {
    document.querySelector(".openChat").style.display = "block";
}
function closeForm() {
    document.querySelector(".openChat").style.display = "none";
}

