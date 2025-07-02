import styles from './Boletos.module.css';

export default function Boletos() {
    
  const boletos = [
    {
      id: 1,
      rifa: 'Rifa Día del Padre',
      cantidad: 3,
      fecha: '2025-06-30',
      estado: 'Activo'
    },
    {
      id: 2,
      rifa: 'Rifa Tecnología',
      cantidad: 1,
      fecha: '2025-06-20',
      estado: 'Finalizado'
    }
  ];

  return (
    <div className={styles.container}>
      <h1>🎟️ Mis Boletos</h1>
      <p className={styles.subtitulo}>Aquí puedes ver los boletos comprados y su estado.</p>

      <div className={styles.grid}>
        {boletos.map(boleto => (
          <div key={boleto.id} className={styles.card}>
            <h2>{boleto.rifa}</h2>
            <p><strong>Cantidad:</strong> {boleto.cantidad}</p>
            <p><strong>Fecha:</strong> {boleto.fecha}</p>
            <p><strong>Estado:</strong> {boleto.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
