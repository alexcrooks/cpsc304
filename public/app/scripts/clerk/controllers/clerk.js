(function (App) {
  'use strict';

  App.app.controller('ClerkCtrl', ['$scope', function ($scope) {
	$scope.state.controller = 'clerk'; 

	var refundForm = {
      data: {},
      errors: []
    };

    $scope.refundForm = refundForm;

    $scope.refund = function () {
      refundForm.errors = [];
      
      var orderItemData = {orderId: parseInt(refundForm.data.order_id), upc: parseInt(refundForm.data.upc)};
      console.log(orderItemData);
      App.collection.orderItem.loadOne(orderItemData, function (orderItem) {
	    if (!orderItem) { // || !orderItem.length
      	  return refundForm.errors.push('Invalid item to refund.');
      	}
      	
      	App.collection.order.loadOne({id: orderItem.orderId}, function(order) {
			console.log(order);
			if (moment().subtract(15,"days") >= moment(order.date)) {   //TODO
				var setReturnData = {orderId: order.id, date: moment().format(App.config.dbDateFormat)};
				App.collection.return.insert(setReturnData, function(returnData) {
					var returnItemData = {returnId: returnData.id, upc: orderItem.upc, quantity: orderItem.quantity};
					App.collection.returnItem.insert(returnItemData, function(returnItem) {
						console.log("return:", returnData);
						console.log("return Item:", returnItem)
						console.log('Happy!');
						App.collection.orderItem.delete(orderItemData, function(deletedOrderItem) {
							$scope.addAlert('Item successfully refunded!');
						})
					});
					
				});
			}
      	});
       });
     }; 
	  
  }]);

})(window.App);
