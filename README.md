# Aiursoft UtcTime.js

[![Pipeline](https://badge-proxy.aiursoft.com/aiursoft/utctime.js/badges/master/pipeline.svg)](https://gitlab.aiursoft.com/aiursoft/utctime.js/-/pipelines) [![npm](https://img.shields.io/npm/v/@aiursoft/utctime.js)](https://www.npmjs.com/package/@aiursoft/utctime.js)

Convert UTC timestamps to local time in browser pages.

<a name="utctimejs"></a> <a name="install"></a>

## Overview

### What is UtcTime.js?

Convert UTC timestamps to local time in browser pages.

## Installation

Install the package in your project:

```bash
npm install @aiursoft/utctime.js
```

Requires a browser with ES modules and the DOM. Node.js is needed to install or build the package, not to run the deployed browser assets.

## Usage

Save the following as `index.html` beside `node_modules/` and serve that directory over HTTP with your existing static-file server:

```html
<!doctype html>
<html lang="en">
  <meta charset="utf-8" />
  <title>UtcTime example</title>
  <body>
    <p data-utc-time="2018-09-12T10:12:24Z"></p>
    <script type="module">
      import UtcTime from './node_modules/@aiursoft/utctime.js/dist/esm/utctime.js'
      new UtcTime({})
    </script>
  </body>
</html>
```

The timestamp is read as UTC and displayed according to the browser locale.

```js
import UtcTime from './node_modules/@aiursoft/utctime.js/dist/esm/utctime.js'
new UtcTime({})
```

See [usage and options](docs/usage.md) for timestamp attributes and formatting.

### Timestamp attributes

Use `data-utc-time` by default, or select another attribute through `attr`. An ISO UTC value ending in `Z` makes the timezone explicit. Values without a UTC suffix are first tried as UTC; unparseable inputs fall back to normal browser date parsing with a warning. Invalid dates are not validated by a separate error callback.

### Tooltip integration

Use `onSet` to initialize a tooltip. It runs once for each matching element during construction; periodic text refreshes do not repeat that callback. Bootstrap and its tooltip JavaScript must be supplied by the application.

For Bootstrap 4 with jQuery:

```js
new UtcTime({
  onSet: function (element, date) {
    element.setAttribute('data-toggle', 'tooltip')
    element.setAttribute('data-trigger', 'hover')
    element.setAttribute('data-title', date.toLocaleString())
    $(element).tooltip()
  },
})
```

For Bootstrap 5:

```js
new UtcTime({
  onSet: function (element, date) {
    new bootstrap.Tooltip(element, {
      trigger: 'hover',
      placement: 'top',
      title: date.toLocaleString(),
    })
  },
})
```

## Configuration

Pass a partial settings object to the constructor. These are the complete defaults:

```js
new UtcTime({
  attr: 'data-utc-time',
  daysAgo: ' days ago',
  hoursAgo: ' hours ago',
  minutesAgo: ' minutes ago',
  secondsAgo: ' seconds ago',
  disableAgo: false,
  onSet: function (element, date) {},
  disableAutoUpdate: false,
  format: undefined,
})
```

**Formatting and priority**

A nonempty `format` has highest priority and supports `YYYY`, `MM`, `DD`, `HH`, `mm` and `ss`. These tokens currently use UTC fields, for example `YYYY-MM-DD HH:mm:ss`; they do not use local timezone fields. Without `format`, `disableAgo: true` uses `date.toLocaleString()`. Otherwise the library shows relative seconds, minutes, hours or days; future timestamps and timestamps at least 30 days old use a full localized date. Override the four suffixes for localization, for example `daysAgo: '天前'`.

**Updates and lifecycle**

By default the instance rescans matching DOM elements every second. `disableAutoUpdate: true` performs the initial update without scheduling that loop; later refreshes can call `instance.initTime(instance.defaultSettings)`. There is no dispose method for an already-started timer, so avoid creating repeated instances on a long-lived page. Configuration is passed in code, with no configuration file or environment variables.

## Development

Use Node.js 20 or a newer supported LTS release. The current build is verified with Node.js 24.

From the repository root, install the locked dependencies, run the existing checks and create a package:

```bash
npm ci
npm run check
npm pack
```

The existing checks run ESLint, Prettier and the production build. `npm pack` creates a local archive; it does not publish a release.

## Documentation

See [usage and options](docs/usage.md) for timestamp attributes and formatting.

## How to contribute

There are many ways to contribute to the project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

Even if you have push rights on the repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your workflow cruft out of sight.

We're also interested in your feedback on the future of this project. You can submit a suggestion or feature request through the issue tracker. To make this process more effective, we're asking that these include more information to help define them more clearly.

## License

Licensed under the [MIT License](LICENSE).
