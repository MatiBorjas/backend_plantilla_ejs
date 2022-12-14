const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuracion del motor
app.set('view engine', 'ejs');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  res.render('pages/index', { title: 'listado de productos', products: productsHC });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  try {
    let productoEncontrado =  productsHC.find(e => e.id == id);
    
    if(productoEncontrado){
    res.render('pages/unProducto', {producto: productoEncontrado, title: 'Detalle del producto'})
    } else {
      res.render('pages/noProduct')
    }
  } catch (error) {
    res.json({error});
  }
});

app.get('/form', (req, res) => {
  res.render('pages/formulario');
});

app.post('/form', (req, res) => {
  const { body } = req;

  const indice = productsHC.map(elem => elem.id).sort();
  id = indice[indice.length - 1] + 1 
  
  const productoAgregar = {...body, id}

  productsHC.push(productoAgregar);
  res.render('pages/productoNuevo', { productoNuevo: productoAgregar, title:'Nuevo producto agregado'});
});