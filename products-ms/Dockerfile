FROM node:14.15.4-alpine

ENV HOME=/usr/src
WORKDIR ${HOME}/app

COPY ["./", "${HOME}/app/"]

RUN npm install --silent --progress=false --production

EXPOSE 3000

CMD ["npm", "run", "start"]