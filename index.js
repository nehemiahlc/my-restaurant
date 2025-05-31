
const addPizzaBtn = document.getElementById('add-pizza')
const addHamburgerBtn = document.getElementById('add-hamburger')
const addBeerBtn = document.getElementById('add-beer')
const orderBtn = document.getElementById('btn-order')
const payBtn = document.getElementById('btn-pay')
const preCheckout = document.getElementById('pre-checkout')
const modal = document.getElementById('checkout-payment')
const orderForm = document.getElementById('order-form')
const warning = document.getElementById('warning')


preCheckout.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-order')) {
      modal.style.display = 'block'; 
    }
  
    if (e.target.classList.contains('btn-remove')) {
        const itemContainer = e.target.closest('.ordered-items-container');
        const itemName = itemContainer.querySelector('.ordered-item')
             .childNodes[0].textContent.trim().split(' x')[0];
    
        const index = order.findIndex(item => item.name === itemName);
        if (index !== -1) {
            if (order[index].quantity > 1) {
                order[index].quantity--;
            } else {
                order.splice(index, 1);
            }
            preCheckout.innerHTML = getOrderHtml();
        }
    
        if (order.length < 1) {
            preCheckout.style.display = 'none';
        }
    }

      
    });

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-close')) {
        modal.style.display = 'none'
    }
})


orderForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const orderFormData = new FormData(orderForm)

    const name = orderFormData.get('name')

    modal.style.display = 'none'
    
    preCheckout.innerHTML = `
    <div class='thankyou'>
    <h4> Thanks, ${name}! Your order is on its way!</h4>
    </div>
    `
    order = []

    setTimeout(() => {
        preCheckout.style.display = 'none'
    }, 3000)
    
})


let order = []

addPizzaBtn.addEventListener('click', () => {
   addPizza()
   preCheckout.innerHTML = getOrderHtml()
   
   
    
})
addHamburgerBtn.addEventListener('click', () => {
    addHamburger()
    preCheckout.innerHTML = getOrderHtml()
})
addBeerBtn.addEventListener('click', () => {
    addBeer()
    preCheckout.innerHTML = getOrderHtml()
})




function Food(name, price, quantity = 1){
    this.name = name;
    this.price = price;
    this.quantity = quantity
}

function addItem(name,price) {
    const existing = order.find( item => item.name === name);
    if (existing){
        existing.quantity++
    } else {
        order.push(new Food(name, price));
    }
}

function addPizza() {
    addItem('Pizza', 14);
}

function addHamburger() {
    addItem('Hamburger', 12);
}

function addBeer() {
    addItem('Beer', 12);
}

function getOrderHtml() {
    
    if (order.length > 0) {
        preCheckout.style.display = 'block'
    }

    // **This code will set a limit on the order amount to 4**

    // const isOrderLimitReached = order.length > 3;

    //     addPizzaBtn.disabled = isOrderLimitReached;
    //     addBeerBtn.disabled = isOrderLimitReached;
    //     addHamburgerBtn.disabled = isOrderLimitReached;

    //     const warningHtml = isOrderLimitReached ? `<p class="warning" style="color: red;">
    //     You have reached the order limit</p>` : ''

   
    const itemsHtml = order.map(food => {
        const {
            name,
            price,
            quantity
        } = food;
    
        return `
                <div class="ordered-items-container">
                    <p class="ordered-item">${name}
                        <button class="btn btn-remove">remove</button>
                    </p>
                    <p class='price'>$${price * quantity} x ${quantity}</p>
                </div>
            `
    
        }).join('');

    const orderTotal = order.reduce((total, currentFood) => {
        return total + currentFood.price * currentFood.quantity
    }, 0);

    return  `
    <h4>Your Order</h4>
                
                ${itemsHtml}
                <div class="total-price-container">
                    <p>Total price:</p>
                    <p class="price">$${orderTotal}</p>
                </div>
                <button class="btn btn-order" >Complete order</button>
    `
   
}




    




