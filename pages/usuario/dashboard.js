import Link from 'next/link'; 
import React from 'react';  
import styles from './usuario.module.css';
import Image from 'next/image';

export default function DashboardUsuario() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
        <Image src="/Logo rufflemaster.png" alt="Rufflemaster Logo" width={300} height={200} />
        </div>
        <nav className={styles.nav}>
            <ul>
            <li><Link href="#">Inicio</Link></li>
            <li><Link href="#">Mis boletos</Link></li>
            <li><Link href="#">Resultados</Link></li>
            <li><Link href="#">Mi perfil</Link></li>
            <li><Link href="/" style={{ color: 'red' }}>Cerrar sesion</Link></li>
            </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <h2>Bienvenido, Participante</h2>
        <p>Explora las rifas activas y consulta tus boletos.</p>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>🎫 Rifas Activas</h3>
            <p>Participa en rifas disponibles hoy.</p>
            <button>Ver Rifas</button>
          </div>

          <div className={styles.card}>
            <h3>📋 Mis Boletos</h3>
            <p>Consulta tus boletos comprados.</p>
            <button>Ver Boletos</button>
          </div>

          <div className={styles.card}>
            <h3>🏆 Resultados</h3>
            <p>Consulta los resultados de rifas anteriores.</p>
            <button>Ver Resultados</button>
          </div>
        </div>
      </main>
    </div>
  );
}

