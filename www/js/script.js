// Settings
var config = {
    'title': 'HomeHub',
    'initiated': false,
    'categories': [],
    'objects': [],
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
            if(config['initiated'] === true) {
                if(config['usedObjectIds'].includes(id)) {
                    config['objects'][id]['state'] = state;
                }
            }
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

    // Use callbacks to first fetch objects and then states
    fetchObjects(
        () => fetchStates(
            () => initializeVue()
        )
    );
}

function fetchObjects(callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    console.log('Fetching objects');

    servConn.getObjects(function (err, _objects) {
        console.log('Received objects.');

        if(_objects['system.adapter.homehub.0'] !== 'undefined') {
            console.log('Received configuration.');

            config['objects']['system.adapter.homehub.0'] = _objects['system.adapter.homehub.0'];

            config['categories'] = _objects['system.adapter.homehub.0']['native']['categories'];

            config['categories'].forEach(function(category, index) {
                if(category['subcategories'] !== undefined) {
                    category['subcategories'].forEach(function(subcategory, index) {
                        if(subcategory['items'] !== undefined) {
                            subcategory['items'].forEach(function(item, index) {
                                if(item['states'] !== undefined) {
                                    item['states'].forEach(function(state, index) {
                                        if(state['id'] !== undefined) {
                                            config['usedObjectIds'].push(state['id']);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                if(category['items'] !== undefined) {
                    category['items'].forEach(function(item, index) {
                        if(item['states'] !== undefined) {
                            item['states'].forEach(function(state, index) {
                                if(state['id'] !== undefined) {
                                    config['usedObjectIds'].push(state['id']);
                                }
                            });
                        }
                    });
                };
            });

            for (key in _objects) {
                if(config['usedObjectIds'].includes(key)) {
                    config['objects'][key] = _objects[key];
                }
            }
    
            callback();
        }
    });
}

function fetchStates(callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    console.log('Fetching states');

    servConn.getStates(function (err, _states) {
        console.log('Received states.');

        for (key in _states) {
            if(config['usedObjectIds'].includes(key)) {
                config['objects'][key]['state'] = _states[key];
            }
        }

        config.initiated = true;

        callback();
    });
}

function initializeVue() {
    console.log('Initializing Vue');

    // Initialize Vue
    var app = new Vue({
        el: '#app',
        store
    });
}


// jQuery events
$(document).ready(function () {
    // Initialize Websocket
    servConn.init(connOptions, connCallbacks);
});