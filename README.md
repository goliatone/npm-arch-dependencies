# archpm:

Install npm dependencies based on the OS CPU architecture.

## Getting Started

Install the module with: `npm install --save npm-arch-dependencies`.

### Specify your dependencies inside `package.json`

List the specific dependencies for each platform in your `package.json`, in the form of `os.arch() + 'Dependencies'`.

To include `raspi-io` and `johnny-five` in `arm` only:
```json
"armDependencies": {
    "johnny-five": "latest",
    "raspi-io": "latest"
}
```

Then run:

```
archpm
```

If you are running the command on a Raspbery Pi `archpm` will install `raspi-io` and `johnny-five`.

### npm install
Add `archpm` to the scripts section of `package.json`

```json
{
    "scripts": {
        "postinstall": "archpm",
        "start": ...
    }
}
```

## Code
In your source code, make sure you are as well importing code based on your architecture.

For example:
```js
const arch = require('os').arch();

class Button {
    constructor(config={pin:8}){
        if(arch === 'arm'){
            const five = require('johnny-five');
            this.relay = new five.Relay(config);
        } else {
            this.relay = {
                open: function(){},
                close: function(){}
            };
        }
    }
}
```

## Inspiration
Based on the work of [bertofer][bertofer].

## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.

[bertofer]:https://github.com/bertofer/npm-platform-dependencies
