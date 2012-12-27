jQuery JSON-RPC Plugin
==============

Usage
==============

    var rpc = $.jsonrpc({
      url: '/jsonrpc',
      method: 'sum',
      success: function(result) {
        console.log(result);
      },
      error: function(error) {
        console.log(error);
      }
    });
    rpc({ params: { a: 10, b: 20 } });
    // console => 30
    
    rpc({
      param: { a: 100, b: 200 },
      success: function(result) {
        alert(result);
      }
    });
    // alert => 300
    
    rpc({
      method: 'div',
      params: { a: 10, b: 2 }
    });
    // console => 5
    
    
    var rpcm = $.jsonrpcManager({
      url: '/jsonrpc',
      method: 'sum',
      success: function(result) {
        console.log(result);
      },
      error: function(error) {
        console.log(error);
      }
    });
    $('#buttonA').on('click', function(evt) {
      rpcm.send({
        params: { a: 10, b: 20 }
      });
    });
    $('#buttonB').on('click', function(evt) {
      rpcm.abort();
    })
