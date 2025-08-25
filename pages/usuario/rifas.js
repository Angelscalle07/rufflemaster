import React, { useEffect, useState } from 'react';
import styles from './Rifas.module.css';
import { useRouter } from 'next/router';
import { connectWallet } from '../../utils/wallet';


export default function RifasActivas() {
  const [rifas, setRifas] = useState([]);
  const [wallet, setWallet] = useState(null); 
  const router = useRouter();

  const VolverDashboard = () => {
    router.push('/usuario/dashboard');
  };

  useEffect(() => {
    fetch('/api/rifas')
      .then(res => res.json())
      .then(data => setRifas(data));
  }, []);

  const handleConectarWallet = async () => {
    const account = await connectWallet();
    if (account) {
      setWallet(account);
      alert(`✅ Wallet conectada: ${account}`);

      // Aquí mandamos al backend para guardar la wallet en el usuario
      const usuarioId = localStorage.getItem('usuario_id');
      if (usuarioId) {
        await fetch('/api/update-wallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: usuarioId,
            wallet_address: account,
          }),
        });
      }
    }
  };

  const handleComprar = async (rifaId) => {
    try {
      const usuarioId = localStorage.getItem('usuario_id');
      if (!usuarioId) {
        alert('Debes iniciar sesión primero');
        return;
      }

      const walletAddress = await connectWallet();
    if (!walletAddress) {
      alert("No se pudo conectar la wallet");
      return;
    }

    await fetch('/api/update-wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: usuarioId,
        wallet_address: walletAddress
      })
    });

      const res = await fetch('/api/boletos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuarioId,
          rifa_id: rifaId,
          cantidad: 1
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.mensaje || 'Ocurrió un error'}`);
        return;
      }

      alert('✅ Boleto comprado con éxito');
    } catch (error) {
      console.error(error);
      alert('❌ Error al comprar');
    }
  };

  return (
    <div className={styles.container}>
      <h1>🎫 Rifas Activas</h1>
      <p className={styles.subtitulo}>Explora y participa en sorteos disponibles</p>

      <button className={styles.btn} onClick={handleConectarWallet}>
        {wallet ? `✅ Wallet: ${wallet.substring(0, 6)}...${wallet.slice(-4)}` : "🔗 Conectar Wallet"}
      </button>

      <div className={styles.grid}>
        {rifas.map((rifa) => (
          <div key={rifa.id} className={styles.card}>
            <h3>{rifa.titulo}</h3>
            <p>{rifa.descripcion}</p>
            <p><strong>Fecha inicio:</strong> {new Date(rifa.fecha_inicio).toLocaleDateString()}</p>
            <p><strong>Fecha fin:</strong> {new Date(rifa.fecha_fin).toLocaleDateString()}</p>
            <button 
              className={styles.btn}
              onClick={() => handleComprar(rifa.id)}>Participar</button>
          </div>
        ))}
      </div>

      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
  ); 
}


