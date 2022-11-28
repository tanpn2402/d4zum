FROM node:14.19

ENV NODE_ENV=development

WORKDIR /app

COPY ["./package.json", "/app"]

RUN npm install

RUN ["npm", "run", "build"]

CMD [ "npm", "run", "start" ]
# CMD [ "/bin/ls", "-l" ]