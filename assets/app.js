var app = angular.module('app', ['ngRoute', 'ngCookies','ngMaterial', 'ngAnimate']);
app.config(function ($routeProvider) {
$routeProvider
	.when('/', {
		templateUrl: "partials/products.html",
		controller: "productsController"
	})
	.when('/product/:sku',{
		templateUrl: 'partials/show.html',
		controller: "itemController"
	})
	.when('/cart', {
		templateUrl: 'partials/cart.html',
		controller: "productsController"
	})
	.otherwise('/')
})
