# Node 22 officiel
FROM node:22-bullseye

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port Next.js
EXPOSE 3000

# Lancer Next.js
CMD ["npm", "run", "dev"]
