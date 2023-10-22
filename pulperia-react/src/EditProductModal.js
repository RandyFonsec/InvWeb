import React, { useState, useEffect } from 'react';
import './styles.css';

function EditProductModal({ isOpen, onClose, product, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  // Use useEffect to update editedProduct when product changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
      <button className="close-button" onClick={onClose}>X</button> {/* Botón de cierre */}
        <h2>Editar Producto</h2>
        <form>
          <div className="inputContainer">
            <label htmlFor="nombreProducto">Nombre:</label>
            <input
              type="text"
              id="nombreProducto"
              name="nombreProducto"
              value={editedProduct?.nombreProducto}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="precio">Precio:</label>
            <input
              type="text"
              id="precio"
              name="precio"
              value={editedProduct?.precio}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="text"
              id="cantidad"
              name="cantidad"
              value={editedProduct?.cantidad}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="categoria">Categoría:</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={editedProduct?.idCategoria}
              onChange={handleInputChange}
            />
          </div>
          <button className="buttonStyle" onClick={handleSave}>Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
