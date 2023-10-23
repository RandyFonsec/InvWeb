import React, { useState, useEffect } from 'react';
import './styles.css';
import ProductTable from './ProductTable.js';
import EditProductModal from './EditProductModal.js';
import AddProductModal from './AddProductModal.js';

function InventarioPage() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de la búsqueda

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setSearchResults(data); // Inicialmente, muestra todos los productos como resultados
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

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
        setSearchResults(updatedProducts); // Actualizar los resultados de la búsqueda
      })
      .catch((error) => {
        console.error('Error al guardar los cambios:', error);
      });
  };

  const addProduct = (newProduct) => {
    fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        setSearchResults([...searchResults, data]); // Agregar el nuevo producto a los resultados de la búsqueda
      })
      .catch((error) => {
        console.error('Error al agregar un nuevo producto:', error);
      });
  };

  const deleteProduct = (productId) => {
  // Realiza una solicitud DELETE al servidor para eliminar el producto
  fetch(`http://localhost:3000/productos/${productId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      // Elimina el producto del estado
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
      setSearchResults(updatedProducts);
    })
    .catch((error) => {
      console.error('Error al eliminar el producto:', error);
    });
};

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value); // Actualizar el término de búsqueda
    const filteredResults = products.filter((product) =>
      product.nombreProducto.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults); // Actualizar los resultados de la búsqueda
  };

  return (
    <div className="container">


      <div className="sideBar">
        {/* Contenido del Side Bar */}
      </div>


      <div className="contentContainer">
      
      <div className="topBar">
        {/* Contenido del Top Bar */}

        <div className="inputContainer">
          <label htmlFor="buscarInput">Buscar:</label>
          <input
            type="text"
            id="buscarInput"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="buttonStyle" onClick={openAddModal}>
          + Agregar producto
        </button>


      </div>

      <div className="mainContent">
          {/* Contenido Principal */}

        <ProductTable products={searchResults} onEdit={openEditModal} onDelete={deleteProduct} />


      </div>
      

      </div>




      <EditProductModal
        isOpen={isEditModalOpen}
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
