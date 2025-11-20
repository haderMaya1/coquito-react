export default function EstudianteList({ estudiantes, onEditar, onEliminar }) {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {estudiantes.map(est => (
          <li key={est.id}>
            {est.nombre} — {est.programa} — {est.edad} años
            <button onClick={() => onEditar(est)}>Editar</button>
            <button onClick={() => onEliminar(est.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
