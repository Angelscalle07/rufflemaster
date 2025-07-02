import styles from './Resultados.module.css';

export default function Resultados() {
  const resultados = [
    {
      id: 1,
      rifa: 'Rifa Día del Padre',
      fecha: '2025-06-30',
      resultado: 'Ganador',
      premio: 'Parlante Bluetooth',
    },
    {
      id: 2,
      rifa: 'Sorteo de Tecnología',
      fecha: '2025-06-10',
      resultado: 'No Ganador',
      premio: '-',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>🏆 Resultados de Rifas</h1>
      <p className={styles.subtitulo}>Consulta si has ganado en rifas pasadas</p>

      <div className={styles.grid}>
        {resultados.map((r) => (
          <div key={r.id} className={`${styles.card} ${r.resultado === 'Ganador' ? styles.ganador : styles.noGanador}`}>
            <h2>{r.rifa}</h2>
            <p><strong>Fecha:</strong> {r.fecha}</p>
            <p><strong>Resultado:</strong> {r.resultado}</p>
            <p><strong>Premio:</strong> {r.premio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
