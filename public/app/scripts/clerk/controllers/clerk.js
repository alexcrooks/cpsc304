(function (App) {
  'use strict';

  App.app.controller('ClerkCtrl', ['$scope', function ($scope) {
	$scope.state.controller = 'clerk'; 

	var refundForm = {
      data: {},
      errors: []
    };

    var testOrder = {
    	order_id: 123,
    	upc: 1
    }

    $scope.refund = function () {
      refundForm.errors = [];
      
      var selector = {order_id: refundForm.data.order_id, upc: refundForm.data.upc};
      App.collection.orderItem.loadOne(selector, function (orderItem) {
	    if (!orderItem) 
      	  return returnForm.errors.push('Invalid item to refund')
      	
      	var today = new Date();
      	console.log(today);
      	App.collection.order.loadOne(orderItem.order_id, function(order) {
			console.log(order.date);
			if (1) {
				var return_data = {order_id: order.order_id, date: today};
				App.collection.return.insert(return_data, function(returnData) {
					var returnItem_data = {return_id: return_data.id, upc: order_item.upc, quantity: order_item.quantity};
					App.collection.returnItem.insert(data, function(returnItem) {
						console.log('Happy!');
					});
					
				});
			}
      	});
       });
     }; 
	  
  }]);

})(window.App);
