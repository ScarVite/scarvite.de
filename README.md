# site

When Going into prod (note to myself)
```bash
# Disable Standard Configs
$ sudo a2dissite 000-default.conf
$ sudo a2dissite 000-default-le-ssl.conf

# Enable New Config
$ sudo a2ensite site.conf

```

> Website Running on ScarVite.de

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

