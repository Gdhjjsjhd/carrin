const products = [ 
    {id: 1,  name: "Porotudo 1", price:50},
    {id: 2,  name: "Porotudo 2", price:30},
    {id: 3,  name: "Porotudo 3", price:15},
]


let cart = [];


function showProducts(){
    document.getElementById('products-tab').style.display = 'block';
    document.getElementById('cart-tab').style.display = 'none';
}

function showCart(){
    document.getElementById('products-tab').style.display = 'none';
    document.getElementById('cart-tab').style.display = 'block'; 
    updateCartDisplay();
}

//função p add aba de carrinho
function addToCart(productId){
    //var produto, find é enontar, adicionamos um parametro
    //e todo vez q esse parametro for substituido com o protudo
    //captura o ID do protudo e add em 'productId'
    const product = products.find((p)  => p.id === productId);
    //função anomnima p verificar s e o item ja existe no carrinho
    const existingProduct = cart.find((item) => item.id === productId);


    //se o item existe apenas aumenta a quantidade dele
    if(existingProduct){
        existingProduct.quantity++
    }else{ //se não, add no carinho
        cart.push({...product, quantity: 1})
    }

        document.getElementById('cart-count').innerHTML = cart.length;
        alert(`${product.name} adicionado ao carrinho!`)
}


function removeFromCart(productId){
    cart = cart.filter((item) => item.id !== productId);
    document.getElementById('cart-count').innerHTML = cart.length;
    updateCartDisplay();
}



//função p atualizar a quantidade de itens diretamente via input
function updateQuantity(productId, newQuantity){
    const productInCart = cart.find((item) => item.id === productId);

    if(productInCart){
        productInCart.quantity = parseInt(newQuantity)
    }

    updateCartDisplay();
}


//atualizar a exibição do carrinho
function updateCartDisplay(){
    const cartItemsContainer = document.getElementById('cart-itens');
    const totalPriceElement = document.getElementById('total-price');

    //limpa o carrinho antes de renderizar
    cartItemsContainer.innerHTML = ''

    if(cart.length === 0){
        cartItemsContainer.innerHTML = '<p>O carrinho está vazio. </p>';
        totalPriceElement.innerText = 'Total R$0,00';
        return;
    }

    let total = 0;
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = 
        `
            <h4> ${item.name}</h4> 
            <p>Preço: R$${item.price.toFixed(2)}</p>

            <label> Quantidade: 
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, tihis.value) ">
            </label>
            
            <button onclick="removeFormCart(${item.id})">
                Remover
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.pice * item.quantity;
    });

    totalPriceElement.innerText = `Total R$${total.toFixed(2)}`;
}


//redenrizar ptoduto
function renderProduto(){
    const productsList = document.getElementById('products-list');

    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        productItem.innerHTML =
        `
            <h3>${product.name}</h3>
            <p>Preço: R$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">

            Adicionar ao Carrinho</button>

        `;

        productsList.appendChild(productItem);
    })
}

document.addEventListener('DOMContentLoaded', renderProduto)

