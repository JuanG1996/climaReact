import React, { Fragment, useState, useEffect } from 'react'
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {

    // state del formulario
    const [busqueda, guardarBusqueda] = useState({
      ciudad: "",
      pais: ""
  });
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});

  //Extraer ciudad y pais
  const {ciudad, pais} = busqueda;

  useEffect(() =>{
      const consultarAPI = async () =>{

        if(consultar){
          const appId = "fafc4dae62cfff72b0932125ba1298b4";
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
        }
      }

      consultarAPI();
  }, [consultar]);


  

  return (
    <Fragment>
        <Header
          titulo = "Clima React App"
        />
          <div className="contenedor-form">
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                  <Formulario 
                    busqueda = {busqueda}
                    guardarBusqueda = {guardarBusqueda}
                    guardarConsultar = {guardarConsultar}
                  />
                </div>
                <div className="col m6 s12">
                  <Clima />
                </div>
              </div>
            </div>
          </div>
    </Fragment>
  );
}

export default App;
