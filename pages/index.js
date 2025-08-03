import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: correo,
          password: contraseña,
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje('✅ Inicio de sesión exitoso');
        setTimeout(() => {
          if (datos.usuario.rol === 'admin') {
            router.push('/admin/dashboard');
            localStorage.setItem('nombreUsuario', datos.usuario.nombre);
          } else {
            router.push('/usuario/dashboard');
            localStorage.setItem('nombreUsuario', datos.usuario.nombre);
          }
        }, 1500);        
      } else {
        setMensaje(`${datos.mensaje || datos.message || 'Error al iniciar sesión'}`);

      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  const IraRegistro = () => {
    router.push('/registrarse');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/Logo rufflemaster.png" alt="Logo de Rufflemaster" className={styles.logoImg} />
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Bienvenido</h2>
        <p className={styles.subtitle}>Ingresa tus credenciales para acceder a Rufflemaster.</p>
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required className={styles.input} />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className={styles.input} />
        <button type="submit" className={styles.button}>Login</button>
        <button onClick={IraRegistro} type="button" className={styles.Registro}>Registrarse</button>
        {mensaje && <p>{mensaje}</p>}
        <div className={styles.demoAccess}>
          <p>Admin: <strong>admin@gmail.com</strong> / (any password)</p>
          <p>Participante: <strong>participant@gmail.com</strong> / (any password)</p>
        </div>
      </form>
    </div>
  );
}

