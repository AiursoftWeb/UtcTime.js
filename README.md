# UtcTime.js

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitlab.aiursoft.com/aiursoft/utctime.js/-/blob/master/LICENSE) [![Pipeline stat](https://gitlab.aiursoft.com/aiursoft/utctime.js/badges/master/pipeline.svg)](https://gitlab.aiursoft.com/aiursoft/utctime.js/-/pipelines) [![ManHours](https://manhours.aiursoft.com/r/gitlab.aiursoft.com/aiursoft/utctime.js.svg)](https://gitlab.aiursoft.com/aiursoft/utctime.js/-/commits/master?ref_type=heads) [![npm](https://img.shields.io/npm/v/@aiursoft/utctime.js?color=blue)](https://www.npmjs.com/package/@aiursoft/utctime.js) [![npm](https://img.shields.io/npm/dm/@aiursoft/utctime.js)](https://www.npmjs.com/package/@aiursoft/utctime.js)

`@aiursoft/utctime.js` is a JavaScript library which converts UTC time to local time easily.

## Installation

Run the following command to install the most recent version of `@aiursoft/utctime.js` from npm:

```sh
npm install @aiursoft/utctime.js
```

## Importing

## Reference JavaScript

You can import the library using the following code:

```html
<script type="module">
  import UtcTime from './node_modules/@aiursoft/utctime.js/dist/esm/utctime.js'
  new UtcTime({})
</script>
```

## How to build locally

```bash
npm install
npm run build
```

## How to use

Create an element.

```html
<p></p>
```

And change it like this.

```html
<p data-utc-time="9/12/2018 10:12:24 AM"><!-- In your tag the time shall be an UTC time --></p>
```

Add init the library.

```html
<script>
  new UtcTime({})
</script>
```

And open it now! The time will be converted to local time.

## API

```javascript
// Init with loop
new UtcTime({
  // We will try to select elements using the attr value. Default value is 'data-utc-time'.
  attr: 'data-utc-time',

  // Localization options. Default is ' days ago'
  daysAgo: '天前',

  // Localization options. Default is ' hours ago'
  hoursAgo: '小时前',

  // Localization options. Default is ' mintes ago'
  minutesAgo: '分钟前',

  // Localization options. Default is ' seconds ago'
  secondsAgo: '秒前',

  // Always display full local time and date (using toLocaleString()), not `some time` ago.
  disableAgo: false,

  // Provide a custom format string to display the date and time.
  // This takes the highest priority over `disableAgo` and the relative time logic.
  // Example: 'YYYY-MM-DD HH:mm:ss'.
  format: undefined,

  // After the content is replaced.
  onSet: function (element, date) {},

  // Disable auto update the value by seconds.
  disableAutoUpdate: false,
})
```

For example, to init bootstrap v4 tooltip:

```javascript
new UtcTime({
  onSet: function (element, date) {
    element.setAttribute('data-toggle', 'tooltip')
    element.setAttribute('data-trigger', 'hover')
    element.setAttribute('data-title', date.toLocaleString())
    $(element).tooltip()
  },
})
```

To init bootstrap v5 tooltip:

```javascript
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

## How to contribute

There are many ways to contribute to the project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

Even if you with push rights on the repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your workflow cruft out of sight.

We're also interested in your feedback on the future of this project. You can submit a suggestion or feature request through the issue tracker. To make this process more effective, we're asking that these include more information to help define them more clearly.
