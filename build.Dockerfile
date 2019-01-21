# Stage 1 - the build process
FROM node:9.6.1 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
