import React from 'react';
import './styles.css'; // Importa el archivo CSS
import ProductList from './ProductList.js'

function InventarioPage() {
  return (
    <div className="container">
      {/* Side Bar */}
      <div className="sideBar">
        {/* Contenido del Side Bar */}



      </div>
      
      {/* Main Content */}
      <div className="mainContent">
        {/* Top Bar */}
        <div className="topBar">


          <div className="inputContainer">
            <label htmlFor="buscarInput">Buscar:</label>
            <input type="text" id="buscarInput" />
          </div>
          <button className="buttonStyle">+ Agregar producto</button>


        </div>

        {/* Área de Contenido */}
        <div className="mainContent">
          {/* Contenido del Área de Contenido */}


        <ProductList/>
      



        </div>
      </div>
    </div>
  );
}

export default InventarioPage;
