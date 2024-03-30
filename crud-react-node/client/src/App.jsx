import { useState, useEffect } from "react";
import axios from "axios";
 
function App() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
 
  const [ciudad, setCiudad] = useState('');
 
  // Marca
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [result, setResult] = useState([]);
 
  const handleChangeMarca =  (event) => {
    const value = event.target.value;
    // Asigna el valor de la marca seleccionada 
    setMarcaSeleccionada(value);
    // Pasa la marca como argumento, puede ser nacional (todos) o izzi, wizz, wizz plus 
    consultarPorMarca(value);
  };
 
  const consultarPorMarca = (marca) => {
    axios.get(`http://localhost:4000/ciudades?marca=${marca}`)
      .then(response => {
        const arregloDatos = response.data;
        console.log(arregloDatos);
        setResult(response.data);
      })
      .catch(error => {
        alert('Error al obtener comunicados: ' + error.message);
      });
  }

  // const obtenerComunicados = () => {
  //   axios.get("http://localhost:4000/comunicados")
  //   .then(response => {
  //     // setComunicadosLista(response.data);
  //   })
  //   .catch(error => {
  //     alert('Error al obtener comunicados: ' + error.message);
  //   });
  // }
 
  // PUESTOS
  // Estado para mantener los valores seleccionados
  const [puestosSeleccionados, setPuestosSeleccionados] = useState([]);
  const [seleccionarTodos, setSeleccionarTodos] = useState(false);
 
  // Función para manejar cambios en la selección de los checkboxes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    // Si el checkbox "todos" es seleccionado, selecciona todos los checkboxes
    if (value === "todos") {
      setSeleccionarTodos(!seleccionarTodos);
      if (!seleccionarTodos) {
        setPuestosSeleccionados(options);
      } else {
        setPuestosSeleccionados([]);
      }
    } else {
      // Si un checkbox individual es seleccionado, actualiza el estado de la selección
      if (puestosSeleccionados.includes(value)) {
        setPuestosSeleccionados(puestosSeleccionados.filter(val => val !== value));
      } else {
        setPuestosSeleccionados([...puestosSeleccionados, value]);
      }
    }
  };
 
  // Datos a mostrar en los checkboxes
  const options = [
    "Ejecutivo ATC",
    "Ejecutivo Sr ATC",
    "Gerente ATC",
    "Jefe ATC",
    "Jefe Regional ATC"
  ];
 
  // const [comunicadosLista, setComunicadosLista] = useState([]);
  // const [puestosLista, setPuestosLista] = useState([]);
  // const [marcasLista, setMarcasLista] = useState([]);
  // const [marcasLista, setMarcasLista] = useState([]);
 
  useEffect(() => {
    // obtenerComunicados();
    // obtenerPuestos();
    // obtenerMarcas();
  }, []); // La dependencia de este efecto está vacía para que solo se ejecute una vez al montar el componente
 
  const agregar = () => {
    axios.post("http://localhost:4000/crear", {
      titulo: titulo,
      descripcion: descripcion,
      // puesto: puesto,
      // marca: marca,
      ciudad: ciudad
    })
    .then(() => {
      alert('Comunicado agregado');
      // obtenerComunicados(); // Actualizar la lista de comunicados después de agregar uno nuevo
    })
    .catch(error => {
      alert('Error al agregar comunicado: ' + error.message);
    });
  }
  
  return (
    <>
      <h1 className="display-6 text-center">Comunicados</h1>
      <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2">
              <form action="post">
                <div className="form-group mt-4">
                  <label htmlFor="titulo">Título</label>
                  <input className="form-control"
                          type="text"
                          name="titulo"
                          onChange={(e) => {
                            setTitulo(e.target.value)
                          }}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="descripcion">Descripcion</label>
                  <input className="form-control"
                          type="text"
                          name="descripcion"
                          onChange={(e) => {
                            setDescripcion(e.target.value)
                          }}
                  />
                </div>
 
                 {/* Marcas */}
                 <div className="mt-3">
                  <h3>Marcas</h3>
                  <div className="form-group mt-2">
                    <label htmlFor="selectOption">Selecciona una opción:</label>
                    <select className="form-control" id="selectOption" value={marcaSeleccionada} onChange={handleChangeMarca}>
                      <option value="" disabled>Seleccionar...</option>
                      <option value="nacional">Nacional</option>
                      <option value="izzi">Izzi</option>
                      <option value="wizz">Wizz</option>
                      <option value="wizz plus">Wizz Plus</option>
                    </select>
                  </div>
                 
                  {/* MUESTRA LOS RESULTADOS */}
                  <div className="row">
                    <h2>Resultado de la consulta:</h2>
                    <div className="col-md-4">
                      {result.map((item, index) => (
                        <div key={index}>
                          <h3 className="mt-2">
                            División {item.division}
                          </h3>
                          <h4 className="mt-2">
                            Región {item.region}
                          </h4>
                          <div className="h5 mt-2">
                            Ciudad {item.ciudad}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  

                  <p className="mt-2">Seleccionaste: {marcaSeleccionada}</p>
                  {console.log(marcaSeleccionada)}
                </div>
                
                {/* PUESTOS */}
                <div className="mt-3">
                  <h3>Puestos:</h3>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkbox-todos"
                      value="todos"
                      checked={seleccionarTodos}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="checkbox-todos">
                      Todos
                    </label>
                  </div>
                 
                  {options.map((option, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`checkbox-${index}`}
                        value={option}
                        checked={puestosSeleccionados.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                  <p>Opciones seleccionadas: {puestosSeleccionados.join(', ')}</p>
                  {console.log(puestosSeleccionados)}
                </div>
 
                {/* Ciudades
                <div className="form-group mt-4">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input className="form-control"
                          type="text"
                          name="ciudad"
                          onChange={(e) => {
                            setCiudad(e.target.value)
                          }}
                  />
                </div>
                */}
 
                <input
                      className="btn btn-success mt-4"
                      type="submit"
                      value="Guardar"
                      onClick={agregar}
                />
              </form>
             
              {/* <div className="mt-4">
                {
                  comunicadosLista.map( (val, key) => <div> {val.titulo} </div>)
                }
              </div>
 
              { console.log(typeof(comunicadosLista)) }
 
              <div className="mt-4">
                {
                  puestosLista.map( (val, key) => <div> {val.puesto} </div>)
                }
              </div>
 
              { console.log(typeof(puestosLista)) }
 
              <div className="mt-4">
                {
                  marcasLista.map( (val, key) => <div> {val.marca} </div>)
                }
              </div>
 
              { console.log(typeof(marcasLista)) } */}
 
            </div>
        </div>
      </div>
    </>
  );
}
 
export default App;
 