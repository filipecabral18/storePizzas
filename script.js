//Função utilizada para melhorar questões de redundâncias no código.
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




        qslt('.pizzaWindowArea').style.opacity = 0
        qslt('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            qslt('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    qslt('.pizza-area').append(pizzaItem);
})