import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Define las rutas que deben estar protegidas
  const protectedRoutes = ['/admin', '/usuario'];

  // Si la ruta actual empieza con /admin o /usuario
  const isProtected = protectedRoutes.some((path) =>
    router.pathname.startsWith(path)
  );

  if (isProtected) {
    return (
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    );
  }

  // Si no es ruta protegida (por ejemplo el login), render normal
  return <Component {...pageProps} />;
}
