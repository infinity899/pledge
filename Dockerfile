FROM pledgecamp/nodejs

WORKDIR /src
COPY . /src
RUN \
  npm i \
  && npm run build
