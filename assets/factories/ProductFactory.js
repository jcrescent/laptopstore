app.factory('ProductFactory', ['$http', function($http) {
	
function ProductFactory(){
	var url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&sort=bestSellingRank.asc&show=bestSellingRank,color,customerReviewAverage,image,name,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,longDescription&pageSize=100&format=json"
	var factory;
	var cart = [];
	var total = 0;

	this.allProducts = function(callback){
		$http.get(url).then(function(results){
			factory = results.data.products
			callback(results.data);
		})
	}
	this.getItem = function(sku, callback){
		for (var i=0; i<factory.length; i++){
			if (factory[i].sku == sku){
				callback(factory[i]);
			}
		}
	}
	this.addToCart = function(item, callback){
		cart.push(item);
		callback(cart);
	}
	this.getCart = function(callback){
		callback(cart);
	}
	this.removeFromCart = function(item, callback){
		for(var i=0; i<cart.length; i++){
			if (cart[i].sku == item.sku){
				cart.splice(i, 1);
			}
		}
		callback(cart);
	}
	this.getTotal = function(callback){
		total = 0;
		for(var i=0; i<cart.length; i++){
			if(cart[i].onSale){
				total += cart[i].salePrice;
			}else{
				total += cart[i].regularPrice;
			}	
		}
		callback(total)
	}
	// to avoid making another api call
	this.hasProducts = function(){
		if(factory){
			return factory;
		}else{
			return false;
		}

	}
}
  return new ProductFactory();	
}]);