/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

var adapterName    = require(__dirname + '/package.json').name.split('.').pop();

var utils          = require('@iobroker/adapter-core'); // Get common adapter utils
var adapter        = new utils.Adapter(adapterName);
var fs             = require('fs');
var path           = require('path');

var configJsPath = path.join(__dirname, "www/config.js");

adapter.on('ready', function () {
    main();
});

function main() {
    var data = "var config = ";

    if (adapter.config.configuration === undefined || adapter.config.configuration === '') {
        adapter.log.error('Configuration is missing');

        return;
    } else {
        adapter.log.info('Configuration found');
    }

    data = data + adapter.config.configuration;

    fs.writeFileSync('/opt/iobroker/iobroker-data/files/homehub/config.js', data);
}