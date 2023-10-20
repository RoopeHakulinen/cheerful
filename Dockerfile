FROM node:21-alpine as frontend

ENV NODE_ENV build

USER node

COPY --chown=node:node ./frontend /home/node/frontend

WORKDIR /home/node/frontend

RUN npm ci --force && npm run build


FROM node:21-alpine as backend

ENV NODE_ENV build

USER node

COPY --chown=node:node ./backend /home/node/backend

WORKDIR /home/node/backend

RUN npm ci --force \
    && npm run build \
    && npm prune --production

FROM node:21-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=backend /home/node/backend/package*.json /home/node/
COPY --from=backend /home/node/backend/node_modules/ /home/node/node_modules/
COPY --from=backend /home/node/backend/dist/ /home/node/dist/
COPY --from=frontend /home/node/frontend/dist/frontend /home/node/dist/public

CMD ["node", "dist/src/main.js"]