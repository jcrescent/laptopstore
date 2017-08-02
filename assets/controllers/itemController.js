app.controller("itemController", ['$scope', 'ProductFactory', '$location', '$routeParams', function($scope, ProductFactory, $location, $routeParams){
	$scope.item;
	$scope.cart;
	$scope.total;
	$scope.products;

	getItem = function(){
		ProductFactory.getItem($routeParams.sku, function(results){
    		$scope.item = results;
    	});
	}

	getCart = function(){
		ProductFactory.getCart(function(results){
			$scope.cart = results;
		})
	}

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

	$scope.addToCart = function(item){
		ProductFactory.addToCart(item, function(results){
			$scope.cart = results;
			getTotal();
		})
	}

	$scope.removeFromCart = function(item){
		ProductFactory.removeFromCart(item, function(results){
			$scope.cart = results;
		})
	}

	$scope.viewProduct = function(sku){
		$location.url(`product/${sku}`);
	}

	// function calls on page load
	getItem();
	getProducts();
	getCart();
	getTotal();
}])