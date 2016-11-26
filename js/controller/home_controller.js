/**
 * Controleur qui gère la vue home.html
 */
'use strict';
angular
	.module('adictiz')
	.controller("HomeController", HomeController);
HomeController.$inject = ['$filter','$scope', '$location'];
function HomeController($filter,$scope, $location) {
	var vm = this;

  	//this.splitLocation = $location.$$absUrl.split("#");
  	//console.log(this.splitLocation)
	vm.name = $filter('translate')('HELLO_WORLD');
	$scope.$watch(
            function() { return $filter('translate')('HELLO_WORLD'); },
            function(newval) {
            	vm.name = newval;
            }
    );
}