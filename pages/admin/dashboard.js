import styles from './admin.module.css';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function AdminDashboard() {
  const [primerNombre, setPrimerNombre] = useState('');


  const router = useRouter();

  


  useEffect(() => {
      const nombreCompleto = localStorage.getItem('nombreUsuario');
      if (nombreCompleto) {
        const partes = nombreCompleto.split(' ');
        setPrimerNombre(partes[0]);
      }
    }, []);

  const irARifas = () => {
    router.push('/admin/rifas/listado');
  };

  const irANuevaRifa = () => {
    router.push('/admin/rifas/nuevas');
  };

  const irAGestionUsuarios = () => {
    router.push('/admin/usuarios');
  };
  
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src="/Logo rufflemaster.png" alt="Rufflemaster Logo" width={300} height={200} />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/admin/usuarios">Manejo de usuarios</Link></li>
            <li><Link href="#">Blockchain seguimiento</Link></li>
            <li><Link href="#">Reportes</Link></li>
            <li><Link href="#">Alertas de fraude</Link></li>
            <li><Link href="/admin/perfil">Mi perfil</Link></li>
            <li><Link href="#">Configuracion</Link></li>
            <li><Link href="/" style={{ color: 'red' }}>Cerrar sesion</Link></li>
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <h1>Bienvenido, {primerNombre}!</h1>
        <p>Aquí puedes administrar rifas, usuarios y monitorear el sistema.</p>
        <h1 className={styles.heading}>Panel de Administración</h1>

    <div className={styles.panelGrid}>
    <div className={styles.panel}>
      <h3>🎯 Administrar Rifas</h3>
      <p>Crea, edita y monitorea rifas activas.</p>
      <button onClick={irANuevaRifa} className={styles.panelBtn}>Crear rifa</button>
      <button onClick={irARifas} className={styles.panelBtn}>Ver rifas</button>
    </div>

    <div className={styles.panel}>
      <h3>👥 Gestión de Usuarios</h3>
      <p>Administra participantes y permisos.</p>
      <button onClick={irAGestionUsuarios} className={styles.panelBtn}>Ver usuarios</button>
    </div>

    <div className={styles.panel}>
      <h3>🔗 Blockchain</h3>
      <p>Consulta la trazabilidad de rifas registradas.</p>
      <button className={styles.panelBtn}>Auditar</button>
    </div>

    <div className={`${styles.panel} ${styles.alertPanel}`}>
      <h3>⚠️ Alertas Antifraude</h3>
      <p>Monitorea irregularidades detectadas por IA.</p>
      <button className={styles.alertBtn}>Ver alertas</button>
    </div>
    </div>
    </main>
    </div>
  );
}