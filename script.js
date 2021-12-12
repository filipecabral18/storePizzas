//Função utilizada para melhorar questões de redundâncias no código.
const qslt = (el) =>document.querySelector(el);
const qsltall = (el) =>document.querySelectorAll(el);


pizzaJson.map((item, index)=>{
    let pizzaItem = qslt('.models .pizza-item').cloneNode(true);
//Essa parte do código faz o povoamneto das DIV's 

    pizzaItem.querySelector('.pizza-item--price'). innerHTML = `R$: ${item.price.toFixed(2)}`

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    pizzaItem.querySelector('.pizza-item--img img').src= item.img;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        qslt('.pizzaWindowArea').style.display = 'flex'     
    })
    
    qslt('.pizza-area').append(pizzaItem);
})