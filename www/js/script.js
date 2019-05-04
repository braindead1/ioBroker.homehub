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
                console.log(JSON.stringify(obj));

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
    var i = 0;
    var e, html;

    var sidebarTemplate = "<a id='nav{{id}}' href='#' class='{{#appendDivider}}mb-3{{/appendDivider}}'>{{#icon}}<img class='icon' src='/icons-mfd-svg/{{icon}}' />{{/icon}}{{name}}</a>";
    var contentTemplate = `
    <div id='content{{id}}'>
        {{#subcategories}}
            <fieldset class='mb-4'>
                <legend>{{name}}</legend>
                {{#items}}
                    <div class='hh d-flex'>
                        <div class='mr-auto'>{{#icon}}<img class='icon' src='/icons-mfd-svg/{{icon}}' />{{/icon}}{{name}}</div>
                        <div>
                            {{#states}}
                                <span class='info' style='display: none;'>{{prefix}}<span class='{{id}}'></span>{{suffix}}</span>
                            {{/states}}                            
                        </div>
                    </div>
                {{/items}}
            </fieldset>
        {{/subcategories}}
        {{#items}}
            <div class='hh d-flex'>
                <div class='mr-auto'>{{#icon}}<img class='icon' src='/icons-mfd-svg/{{icon}}' />{{/icon}}{{name}}</div>
                <div>
                    {{#states}}
                        <span class='info' style='display: none;'>{{prefix}}<span class='{{id}}'></span>{{suffix}}</span>
                    {{/states}}                            
                </div>
            </div>
        {{/items}}
    </div>`;

    // Seite aufbauen
    config['categories'].forEach(element => {
        i++;
        
        element['id'] = i;
        
        try {
            html = Mustache.to_html(sidebarTemplate, element).replace(/^\s*/mg, '');
            $('#sidebar').append(html);

            html = Mustache.to_html(contentTemplate, element).replace(/^\s*/mg, '');
            $('#content').append(html);
        } catch (_error) {
            e = _error;
            html = e.toString();
        }

        $('#sidebar a').on("click", function() {
            var id = $(this).attr('id').replace('nav', 'content');

            $('#sidebar a').removeClass('selected');
            $('#content>div').hide();

            $(this).addClass('selected');
            $('#' + id).show();
        });
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
    // Uhrzeit setzen
    setInterval(function(){
        date = new Date();
        $('#time').html(('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' Uhr');
    }, 1000);

    // Websocket aufbauen
    servConn.init(connOptions, connCallbacks);
});