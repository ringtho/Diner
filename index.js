import { menuArray } from "./data";
let orderArr = []

document.addEventListener('click', function(e){
    if (e.target.dataset.addorder){
        handleAddOrderClick(e.target.dataset.addorder)
    }
    else if (e.target.id === 'order-btn'){
        handleCompleteOrder()    
    }
    else if (e.target.id === 'pay-btn'){
        handlePayment()
        
    } else if (e.target.id === 'remove-btn'){
        handleRemoveItem()
    }
})

function handleAddOrderClick(menuId){
    let totalPrice = 0
    const menuObj = menuArray.filter(function(item){
        return item.id == menuId
    })[0]

    orderArr.push({name: menuObj.name, price: menuObj.price})

    let orderHtml = ``
    for (let order of orderArr){
        orderHtml += `
        <div class="order-container" id="order-container">
            <h4 class="food-name">${order.name}</h4>
            <small class="remove-btn verdana mg-rg-auto" id="remove-btn">remove</small>
            <p class="food-price">$${order.price}</p>
        </div>
        `
        totalPrice += order.price
    }

    const priceHtml = `
    <h4 class="total-price mg-rg-auto">Total Price:</h4>
    <p class="food-price">$${totalPrice}</p>
    `
    document.getElementById("food-order-container").classList.remove("hidden")
    document.getElementById("orders").innerHTML = orderHtml
    document.getElementById("total-price").innerHTML = priceHtml
    
}

function handleCompleteOrder(){
    document.getElementById('modal').classList.remove('hidden')
}

function handlePayment(){
    document.getElementById('food-order-container').classList.add('hidden')
    document.getElementById('modal').classList.add('hidden')
    document.getElementById('thank-you').classList.remove('hidden')
}

function handleRemoveItem(){
    console.log("We shall soon remove an item...")
}

function getMenu(){
    let menuHtml = ``

    menuArray.forEach(function(item){
        menuHtml += `
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
    })

    const orderHtml = `
    <section class="food-order-container hidden" id="food-order-container">
        <h3 class="order-header">Your Order</h3>
        <div class="orders" id="orders">
        </div>
        <div id="total-price" class="price-container">
        </div>
        <button id="order-btn" class="verdana">Complete order</button>
    </section>
        
    `

    const thankYouHtml = `
    <section class="hidden" id="thank-you">
        <div class="thank-you">
            <h4>Thanks James! Your order is on its way!</h4>
        </div>
    </section>
    `
    const displayHtml = `
        ${ menuHtml }
        ${ orderHtml }
        ${ thankYouHtml }

    `
    return displayHtml
}

function renderMenu(){
    document.getElementById("menu").innerHTML = getMenu()
}

renderMenu()
