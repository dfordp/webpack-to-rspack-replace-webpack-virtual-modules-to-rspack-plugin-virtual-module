Change import from webpack-virtual-modules to rspack-plugin-virtual-module.

### Before

```ts
// change import module from webpack-virtual-modules to rspack-plugin-virtual-module
//track the variable which is being assigning to the modules
var VirtualModulesPlugin = require('webpack-virtual-modules');

module.exports = {
  // ...
  plugins: [
    //change to respective assigned variable
    new VirtualModulesPlugin({
      // ...
    }),
  ],
};
```

### After

```ts
var RspackVirtualModulePlugin = require('rspack-plugin-virtual-module');

module.exports = {
  // ...
  plugins: [
    new RspackVirtualModulePlugin({
      // ...
    }),
  ],
};
```

