import Head from 'next/head';
import styles from '../../styles/Perfil.module.css';

export default function PerfilUsuario() {
  return (
    <>
      <Head>
        <title>Mi perfil - RuffleMaster</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Mi perfil</h1>
        <p className={styles.subtitulo}>Administre su información personal y la configuración de su cuenta.</p>

        <div className={styles.card}>
          <h2 className={styles.seccion}>Información personal</h2>
          <p className={styles.descripcion}>
            Actualiza tu nombre y correo electrónico. Los cambios de contraseña se gestionan por separado por seguridad.
          </p>

          <form className={styles.formulario}>
        <label>Nombre completo</label>
        <input className={styles.input} type="text" placeholder="Admin User" />

        <label>Email</label>
        <input className={styles.input} type="email" placeholder="admin@rufflemaster.com" />

        <label>Contraseña actual (para cambios)</label>
        <input className={styles.input} type="password" placeholder="Introduce tu contraseña actual" />

        <label>Contraseña nueva</label>
        <input className={styles.input} type="password" placeholder="Opcional" />

        <label>Confirmar nueva contraseña</label>
        <input className={styles.input} type="password" placeholder="Confirmar contraseña" />

        <button className={styles.boton} type="submit">Guardar cambios</button>
    </form>
        </div>
      </div>
    </>
  );
}

