import React, { useState } from 'react';
import './styles.css';

function AddProductModal({ isOpen, onClose, onAdd }) {
  const [newProduct, setNewProduct] = useState({
    nombreProducto: '',
    precio: '',
    cantidad: '',
    idCategoria: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAdd = () => {
    onAdd(newProduct);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
      <button className="close-button" onClick={onClose}>X</button>
        <h2>Agregar Producto</h2>
        <form>
          <div className="inputContainer">
            <label htmlFor="nombreProducto">Nombre:</label>
            <input
              type="text"
              id="nombreProducto"
              name="nombreProducto"
              value={newProduct.nombreProducto}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="precio">Precio:</label>
            <input
              type="text"
              id="precio"
              name="precio"
              value={newProduct.precio}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="text"
              id="cantidad"
              name="cantidad"
              value={newProduct.cantidad}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="idCategoria">Categoría:</label>
            <input
              type="text"
              id="idCategoria"
              name="idCategoria"
              value={newProduct.idCategoria}
              onChange={handleInputChange}
            />
          </div>
          <button className="buttonStyle" onClick={handleAdd}>
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
