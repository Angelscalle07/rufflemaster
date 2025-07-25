import styles from '../styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  
  const router = useRouter();

  const IraRegistro = () => {
    router.push('/registrarse');
  };

  return (
    <div className={styles.container}>
    <div className={styles.logo}>
    <img src="/Logo rufflemaster.png" alt="Logo de Rufflemaster" className={styles.logoImg} />
    </div>

      <form className={styles.form}>
        <h2 className={styles.title}>Bienvenido</h2>
        <p className={styles.subtitle}>Ingresa tus credenciales para acceder a Rufflemaster.</p>
        <input type="email" placeholder="Correo" className={styles.input} />
        <input type="password" placeholder="Contraseña" className={styles.input} />
        <button className={styles.button}>Login</button>
        <button onClick={IraRegistro} type="button" className={styles.Registro}>Registrarse</button>
        <div className={styles.demoAccess}>
          <p>Admin: <strong>admin@gmail.com</strong> / (any password)</p>
          <p>Participante: <strong>participant@gmail.com</strong> / (any password)</p>
        </div>
      </form>
    </div>
  );
}
