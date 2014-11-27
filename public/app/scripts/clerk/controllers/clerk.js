(function (App) {
  'use strict';

  App.app.controller('ClerkCtrl', ['$scope', function ($scope) {
	$scope.state.controller = 'clerk'; 

	var refundForm = {
      data: {},
      errors: []
    };

    $scope.getOrders = function () {                                            
      return App.collection.order.getCustom(function (order) {
        return moment().subtract(15, 'days') <= moment(order.date);
      });
    };

    $scope.init = function () {
      var nop = function () {};
      App.collection.order.load({}, nop);
    };

    $scope.refundForm = refundForm;

    $scope.refund = function () {
      refundForm.errors = [];
      
      var orderItemData = {orderId: parseInt(refundForm.data.order_id), upc: parseInt(refundForm.data.upc)};
      App.collection.orderItem.loadOne(orderItemData, function (orderItem) {
	    if (!orderItem) { 
      	  return refundForm.errors.push('Invalid item to refund.');
      	}
      	
      	App.collection.order.loadOne({id: orderItem.orderId}, function(order) {
      		
      		

			if (moment().subtract(15,"days") <= moment(order.date)) {   
				var setReturnData = {orderId: order.id, date: moment().format(App.config.dbDateFormat)};
				App.collection.return.insert(setReturnData, function(returnData) {
					var returnItemData = {returnId: returnData.id, upc: orderItem.upc, quantity: orderItem.quantity};
					App.collection.returnItem.insert(returnItemData, function(returnItem) {
						App.collection.orderItem.delete(orderItemData, function(deletedOrderItem) {
							$scope.addAlert('Item successfully refunded!');
						})
					});
					
				});
			} else return refundForm.errors.push('Unable to refund: Purchase occured over 15 days ago');
      	});
       });
     }; 
	  
    $scope.init();

  }]);

})(window.App);
