import { useEffect, useState } from 'react';
import styles from './Boletos.module.css';

export default function Boletos() {
  const [boletos, setBoletos] = useState([]);

  const VolverDashboard = () => {
    window.location.href = '/usuario/dashboard'};  

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuario_id');
    fetch(`/api/boletos/${usuarioId}`)
      .then(res => res.json())
      .then(data => setBoletos(data));
  }, []);

  const eliminarBoleto = async (id) => {
    if (!confirm("¿Seguro que quieres cancelar este boleto?")) return;

    const res = await fetch(`/api/boletos/${id}`, { method: 'DELETE' });

    if (res.ok) {
      alert("✅ Boleto cancelado");
      setBoletos(boletos.filter(b => b.id !== id));
    } else {
      alert("❌ No se pudo cancelar el boleto");
    }
  };

  return (
    <div className={styles.container}>
      <h1>🎟️ Mis Boletos</h1>
      <p className={styles.subtitulo}>Aquí puedes ver los boletos comprados y su estado.</p>

      <div className={styles.grid}>
        {boletos.map(boleto => (
          <div key={boleto.id} className={styles.card}>
            <h2>{boleto.rifa?.titulo}</h2>
            <p><strong>Cantidad:</strong> {boleto.cantidad}</p>
            <p><strong>Fecha:</strong> {new Date(boleto.fecha_compra).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {boleto.estado}</p>
            <button className={styles.btnCancelar} onClick={() => eliminarBoleto(boleto.id)}>❌ Cancelar</button>
          </div>
        ))}
      </div>
      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
  );
}
