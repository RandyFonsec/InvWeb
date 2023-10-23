import React, { useState, useEffect } from 'react';
import './styles.css'; // Importa el archivo CSS
import ProductTable from './ProductTable.js';
import EditProductModal from './EditProductModal.js'; // Importa el nuevo componente
import AddProductModal from './AddProductModal.js';

function InventarioPage() {


  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

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
   const openAddModal = () => {
    setAddModalOpen(true);
  };


  // Función para cerrar el modal
  const closeEditModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };
// Función para cerrar el modal de agregar
  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  // Función para guardar los cambios en el modal
  const saveChanges = (editedProduct) => {
  // Realizar una solicitud PUT al servidor para actualizar el producto
  fetch(`http://localhost:3000/productos/${editedProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedProduct),
    })
    .then((response) => response.json())
    .then((data) => {
      // Actualizar el estado de los productos con el producto editado
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setProducts(updatedProducts);
    })
    .catch((error) => {
      console.error('Error al guardar los cambios:', error);
    });
  };


  const deleteProduct = (product) => {
  // Realizar una solicitud DELETE al servidor para eliminar el producto
  fetch(`http://localhost:3000/productos/${product.id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 200) {
        // Actualizar el estado de productos eliminando el producto
        const updatedProducts = products.filter((p) => p.id !== product.id);
        setProducts(updatedProducts);
      } else {
        console.error('Error al eliminar el producto:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el producto:', error);
    });
};

const addProduct = (newProduct) => {
    // Realizar una solicitud POST al servidor para agregar el producto
    fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Agregar el nuevo producto a la lista de productos
        setProducts([...products, data]);
      })
      .catch((error) => {
        console.error('Error al agregar un nuevo producto:', error);
      });
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

          <button className="buttonStyle" onClick={openAddModal}>
            + Agregar producto
          </button>
        </div>

        <div className="mainContent">
          <ProductTable products={products} onEdit={openEditModal} onDelete = {deleteProduct} />
        </div>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onSave={saveChanges}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={addProduct}
      />
    </div>
  );
}

export default InventarioPage;
