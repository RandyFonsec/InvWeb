import React from 'react';

function ProductTable({ products }) {
  return (
    <table>
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
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
