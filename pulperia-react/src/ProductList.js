import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable.js'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos') // Realiza una solicitud a la ruta de la API '/productos'
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Productos:</h1>
      <ProductTable products={products} />
    </div>
  );
}

export default ProductList;
