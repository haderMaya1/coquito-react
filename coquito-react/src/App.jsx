import { useEffect, useState } from "react";
import EstudianteForm from "./EstudianteForm";
import EstudianteList from "./EstudianteList";

const API = "http://localhost:4000/api/estudiantes";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarDatos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEstudiantes(data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarEstudiante = async (est) => {
    if (est.id) {
      await fetch(`${API}/${est.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(est)
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(est)
      });
    }

    setSeleccionado(null);
    cargarDatos();
  };

  const eliminarEstudiante = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarDatos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Estudiantes</h1>

      <EstudianteForm
        estudianteSeleccionado={seleccionado}
        onGuardar={guardarEstudiante}
      />

      <EstudianteList
        estudiantes={estudiantes}
        onEditar={setSeleccionado}
        onEliminar={eliminarEstudiante}
      />
    </div>
  );
}

export default App;











// // src/App.jsx (versión para consumir la API local)
// import { useEffect, useState } from 'react';

// function App() {
//   const [productos, setProductos] = useState([]);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:4000/api/productos')
//       .then(res => {
//         if (!res.ok) throw new Error('Error al obtener productos');
//         return res.json();
//       })
//       .then(data => {
//         setProductos(data);
//         setCargando(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setCargando(false);
//       });
//   }, []);

//   if (cargando) return <div style={{ padding: 20 }}>Cargando productos...</div>;
//   if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Productos (desde mi API)</h1>
//       <ul>
//         {productos.map(p => (
//           <li key={p.id}>{p.nombre} — ${p.precio}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// src/App.jsx Versión consumo de API online
// import { useEffect, useState } from 'react';

// function App() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => {
//         if (!res.ok) throw new Error('Error en la respuesta de la API');
//         return res.json();
//       })
//       .then(data => {
//         setUsuarios(data);
//         setCargando(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setCargando(false);
//       });
//   }, []);

//   if (cargando) return <div style={{ padding: 20 }}>Cargando...</div>;
//   if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Lista de Usuarios</h1>
//       <ul>
//         {usuarios.map(u => (
//           <li key={u.id}>{u.name} — {u.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
