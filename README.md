# accepts-https

## Description
Detects if a domain responds to HTTPS requests. Supports only port 443. Detects socket errors, connection reset and connection refused. Almost full test coverage.

## Usage
```javascript
// initialization
const config = {
    timeout: 1000 // default value
}
const acceptsHttps = require('accepts-https')(config);

await acceptsHttps('google.com');
// true

await acceptsHttps('localhost');
// false
```

## License
MIT
