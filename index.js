import { menuArray } from "./data";

document.addEventListener('click', function(e){
    if (e.target.dataset.addorder){
        handleAddOrderClick(e.target.dataset.addorder)
    }
})

function handleAddOrderClick(menuId){
    console.log("clicked")
}

function getMenu(){
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
                <div class="add-order-btn" data-addorder="${item.id}">
                    <i class="fa-thin fa-plus" data-addorder="${item.id}"></i>
                </div>
            </div>
        </section>
        `
        displayHtml += menuHtml
    })
    return displayHtml
}

function renderMenu(){
    document.getElementById("menu").innerHTML = getMenu()
}

renderMenu()