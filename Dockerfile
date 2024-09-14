### STAGE 1: Build ###
# FROM node:12.7-alpine AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# COPY ./ /app/
# RUN npm install
# COPY . .
# RUN node_modules/.bin/ng build --output-path==/app/dist/base --base-href /

### STAGE 2: Run ###
FROM nginx
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/base /usr/share/nginx/html

EXPOSE 8255
CMD ["nginx", "-g", "daemon off;"]

# # Estagio 1 - Será responsavel em construir nossa aplicação
# FROM node:latest as node
# WORKDIR /app
# COPY package.json /app/
# RUN npm i npm@7.23.0 -g
# RUN npm install
# COPY . /app/ZaBrazil_vw_oficial
# RUN npm run build

# # Estagio 2 - Será responsavel por expor a aplicação
# FROM nginx:1.13
# COPY --from=node /app/ZaBrazil_vw_oficial/dist/base /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 5220
# CMD ["nginx", "-g", "daemon off;"]
