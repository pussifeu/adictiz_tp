/**
 * Controleur qui gère la vue formulaire.html
 */
'use strict';
angular
	.module('adictiz')
	.controller("FormulaireController",FormulaireController);

FormulaireController.$inject = ['$filter','$scope', 'LxDatePickerService', '$window', 'LxNotificationService'];
function FormulaireController($filter, $scope, LxDatePickerService, $window, LxNotificationService) {
	//declaration des vue modèle
	var vm = this;
	vm.enregistrerFormulaire = enregistrerFormulaire;
	vm.data = {};
	vm.dataTableTbody = [];
	if(angular.isDefined($window.localStorage["DATA_ARRAY"]))
		vm.dataTableTbody = JSON.parse($window.localStorage["DATA_ARRAY"]);
	//Watcher pour le language
	$scope.$watch(
		  function() { return $window.localStorage["NG_TRANSLATE_LANG_KEY"]; },
		  function(newval) {
			  		if(newval == "en_US") 
			  			vm.locale = "en";
			  		else
			  			vm.locale = "fr";
		  			vm.datePicker = {
		  	                input:{
		  	                    date_formatted: moment().locale(vm.locale).format('LL')
		  	                }
		  	        };
			  	
		  }
	);
	
	/**
	 * enregistrerFormulaire :  enregistre les données saisis dans le formulaire dans le localstorage du navigateur
	 */
	function enregistrerFormulaire(data, date, form){
		var oObject = {
		        nom: data.nom,
		        prenom: data.prenom,
		        email: data.email,
		        date_naissance: date
		};
		form.nom.$touched =  false;
		form.email.$touched = false;
		form.nom.$dirty = false;
		form.email.$dirty = false;
		vm.data = {};
		vm.dataTableTbody.push(oObject);	
		
		$window.localStorage["DATA_ARRAY"] = JSON.stringify(vm.dataTableTbody);
		LxNotificationService.success($filter('translate')('html.formulaire.message_success'));
    }
}
