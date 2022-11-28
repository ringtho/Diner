import { menuArray } from "./data";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
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
        
    } else if (e.target.dataset.removeorder){
        handleRemoveItem(e.target.dataset.removeorder)
    }
})

function handleAddOrderClick(menuId){
    
    const menuObj = menuArray.filter(function(item){
        return item.id == menuId
    })[0]

    orderArr.push(
        {
            name: menuObj.name, 
            price: menuObj.price, 
            id: menuId,
            uuid: uuidv4()
        })
    renderMenu()
    document.getElementById("food-order-container").classList.remove("hidden")
}

function handleCompleteOrder(){
    document.getElementById('modal').classList.remove('hidden')
}

function handlePayment(){
    document.getElementById("food-order-container").classList.add('hidden')
    document.getElementById('modal').classList.add('hidden')
    document.getElementById('thank-you').classList.remove('hidden')
}

function handleRemoveItem(id){
    const orders = orderArr.filter(function(order){
        return order.id != id
    })
    orderArr = orders
    renderMenu()
    document.getElementById("food-order-container").classList.remove('hidden')
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


    let totalPrice = 0
    let orderIter = ``

    orderArr.forEach(function(order){
        orderIter += `
        <div class="order-container" id="order-container">
            <h4 class="food-name">${order.name}</h4>
            <small class="remove-btn verdana mg-rg-auto" data-removeorder="${order.id}" id="remove-btn">remove</small>
            <p class="food-price">$${order.price}</p>
        </div>
        `
        totalPrice += order.price
    })

    const orderHtml = `
    <section class="food-order-container hidden" id="food-order-container">
        <h3 class="order-header">Your Order</h3>
        <div class="orders" id="orders">
            ${orderIter}
        </div>
        <div id="total-price" class="price-container">
            <h4 class="total-price mg-rg-auto">Total Price:</h4>
            <p class="food-price">$${totalPrice}</p>
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
