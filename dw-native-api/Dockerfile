FROM node:14.17

WORKDIR /app

RUN apt-get update && apt-get -y install curl unzip

RUN curl -L -o dw.zip https://github.com/mulesoft-labs/data-weave-native/releases/download/v1.0.9/dw-1.0.9-Linux.zip && \
  unzip dw.zip -d .dw/ && rm dw.zip && \
  echo 'export PATH=/app/.dw/bin:$PATH' >> .bashrc

RUN chmod -R go+rx /app

COPY app/ .

EXPOSE 8000

CMD ["npm", "start"]