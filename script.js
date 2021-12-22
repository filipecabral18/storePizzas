//Função utilizada para melhorar questões de redundâncias no código.
let modalqt = 1;
let cart = [];
let modalkey = 0;
const qslt = (el) =>document.querySelector(el);
const qsltall = (el) =>document.querySelectorAll(el);


pizzaJson.map((item, index)=>{
    let pizzaItem = qslt('.models .pizza-item').cloneNode(true);
//Essa parte do código faz o povoamneto das DIV's 

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--price'). innerHTML = `R$: ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;    
    pizzaItem.querySelector('.pizza-item--img img').src= item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalqt = 1
        modalkey = key;

        qslt('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qslt('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qslt('.pizzaBig img').src = pizzaJson[key].img;
        qslt('.pizzaInfo--size.selected').classList.remove('selected')
        qslt('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qsltall('.pizzaInfo--size').forEach((size, sizeindex)=>{            
           if(sizeindex == 2){
               size.classList.add('selected')
           }            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeindex]
            
        });

        qslt('.pizzaInfo--qt').innerHTML = modalqt;


        qslt('.pizzaWindowArea').style.opacity = 0
        qslt('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            qslt('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    qslt('.pizza-area').append(pizzaItem);
})

function closeModal(){
    qslt('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qslt('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

qsltall('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

qslt('.pizzaInfo--qtmais').addEventListener('click',()=>{ 
    modalqt ++;
    qslt('.pizzaInfo--qt').innerHTML = modalqt;
    
});

qslt('.pizzaInfo--qtmenos').addEventListener('click',()=>{ 
    if(modalqt > 1){       
        modalqt --;
        qslt('.pizzaInfo--qt').innerHTML = modalqt;
    }
});

qsltall('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        qslt('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});
qslt('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qslt('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalkey].id+"@"+size;
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier
    })

    if(key > -1){
        cart[key].qt += modalqt
    }else{
        cart.push({
            id:pizzaJson[modalkey].id,
            size,
            qt:modalqt
        })
    }    
    closeModal();
    updatecart();
});

qslt('.menu-opnner').addEventListener('click', ()=>{
    
    qslt('aside').style.left = '100ww';
})

qslt('.menu-closer').addEventListener('click', ()=>{
    if(cart.length > 0){
    qslt('aside').style.left = '0';}
})

function updatecart(){
    qslt('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        qslt('aside').classList.add('show');
        qslt('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt;

            let cartitem = qslt('.models .cart--item').cloneNode(true);
            
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'p';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            
            cartitem.querySelector('img').src = pizzaItem.img;
            cartitem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartitem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartitem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                cart[i].qt--;}
                else{
                    cart.splice(i, 1)
                }
                updatecart();
            });

            cartitem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updatecart()
            });


            qslt('.cart').append(cartitem)
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        qslt('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qslt('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qslt('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        qslt('aside').classList.remove('show');
        qslt('aside').style.left = '100vw'
    }
}