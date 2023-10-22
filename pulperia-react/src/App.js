import React, { useState, useEffect } from 'react';
import InventarioPage from './InventarioPage.js'
function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET a la API para obtener los productos al cargar la aplicación
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">

      <InventarioPage/>

      
    </div>
  );
}

export default App;