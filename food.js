
let ProductsArray = [];
const prodTemp = [];
const loadProducts = () => {
    $.ajax({
        method: 'GET',
        url: '/packages.json',
        success: (data) => {

            localStorage.setItem('Products', JSON.stringify(data));
            printProducts(data);
            ProductsArray = data;
        }
    });
}

const printProducts = (data) => {
    ProductsArray = data;
    prodTemp.push(ProductsArray);
    const show = document.getElementById("show");
    const category = JSON.parse(sessionStorage.getItem('category'));
    for (let i = 0; i < ProductsArray.length; i++) {
        if (category === ProductsArray[i].name) {
            let div = document.createElement('div');
            div.classList.add('showing');
            let h2 = document.createElement('h2');
            let bbutton = document.createElement('bbutton');
            let image = document.createElement('img');
            bbutton.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 3vh;   color: white;"></i> `;
            bbutton.dataset['value'] = ProductsArray[i].code;
            image.src = ProductsArray[i].path;
            h2.innerHTML = `${ProductsArray[i].description} ${ProductsArray[i].price}₪`;
            bbutton.setAttribute("data-toggle", "modal");
            bbutton.setAttribute("data-target", "#exampleModal");
            div.appendChild(image);
            div.appendChild(h2);
            div.appendChild(bbutton);

            show.append(div);

            bbutton.onclick = () => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                if (cart.length === 0) {
                    cart.push(ProductsArray[i])
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                else {
                    let b = false;
                    for (let j = 0; j < cart.length && b == false; j++) {
                        if (parseInt(cart[j].code) === parseInt(bbutton.dataset['value'])) {
                            cart[j].quantity += 1;
                            b = true;
                        }
                    }
                    if (b === false)
                        cart.push(ProductsArray[i]);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

            }
            bbutton.classList.add('hidden');
        }
    }
}

// search
const search_find = document.querySelector('#search_find');
const triangular = document.querySelector('.triangular');

const search = document.querySelector('.sub');
let b = false;
search.onclick = () => {
    if (b === true)
        return;
    let search_input = document.createElement('input');
    search_input.id = "search_input";
    search_input.type = "text";
    search_input.placeholder = "Search....";
    search_input.name = "search";
    search_input.color = "#FFA234";
    search.append(search_input);
    b = true;
    const prodTemp = [];
    //get data from json and save in localstorage
    const input = document.querySelector('#search_input')
    loadProducts();
    input.onkeyup = (event) => {
        for (let j = 0; j < ProductsArray.length; j++) {
            if (ProductsArray[j].description.includes(input.value)) {
                let div = document.createElement('div');
                div.classList = ("search_food");
                let h2 = document.createElement('h2');
                let bbutton = document.createElement('bbutton');
                let image = document.createElement('img');
                bbutton.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 3vh;   color: white;"></i> `;
                image.src = ProductsArray[j].path;
                h2.innerHTML = `${ProductsArray[j].description} ${ProductsArray[j].price}₪`;
                bbutton.setAttribute("data-toggle", "modal");
                bbutton.setAttribute("data-target", "#exampleModal");
                div.appendChild(image);
                div.appendChild(h2);
                div.appendChild(bbutton);
                search_find.append(div);
            }

        }

    }
}
function set(category) {
    sessionStorage.setItem('category', JSON.stringify(category));

}
let price = 0;
let bagProducts = JSON.parse(localStorage.getItem('cart'));
const func = (bagProducts) => {
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









//chat
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





