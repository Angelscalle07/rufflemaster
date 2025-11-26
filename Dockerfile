# --- Etapa 1: Build ---
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Generar build de producción
RUN npm run build


# --- Etapa 2: Runtime ---
FROM node:18-alpine

WORKDIR /app

# Copiar build ya generado
COPY --from=builder /app ./

# Exponer puerto donde Next corre en producción
EXPOSE 3000

# Correr la app en modo producción
CMD ["npm", "start"]
