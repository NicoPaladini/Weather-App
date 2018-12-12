import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Error from './Error';
import Clima from './Clima';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  //Se utiliza la prop prevProps para evitar que cargue continuamente el objeto Consulta
  componentDidUpdate(prevProps,prevState) {
    if(prevState.consulta != this.state.consulta){
    this.consultarApi();}
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

//Una vez que tengo los datos de la consulta en el state podemos hacer la consulta
//a la API
  consultarApi = () => {
      const {ciudad, pais} = this.state.consulta;
      if(!ciudad || !pais) return null;

  //Realizamos la API key y leemos la url
        const appId = '6ee8235e80d29c62926715de5c58f1ac';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;


  // query con fetch API
  fetch(url)
    .then(respuesta => {
      return respuesta.json();
    })
    .then(datos => {
    this.setState({
      resultado : datos
    })
  })
  .catch(error =>{
    console.log(error);
  })

      }



//Validacion de datos
  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === ''){
      this.setState({
        error: true
      })
    }else{
      this.setState({
        consulta: respuesta,
        error: false
      })
      
  }
  }

  render() {

    const error = this.state.error;
    
    let resultado;

    if(error){

      resultado =<Error mensaje="Ambos campos son obligatorios" />
    }else{
      resultado = <Clima resultado = {this.state.resultado} />
    }

    return (
      <div className="app">
          <nav>
            <Header 
              titulo= 'Clima React'
            />
          </nav>
        <Formulario
          datosConsulta = {this.datosConsulta}
        />
        {resultado}
      </div>
    );
  }
}

export default App;
