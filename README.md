# Funo

## Project setup

```bash
yarn install
npx cap update
npx cap sync
```

## Compiles and hot-reloads for development

### Web side development

```bash
yarn serve
```

### Android side development

```bash
yarn serve
```

add this part to `capacitor.config.json` file with changing url value with url which comes from yarn serve network value

```json
  "server": {
    "url": "http://192.168.1.156:8080/",
    "cleartext": true
  }
```

Then in andorid studio start applicaiton

## Build Application

```bash
yarn build
```

remove this part to `capacitor.config.json` file

```json
  "server": {
    "url": "http://192.168.1.156:8080/",
    "cleartext": true
  }
```

```bash
npx cap update
npx cap sync
```

then build apk in android studio

## Lints and fixes files

```bash
yarn lint
```
