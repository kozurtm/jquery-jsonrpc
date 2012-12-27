(function($) {

$.extend({
    jsonrpc: function(options) {
        var defaultOpts = {};
        [ 'url', 'method', 'success', 'error' ].forEach(function(name) {
            if (options[name])
                defaultOpts[name] = options[name];
        });
        var emptyFn = function() {};
        if (typeof(defaultOpts.success) !== 'function')
            defaultOpts.success = emptyFn;
        if (typeof(defaultOpts.error) !== 'function')
            defaultOpts.error = emptyFn;
        
        var rpcid = 1;
        
        return function(options) {
            var sendData = {
                jsonrpc: '2.0',
                id: options.id || rpcid++,
                method: options.method || defaultOpts.method || '',
                params: options.params || {}
            };

            var cbSuccess = typeof(options.success) === 'function'
                ? options.success : defaultOpts.success;
            var cbError = typeof(options.error) === 'function'
                ? options.error : defaultOpts.error;

            var ajaxOpts = {
                url: options.url || defaultOpts.url || '/',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(sendData),
                timeout: options.timeout || 0,
                success: function(response) {
                    if (response && !response.error) {
                        return cbSuccess(response.result);
                    }
                    else if (response && response.error) {
                        return cbError(response.error);
                    }
                    else {
                        return cbError(response);
                    }
                },
                error: function(xhr, status, error) {
                    cbError(error);
                    return;
                }
            };

            return $.ajax(ajaxOpts);
        };
    },

    jsonrpcManager: function(options) {
        var jqxhr, request = $.jsonrpc(options);
        return {
            abort: function() {
                if (jqxhr) jqxhr.abort();
                jqxhr = null;
            },
            send: function(options) {
                if (jqxhr) jqxhr.abort();
                jqxhr = request(options);
            }
        };
    }
});

})(jQuery);
