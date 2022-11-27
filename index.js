import { menuArray } from "./data";

const menu = document.getElementById("menu")

function renderMenu(){
    let displayHtml = ''
    menuArray.forEach(function(item){
        let menuHtml = `
        <section class="food-wrapper">
            <div class="food-container">
                <img src="${item.emoji}" alt="${item.name}">
                <div class="food-details mg-rg-auto">
                    <h4 class="food-name">${item.name}</h4>
                    <p class="food-ingredients mg-top-rm">${item.ingredients}</p>
                    <p class="food-price">$${item.price}</p>
                </div>
                <div class="add-order-btn">
                    <i class="fa-thin fa-plus"></i>
                </div>
            </div>
        </section>
        `
        displayHtml += menuHtml
    })
    menu.innerHTML = displayHtml
}

renderMenu()