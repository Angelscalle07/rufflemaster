import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './editar.module.css';

export default function EditarRifa() {
  const router = useRouter();
  const { id } = router.query;

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [premio, setPremio] = useState('');
  const [estado, setEstado] = useState('activa');

  useEffect(() => {
    if (id) {
      fetch(`/api/rifas`)
        .then((res) => res.json())
        .then((data) => {
          const rifa = data.find(r => r.id == id);
          if (rifa) {
            setTitulo(rifa.titulo);
            setDescripcion(rifa.descripcion);
            setFechaInicio(rifa.fecha_inicio.slice(0, 16));
            setFechaFin(rifa.fecha_fin.slice(0, 16));
            setPremio(rifa.premio);
            setEstado(rifa.estado);
          }
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rifaActualizada = {
      titulo,
      descripcion,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      premio,
      estado
    };

    const res = await fetch(`/api/rifas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rifaActualizada)
    });

    if (res.ok) {
      alert('✅ Rifa actualizada');
      router.push('/admin/rifas/listado');
    } else {
      alert('❌ Error al actualizar');
    }
  };

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>✏️ Editar Rifa</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

        <label>Fecha Inicio</label>
        <input type="datetime-local" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

        <label>Fecha Fin</label>
        <input type="datetime-local" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

        <label>Premio</label>
        <input type="text" value={premio} onChange={(e) => setPremio(e.target.value)} required />

        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="activa">Activa</option>
          <option value="finalizada">Finalizada</option>
        </select>

        <button type="submit" className={styles.botonCrear}>Guardar Cambios</button>
      </form>
    </div>
  );
}
