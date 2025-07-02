import styles from './Usuarios.module.css';

const Usuarios = () => {
  const usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@correo.com', rol: 'Participante' },
    { id: 2, nombre: 'Laura Gómez', email: 'laura@correo.com', rol: 'Administrador' },
    { id: 3, nombre: 'Carlos Díaz', email: 'carlos@correo.com', rol: 'Participante' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Gestión de Usuarios</h1>
      <p className={styles.subtitulo}>Administra los usuarios registrados y sus permisos.</p>

      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td className={styles.acciones}>
                <button className={styles.btnEditar}>✏️ Editar</button>
                <button className={styles.btnEliminar}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
