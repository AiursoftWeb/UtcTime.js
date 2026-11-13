# UtcTime.js

[![Pipeline](https://badge-proxy.aiursoft.com/aiursoft/utctime.js/badges/master/pipeline.svg)](https://gitlab.aiursoft.com/aiursoft/utctime.js/-/pipelines) [![npm](https://img.shields.io/npm/v/@aiursoft/utctime.js)](https://www.npmjs.com/package/@aiursoft/utctime.js)

Convert UTC timestamps to local time in browser pages.

## Install

```bash
npm install @aiursoft/utctime.js
```

## Usage

```js
import UtcTime from './node_modules/@aiursoft/utctime.js/dist/esm/utctime.js'
new UtcTime({})
```

See [usage and options](docs/usage.md) for timestamp attributes and formatting.

## Development

Use Node.js 20 or a newer supported LTS release.

```bash
npm ci
npm run check
npm pack
```
