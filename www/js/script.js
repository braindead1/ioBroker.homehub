// Settings
var config = {
    'title': 'HomeHub',
    'initiated': false,
    'categories': [],
    'states': []
};

var connectionLink = location.origin;


// Vuex
const store = new Vuex.Store({
    state: config,
    /*mutations: {
        setStates(state, _states) {
            state.states = _states
        },
        updateState(state, payload) {
            
        }
    }*/
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
    config['states'] = [];

    // Use callbacks to first fetch configuration and then states
    fetchStates(
        fetchConfiguration()
    );
}

function fetchConfiguration(callback) {
    console.log('Fetching configuration');

    servConn.getObject('system.adapter.homehub.0', false, function (error, obj) {
        console.log('Received configuration.');

        config['categories'] = obj['native']['categories'];

        if(callback) callback();
    });
}

function fetchStates(callback) {
    console.log('Fetching states');

    servConn.getStates(function (err, _states) {
        console.log('Received states.');

        //store.commit('setStates', _states);
        config['states'] = _states;

        config.initiated = true;

        if(callback) callback();
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