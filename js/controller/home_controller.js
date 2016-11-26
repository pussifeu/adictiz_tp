/**
 * Controleur qui gère la vue home.html
 */
'use strict';
angular
	.module('adictiz')
	.controller("HomeController", HomeController);
HomeController.$inject = ['$filter','$scope', '$location', 'RechercheService', '$window'];
function HomeController($filter, $scope, $location, RechercheService, $window) {
	var vm = this;
	//Watcher pour le language
	$scope.$watch(
			  function() { return $window.localStorage["NG_TRANSLATE_LANG_KEY"]; },
			  function(newval) {
				  		if(newval == "en_US") {
				  			RechercheService.getImageByJsonFile('jsondata/data_about_me_english.json').then(
				  					function(data){
				  						vm.about_me = data[0];
				  					},
				  					function(error){
				  						console.log(error);
				  					}
				  			)
				  		}
				  		else{
				  			RechercheService.getImageByJsonFile('jsondata/data_about_me.json').then(
				  					function(data){
				  						vm.about_me = data[0];
				  					},
				  					function(error){
				  						console.log(error);
				  					}
				  			)
				  		}
				  			
				  	
			  }
	);
	
  	
}