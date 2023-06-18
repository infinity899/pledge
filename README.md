# Pledgecamp frontend

- [Contribution Guidelines](CONTRIBUTING.md)
- [Backend API docs](https://github.com/pledgecamp/pledgecamp-backend/blob/master/API_DOC.md)

## Environment setup
```
# Install npm/node first if necessary

npm install
```

### Compile and hot-reload for development
```
npm run serve
```

### Compile and minify for production
```
npm run build
```

### Lint and fix files
```
npm run lint
```

## Configuration

### Backend

VUE_APP_API_HOST is used to point to the backend API.
This should be set as an environment variable on the host. The default fallback is `http://localhost:5000`

### Translations

TBD - Translations of site copy are located in `src/translations/*.json`
English is selected by default.

## Docker

The `Toolchain`, whilst also building the app for storing artifacts in, installs
Nginx so that the end result can act for both demo and testing purposes. It's
main purpose is to save build time by having a set of dependencies relevant to
Pledgecamp needs ready installed.

Because the Dockerfile will by default serve a built version of the frontend
through Nginx, if you would like to serve the app dynamically, override the
initial Docker command with `/usr/bin/npm run serve`.
