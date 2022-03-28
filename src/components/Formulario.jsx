import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes,paciente, setPaciente }) => {


  
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      
    }else{

    }

  },[paciente]) //cada vez que paciente cambie

  const generarId =() =>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)

    return fecha + random;
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validando formulario

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
     

      setError(true);
      return;
    }

    setError(false);

    //objeto Paciente
    const objectoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
     
    };

    if (paciente.id) {
     //Editando
     objectoPaciente.id = paciente.id

     const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objectoPaciente: pacienteState   )

     setPacientes(pacientesActualizados);

    //Limpiar el state 
     setPaciente({});
      

      
    }else{
     //NuevoRegistro
     objectoPaciente.id = generarId()
     setPacientes([...pacientes, objectoPaciente]);

    }

   

    //reiniciar el form
    setNombre("");
    setPropietario("");
    setFecha("");
    setEmail("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes{" "}
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
           
            <p> Todos los Campos son Obligatorios</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota {nombre}
          </label>

          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            id="mascota"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>

          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            id="propietario"
            placeholder="Nombre de la Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            id="email"
            placeholder="Email Contacto Propietario "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>

          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            id="alta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>

          <textarea
            name=""
            className="border-2 w-full p-2 mt-2 resize-none placeholder-gray-400 rounded-md"
            id="sintomas"
            placeholder="Describe los Sintomas "
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default Formulario;
