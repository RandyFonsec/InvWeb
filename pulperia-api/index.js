const express = require('express');
const mysql = require('mysql2');

const cors = require('cors'); // Importa el paquete 'cors'
const app = express();


app.use(cors());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pulperia',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.use(express.urlencoded({ extended: false }));
// Configura el middleware para manejar JSON
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Reemplaza con el origen de tu aplicación React
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


//CRUD Producto
// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
  
  const { idCategoria, nombreProducto, precio, cantidad } = req.body; // Obtén los datos del producto desde el cuerpo de la solicitud

  // Ejecuta una consulta SQL para agregar el nuevo producto
  db.query('INSERT INTO producto (idCategoria, nombreProducto, precio, cantidad) VALUES (?, ?, ?, ?)', [idCategoria, nombreProducto, precio, cantidad], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, idCategoria, nombreProducto, precio, cantidad });
  });
});


// Ruta para obtener un producto dado un código
app.get('/productos/:codigo', (req, res) => {
  const codigo = req.params.codigo; // Obtén el código desde la URL

  // Ejecuta la consulta SQL para buscar el producto por código
  db.query('SELECT * FROM producto WHERE id = ?', [codigo], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.json(results[0]); // Devuelve el primer resultado (debería ser único)
    }
  });
});




// Ruta para actualizar un producto por ID
app.put('/productos/:id', (req, res) => {
  const id = req.params.id; // Obtén el ID del producto desde la URL
  const { nombreProducto, precio, cantidad } = req.body; // Datos actualizados desde el cuerpo de la solicitud

  // Ejecuta una consulta SQL para actualizar el producto
  db.query(
    'UPDATE producto SET nombreProducto = ?, precio = ?, cantidad = ? WHERE id = ?',
    [nombreProducto, precio, cantidad, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
      } else {
        res.json({ message: 'Producto actualizado con éxito' });
      }
    }
  );
});

// Ruta para eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id; // Obtén el ID del producto desde la URL

  // Ejecuta una consulta SQL para eliminar el producto
  db.query('DELETE FROM producto WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto eliminado con éxito' });
    }
  });
});


//CRUD Categorias

// Ruta para obtener todas las categorías
app.get('/categorias', (req, res) => {
  // Ejecuta una consulta SQL para seleccionar todas las categorías
  db.query('SELECT * FROM categoria', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});



// Ruta para agregar una nueva categoría
app.post('/categorias', (req, res) => {
  const { nombreCategoria } = req.body; // Obtén el nombre de la categoría desde el cuerpo de la solicitud

  // Ejecuta una consulta SQL para agregar la nueva categoría
  db.query('INSERT INTO categoria (nombreCategoria) VALUES (?)', [nombreCategoria], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, nombreCategoria });
  });
});


// Ruta para actualizar una categoría por ID
app.put('/categorias/:id', (req, res) => {
  const id = req.params.id; // Obtén el ID de la categoría desde la URL
  const { nombreCategoria } = req.body; // Datos actualizados desde el cuerpo de la solicitud

  // Ejecuta una consulta SQL para actualizar la categoría
  db.query(
    'UPDATE categoria SET nombreCategoria = ? WHERE id = ?',
    [nombreCategoria, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Categoría no encontrada' });
      } else {
        res.json({ message: 'Categoría actualizada con éxito' });
      }
    }
  );
});


// Ruta para eliminar una categoría por ID
app.delete('/categorias/:id', (req, res) => {
  const id = req.params.id; // Obtén el ID de la categoría desde la URL

  // Ejecuta una consulta SQL para eliminar la categoría
  db.query('DELETE FROM categoria WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Categoría no encontrada' });
    } else {
      res.json({ message: 'Categoría eliminada con éxito' });
    }
  });
});




// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API en ejecución en el puerto ${port}`);
});
