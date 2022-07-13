FROM node:17


WORKDIR /usr/src/app

# Install app dependencies
# Make sure the lock file is copied too
COPY ./ ./

# Build
RUN npm ci && npm run rebuild:full

# Set the ports
EXPOSE 8080

# Run 11ty
ENTRYPOINT ["npm", "run"]
CMD ["serve"]
