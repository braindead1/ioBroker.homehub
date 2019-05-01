$(document).ready(function () {
    //initPage();

    setInterval(function(){
        // Uhrzeit setzen
        date = new Date();
        $('#time').html(('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' Uhr');
    }, 1000);
});

function initPage(_objects) {
    var i = 0;
    var e, html;

    var sidebarTemplate = "<a id='nav{{id}}' href='#' class='{{#appendDivider}}mb-3{{/appendDivider}}'>{{name}}</a>";
    var contentTemplate = `
    <div id='content{{id}}'>
        {{#subcategories}}
            <fieldset class='mb-4'>
                <legend>{{name}}</legend>
                {{#items}}
                    <div class='hh d-flex'>
                        <div class='mr-auto'>{{name}}</div>
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
                <div class='mr-auto'>{{name}}</div>
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

            //console.log(id);

            $('#sidebar a').removeClass('selected');
            $('#content>div').hide();

            $(this).addClass('selected');
            $('#' + id).show();
        });
    });

    $('#sidebar a').first().trigger('click');

    // Uhrzeit setzen
    date = new Date();
    $('#time').html(('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' Uhr');
}

function updateState(id, state) {
    if(id.includes('$') === true || id.includes('%') === true || state === null) {
        return;
    }

    if(id === 'hm-rpc.1.NEQ1833684.1.STATE') {
        console.log(id + " --> " + JSON.stringify(state));
    }

    selector = '.' + id.replace(/\./gi, '\\.');
    value = state.val;
    if (typeof value === "boolean"){
        value = value.toString();
    }

    $(selector).html(value).parent().show();
}