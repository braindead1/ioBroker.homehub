// Settings
var config = {
    'title': 'HomeHub',
    'initiated': false,
    'categories': [],
    'objects': [],
    'states': [],
    'usedObjectIds': []
};

var connectionLink = location.origin;


// Vuex
const store = new Vuex.Store({
    state: config
});


// Websocket
servConn._useStorage = false;

connOptions = {
    name: 'HomeHub',  // optional - default 'vis.0'
    connLink: connectionLink,  // optional URL of the socket.io adapter
    socketSession: '' // optional - used by authentication
};
connCallbacks = {
    onConnChange: function (isConnected) {
        if (isConnected) {
            console.log('connected');

            initializeHomehub();
        } else {
            console.log('disconnected');
        }
    },
    onRefresh: function () {
        window.location.reload();
    },
    onUpdate: function (id, state) {
        setTimeout(function () {
            config['states'][id] = state;
        }, 0);
    },
    onError: function (err) {
        window.alert(_('Cannot execute %s for %s, because of insufficient permissions', err.command, err.arg), _('Insufficient permissions'), 'alert', 600);
    }
};

function initializeHomehub(){
    console.log('Initializing HomeHub');

    // Reset everything
    config['initiated'] = false;
    config['categories'] = [];
    config['objects'] = [];
    config['states'] = [];

    // Use callbacks to first fetch configuration and then states
    fetchStates(
        fetchObjects(
            fetchConfiguration()
        )
    );
}

function fetchConfiguration(callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    console.log('Fetching configuration');

    servConn.getObject('system.adapter.homehub.0', false, function (error, obj) {
        console.log('Received configuration.');

        config['categories'] = obj['native']['categories'];

        callback;
    });
}

function fetchObjects(callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    console.log('Fetching objects');

    servConn.getObjects(function (err, _objects) {
        console.log('Received objects.');

        config['objects'] = _objects;

        callback;
    });
}

function fetchStates(callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    console.log('Fetching states');

    servConn.getStates(function (err, _states) {
        console.log('Received states.');

        config['states'] = _states;

        config.initiated = true;

        callback;
    });
}


// jQuery events
$(document).ready(function () {
    // Initialize Vue
    var app = new Vue({
        el: '#app',
        store
    });

    // Initialize Websocket
    servConn.init(connOptions, connCallbacks);
});