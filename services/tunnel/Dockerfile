FROM node:14.19

ENV NODE_ENV=development

WORKDIR /app

COPY ["./package.json", "/app"]
COPY ["./tsconfig.json", "/app"]

RUN npm install

CMD [ "npm", "run", "start" ]
# CMD [ "/bin/ls", "-l" ]