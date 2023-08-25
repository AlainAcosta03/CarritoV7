const cards         = document.getElementById('cards')
const items         = document.getElementById('items')
const footer        = document.getElementById('footer')
const templateCard  = document.getElementById('template-card').content
const templateFooter  = document.getElementById('template-footer').content
const templateCarrito  = document.getElementById('template-carrito').content
const fragmento     = document.createDocumentFragment()
//-----------CREACION DEL OBJETO CARRITO
let carrito = {}
document.addEventListener('DOMContentLoaded' ,   () => {
    fetchData()
})
//----------EVENTO ON CLICK
cards.addEventListener('click', e =>{
    addCarrito(e)
})
//--------------CONSUMI DE API RES JSON
const fetchData     = async () => {
    try{
        const   res     = await fetch('api.json')
        const   data   = await res.json()
        console.log(data)
        mostrarProductos(data)
    }catch(error){
        console.log(error)
    }
}
//-----------METODO MOSTRAR PRODUCTOS
const mostrarProductos  = data =>{
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id=producto.id
        const clone = templateCard.cloneNode(true)
        fragmento.appendChild(clone)
    });
    cards.appendChild(fragmento)
}
//--------------METODO ADD CARRITO
const addCarrito = e =>{

    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}
//---------------METODO INICICIALIZAR CARRITO
const setCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    //--------------SI EXISTE EL REGISTRO CON EL ID
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }
    carrito[producto.id] = {...producto}
    mostrarCarrito()
    //console.log(carrito)
}

const mostrarCarrito =() =>{
    items.innerHTML=''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const cloneProducto = templateCarrito.cloneNode(true)
        fragmento.appendChild(cloneProducto)
    })
    items.appendChild(fragmento)
    mostrarFooter()
}
//---------------METODO MOSTRAR PIE DE PAGINA
const mostrarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacio    -   comience a comprar!!</th>
        `
    }
}

