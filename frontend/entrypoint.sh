#!/usr/bin/env sh

# generate env.js; read the environment variables from docker
cat <<EOF > /usr/share/nginx/html/env.js
export const env = {
  port: "${BACKEND_PORT}",
  host: "${BACKEND_HOST}",
  pexelsAPIKey: "${PEXELS_API_KEY}"
};
EOF

# start nginx
exec "$@"
