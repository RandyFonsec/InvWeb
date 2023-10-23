import React from 'react';

import './styles.css'; // Importa el archivo CSS



function ProductTable({ products, onEdit, onDelete }) {
  const handleEditClick = (product) => {
    onEdit(product);
  };
  const handleDeleteClick = (product) => {
    console.log(product.id)
    onDelete(product.id);
  };

  return (
    <>
    <h2 >Lista de productos:</h2>

    <table className="tableStyle">

        
      <thead >
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
              <button className="buttonStyleSec" onClick={() => handleEditClick(product)}>Editar</button>
              <button className="buttonStyleSec" onClick={() => handleDeleteClick(product)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    </>
  );
}


export default ProductTable;
