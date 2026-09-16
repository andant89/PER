# Application statique : aucun build, aucune dépendance npm.
# L'image ne contient que nginx et le dossier site/.
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Mon PER" \
      org.opencontainers.image.description="Plan d'études romand expliqué + fiches à imprimer pour la 1P" \
      org.opencontainers.image.licenses="MIT"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

# nginx:alpine tourne déjà en non-root pour les workers ; on reste sur le port 80
# à l'intérieur du conteneur, la publication se fait dans docker-compose.yml.
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
