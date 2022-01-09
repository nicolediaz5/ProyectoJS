const productos = document.getElementById('productos')
const item = document.getElementById('mangas-elemento')
const mangasFinales = document.getElementById('mangas-finales')
const mangasTemplate = document.getElementById('mangas-card').content
const mangasTotal = document.getElementById('mangas-total').content
const mangasCarrito = document.getElementById('mangas-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('miCarrito')){
carrito = JSON.parse(localStorage.getItem('miCarrito'))//Storage
mostrarCarrito();
    }
})
    productos.addEventListener('click', e =>{
        agregarCarrito(e)
})

item.addEventListener('click', e => {
    btnCambioCantidad(e)
})

const fetchData = async () =>{
    try{
const res = await fetch('api.json')
const data = await res.json()

misProductos(data)
    } catch(error){
        console.log(error);
    }
}

const misProductos = data => {
    data.forEach(producto => {
        mangasTemplate.querySelector('h5').textContent = producto.nombre
        mangasTemplate.querySelector('p').textContent = producto.precio
        mangasTemplate.querySelector('img').setAttribute("src", producto.png)
        mangasTemplate.querySelector('.btn-data').dataset.id = producto.id
        const clone = mangasTemplate.cloneNode(true)
        fragment.appendChild(clone)
    });
    productos.appendChild(fragment)
}
const agregarCarrito = e =>{

    if(e.target.classList.contains('btn-data')){

     setCarrito(e.target.parentElement)
    }
    e.stopPropagation();
}
const setCarrito = objeto => {

const productoMangas = {
    id: objeto.querySelector('.btn-data').dataset.id,
    nombre: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
    
}
if(carrito.hasOwnProperty(productoMangas.id)){
    productoMangas.cantidad = carrito[productoMangas.id].cantidad + 1
}
carrito[productoMangas.id] = {...productoMangas}
mostrarCarrito();
};

 const mostrarCarrito = () =>{
     
     item.innerHTML = ""
     Object.values(carrito).forEach(productoMangas => {
        mangasCarrito.querySelector('th').textContent = productoMangas.id
        mangasCarrito.querySelectorAll('td')[0].textContent = productoMangas.nombre
        mangasCarrito.querySelectorAll('td')[1].textContent = productoMangas.cantidad
        mangasCarrito.querySelector('.btn-data2').dataset.id = productoMangas.id
        mangasCarrito.querySelector('.btn-data3').dataset.id = productoMangas.id
        mangasCarrito.querySelector('span').textContent = productoMangas.cantidad * productoMangas.precio

        const clone = mangasCarrito.cloneNode(true)
        fragment.appendChild(clone)
     });
     item.appendChild(fragment)

     mostrarProductosFinales();

     localStorage.setItem('miCarrito', JSON.stringify(carrito))//Storage
 };

 const mostrarProductosFinales = () =>{
    mangasFinales.innerHTML = ""
    if (Object.keys(carrito).length == 0 ){
        mangasFinales.innerHTML = `<th scope="row" colspan="5">Carrito vacío</th>`
        return;
    }

    const productoCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const productoPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    
    mangasTotal.querySelectorAll('td')[0].textContent = productoCantidad
    mangasTotal.querySelectorAll('span')[0].textContent = productoPrecio
    
    const clone = mangasTotal.cloneNode(true)
    fragment.appendChild(clone)
    mangasFinales.appendChild(fragment)

    const vaciarCarro = document.getElementById('vaciar-carrito')
    vaciarCarro.addEventListener('click', () =>{
        carrito = {}
        mostrarCarrito();
    })

 };

  const btnCambioCantidad = e => {
   
      if (e.target.classList.contains('btn-sumar')){
                const mProducto = carrito[e.target.dataset.id]
          mProducto.cantidad = carrito[e.target.dataset.id].cantidad + 1
          carrito[e.target.dataset.id] = {...mProducto}
          mostrarCarrito();
        
      }
      if (e.target.classList.contains('btn-restar')){
        const mProducto = carrito[e.target.dataset.id]
        mProducto.cantidad = carrito[e.target.dataset.id].cantidad - 1
        carrito[e.target.dataset.id] = {...mProducto}

        if(mProducto.cantidad == 0){
delete carrito[e.target.dataset.id]
        }
        mostrarCarrito();
      }

e.stopPropagation();
  };