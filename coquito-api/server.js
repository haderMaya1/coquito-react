// // server.js
// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // datos de ejemplo (podrían venir de BD)
// const productos = [
//   { id: 1, nombre: 'Cuaderno', precio: 1200 },
//   { id: 2, nombre: 'Lápiz', precio: 300 },
//   { id: 3, nombre: 'Mochila', precio: 45000 }
// ];

// // rutas
// app.get('/api/productos', (req, res) => {
//   res.json(productos);
// });

// app.get('/api/productos/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const p = productos.find(x => x.id === id);
//   if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
//   res.json(p);
// });

// app.get('/api/saludo', (req, res) => {
//   res.json({ mensaje: '¡Hola desde mi propia API con Node.js!' });
// });

// // puerto
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Servidor API corriendo en http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import { estudiantes } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

// GET - Lista de estudiantes
app.get("/api/estudiantes", (req, res) => {
  res.json(estudiantes);
});

// GET - Detalle por ID
app.get("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);
  const est = estudiantes.find(e => e.id === id);
  if (!est) return res.status(404).json({ error: "Estudiante no encontrado" });
  res.json(est);
});

// POST - Crear estudiante
app.post("/api/estudiantes", (req, res) => {
  const { nombre, programa, edad } = req.body;

  const nuevo = {
    id: estudiantes.length + 1,
    nombre,
    programa,
    edad
  };

  estudiantes.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT - Actualizar estudiante
app.put("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "No encontrado" });

  const { nombre, programa, edad } = req.body;
  estudiantes[index] = { id, nombre, programa, edad };

  res.json(estudiantes[index]);
});

// DELETE - Eliminar estudiante
app.delete("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = estudiantes.some(e => e.id === id);
  if (!existe) return res.status(404).json({ error: "No encontrado" });

  estudiantes = estudiantes.filter(e => e.id !== id);
  res.json({ mensaje: "Estudiante eliminado" });
});

// Servidor
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`API corriendo en http://localhost:${PORT}`)
);
