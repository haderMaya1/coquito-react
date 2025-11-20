import { useState, useEffect } from "react";

export default function EstudianteForm({ estudianteSeleccionado, onGuardar }) {
  const [form, setForm] = useState({
    nombre: "",
    programa: "",
    edad: ""
  });

  useEffect(() => {
    if (estudianteSeleccionado) {
      setForm(estudianteSeleccionado);
    }
  }, [estudianteSeleccionado]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onGuardar(form);
    setForm({ nombre: "", programa: "", edad: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>{estudianteSeleccionado ? "Editar" : "Agregar"} Estudiante</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        name="programa"
        placeholder="Programa"
        value={form.programa}
        onChange={handleChange}
      />

      <input
        name="edad"
        type="number"
        placeholder="Edad"
        value={form.edad}
        onChange={handleChange}
      />

      <button type="submit">
        {estudianteSeleccionado ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
