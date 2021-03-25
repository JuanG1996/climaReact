import React, { Fragment, useState, useEffect } from 'react'
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {

    // state del formulario, guarda lo que se coloque en el formulario antes del submit
    const [busqueda, guardarBusqueda] = useState({
      ciudad: "",
      pais: ""
  });
    //Valida si se dio submit al formulario (para no ejecutarse por primera vez al iniciar el DOM)
    const [consultar, guardarConsultar] = useState(false);
    //Aqui se guarda la info que viene de la API
    const [resultado, guardarResultado] = useState({});
    //Indica si el mensaje de error se muestra o no
    const [error, guardarError] = useState(false);

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
          guardarConsultar(false);

          //Detecta si hubo o no resultados
          if (resultado.cod === "404") {
            guardarError(true);
          }else{
            guardarError(false);
          }
        }
      }

      consultarAPI();
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje = "No hay resultados"/>
  }else{
    componente =  <Clima
                  resultado = {resultado}
                />
  }
 

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
                    guardarError = {guardarError}
                  />
                </div>
                <div className="col m6 s12">
                 {componente}
                </div>
              </div>
            </div>
          </div>
    </Fragment>
  );
}

export default App;
