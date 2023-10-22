import React, { useState, useEffect } from 'react';
import './styles.css'; // Importa el archivo CSS
import ProductTable from './ProductTable.js';
import EditProductModal from './EditProductModal.js'; // Importa el nuevo componente

function InventarioPage() {


  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // ...
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

  // Función para abrir el modal de edición
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeEditModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Función para guardar los cambios en el modal
  const saveChanges = (editedProduct) => {
    
  };




  return (
    <div className="container">
      <div className="sideBar">
        {/* Contenido del Side Bar */}
      </div>

      <div className="mainContent">
        <div className="topBar">
          <div className="inputContainer">
            <label htmlFor="buscarInput">Buscar:</label>
            <input type="text" id="buscarInput" />
          </div>
          <button className="buttonStyle">+ Agregar producto</button>
        </div>

        <div className="mainContent">
          <ProductTable products={products} onEdit={openEditModal} />
        </div>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onSave={saveChanges}
      />
    </div>
  );
}

export default InventarioPage;
