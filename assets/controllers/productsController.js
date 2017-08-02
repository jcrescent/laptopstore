app.controller("productsController", ['$scope', 'ProductFactory', '$location', function($scope, ProductFactory, $location){
	$scope.products = [];
	$scope.cart = [];
	$scope.cartSkus = [];
	$scope.total;

	// beginning of some unfinished code
		// $scope.isOnSale = function(item) { 
		// 	return !item.registered 
		// }

	getTotal = function(){
		ProductFactory.getTotal(function(results){
			$scope.total=results;
		})
	}

	getProducts = function(){
		if (ProductFactory.hasProducts()){
			$scope.products = ProductFactory.hasProducts()
		}else{
			ProductFactory.allProducts(function(results){
    			$scope.products = results.products;
    		});
		}
	}
	
	getCart = function(){
		ProductFactory.getCart(function(results){
			$scope.cart = results;
		})
	}

	$scope.viewProduct = function(sku){
		$location.url(`product/${sku}`);
	}

	$scope.removeFromCart = function(item){
		ProductFactory.removeFromCart(item, function(results){
			$scope.cart = results;
			for(var i=0; i<$scope.cartSkus.length;i++){
				if(item.sku == $scope.cartSkus[i]){
					$scope.cartSkus.splice(i,0);
				}
			}
		})			
		skuArray($scope.cart);
		getTotal();
	}

	$scope.addToCart = function(item){
		ProductFactory.addToCart(item, function(results){
			$scope.cart = results;
		})
	}

	$scope.showCart = function(){
		$location.url('/cart')
	}

	// building array of skus to compare to skus in cart
	skuArray = function(cart){
		$scope.cartSkus =[];
		for (var i=0; i<cart.length; i++){
			$scope.cartSkus.push(cart[i].sku);
		}
	}

	// function calls on page load
	getCart();
	skuArray($scope.cart);
	getProducts();
	getTotal();
}])