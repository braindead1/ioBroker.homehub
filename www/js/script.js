// Settings
var connectionLink = location.origin;

var config = [];
var states = [];


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

            servConn.getObject('system.adapter.homehub.0', false, function (error, obj) {
                //console.log(JSON.stringify(obj));

                config['categories'] = obj['native']['categories']; 
                
                initPage();
            });

            servConn.getStates(function (err, _states) {
                var count = 0;
                for (var id in _states) {
                    count++;

                    updateState(id, _states[id]);
                }
                console.log('Received ' + count + ' states.');
                states = _states;

                $('#loading').hide();
                $('#wrapper').show();
            });
        } else {
            console.log('disconnected');
        }
    },
    onRefresh: function () {
        window.location.reload();
    },
    onUpdate: function (id, state) {
        setTimeout(function () {
            states[id] = state;

            updateState(id, state);
        }, 0);
    },
    onError: function (err) {
        window.alert(_('Cannot execute %s for %s, because of insufficient permissions', err.command, err.arg), _('Insufficient permissions'), 'alert', 600);
    }
};







function initPage(_objects) {
    var app = new Vue({
        el: '#app',
        watch: {},
        mounted() {},
        data: {
            config: config['categories']
        },
        methods: {}
    });

    $('#sidebar a').on("click", function() {
        var id = $(this).attr('id').replace('nav', 'content');

        $('#sidebar a').removeClass('selected');
        $('#content>div').hide();

        $(this).addClass('selected');
        $('#' + id).show();
    });

    $('#sidebar a').first().trigger('click');
}

function updateState(id, state) {
    if(id.includes('$') === true || id.includes('%') === true || state === null) {
        return;
    }

    selector = '.' + id.replace(/\./gi, '\\.');
    value = state.val;
    if (typeof value === "boolean"){
        value = value.toString();
    }

    $(selector).html(value).parent().show();
}


// jQuery events
$(document).ready(function () {
    // Websocket aufbauen
    servConn.init(connOptions, connCallbacks);
});