FROM node:16.15

# Create app directory
WORKDIR /var/app

# Install packages
RUN apt-get update
RUN apt-get install -y nano
RUN apt-get install -y less
RUN apt-get install -y telnet

# Bundle app source
COPY . .

# copy environment file
COPY ./.env /var/.env

# NodeJS www Server
EXPOSE 3000

# entrypoint
COPY ./docker/nodejs_entrypoint.sh /entrypoint.sh
COPY ./docker/wait-for-it.sh /wait-for-it.sh
RUN chmod a+x /entrypoint.sh
RUN chmod a+x /wait-for-it.sh

# So we can easily run "ncu" to update the node_modules
RUN npm install -g npm-check-updates

# entrypoint
ENTRYPOINT /entrypoint.sh
