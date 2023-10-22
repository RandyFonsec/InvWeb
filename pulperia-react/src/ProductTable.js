import React from 'react';

import './styles.css'; // Importa el archivo CSS

function ProductTable({ products }) {
  return (
    <table className="tableStyle">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.nombreProducto}</td>
            <td>{product.precio}</td>
            <td>{product.cantidad}</td>
            <td>
              <button className="buttonStyleSec">Editar</button>
              <button className="buttonStyleSec">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
