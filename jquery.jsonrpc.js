(function($) {

$.extend({
    jsonrpc: function(options) {
        var defaultOpts = {};
        [ 'url', 'method', 'success', 'error' ]
            .forEach(function(name) {
                if (options[name]) defaultOpts[name] = options[name];
            });
        var emptyFn = function() {};
        if (typeof(defaultOpts.success) != 'function')
            defaultOpts.success = emptyFn;
        if (typeof(defaultOpts.error) != 'function')
            defaultOpts.error = emptyFn;

        var rpcid = 1;
        
        return function(options) {
            var postdata = {
                jsonrpc: '2.0',
                id: options.id || rpcid++,
                method: options.method || defaultOpts.method || '',
                params: options.params || {}
            };

            var cb_success = typeof(options.success) == 'function'
                ? options.success : defaultOpts.success;
            var cb_error = typeof(options.error) == 'function'
                ? options.error : defaultOpts.error;

            var ajaxopts = {
                url: options.url || defaultOpts.url,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(postdata),
                timeout: options.timeout ? options.timeout : 0,
                success: function(response) {
                    if (response && !response.error) {
                        return cb_success(response.result);
                    }
                    else if (response && response.error) {
                        return cb_error(response.error);
                    }
                    else {
                        return cb_error(response);
                    }
                },
                error: function(xhr, status, error) {
                    cb_error(error);
                    return;
                }
            };

            return $.ajax(ajaxopts);
        };
    }
});

})(jQuery);
