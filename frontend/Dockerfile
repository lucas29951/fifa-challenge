
FROM node:20 AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli \
    && npm install --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD npm start