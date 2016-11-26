/**
 * Controleur qui gère la vue recherche.html
 */
'use strict';
angular
	.module('adictiz')
	.controller("RechercheController", RechercheController)
	.filter("searchByCategorie",searchByCategorie)
	.filter("searchByKeyWord",searchByKeyWord)
	.filter("getAllCategories",getAllCategories);

RechercheController.$inject = ['$location','LxDialogService','$http', 'RechercheService', '$filter', '$scope'];
function RechercheController($location,LxDialogService, $http, RechercheService, $filter, $scope) {
	var vm = this;
	vm.dialogId = 'dialog-galerie';
	vm.index = 0;
	vm.isActive = isActive;
	vm.showPrev = showPrev;
	vm.showNext = showNext;
	vm.showPhoto = showPhoto;
	vm.openGallery = openGallery;
	/**
	 * Appel du service qui lit le fichier json
	 */
	RechercheService.getImageByJsonFile('jsondata/data_image.json').then(
			function(data){
				vm.categories = $filter('getAllCategories')(data);
				vm.datacategories = data;
				vm.datakeys = data;
				$scope.$watch('vm.categorie_selected',
					function(newval, oldval) {
						if (angular.isDefined(newval)) {
							var found = $filter('searchByCategorie')(data, newval);
							vm.datacategories = found;
						}
						else
							vm.datacategories = data;
						vm.galeries = _.intersection(vm.datacategories,vm.datakeys);
					}
				);
				$scope.$watch('vm.key', 
					function(newval, oldval){
						if((angular.isUndefined(newval)) || (newval === "")){
							vm.datakeys = data;
						}
						else{
							var found = $filter('searchByKeyWord')(data, newval);
							vm.datakeys = found;
						}
						vm.galeries = _.intersection(vm.datacategories,vm.datakeys);
						
				 });
			
			},
			function(error){
				console.log(error);
			}
	)
	/**
	 * isActive : indique l'image en cours
	 */
	function isActive(index) {
		return vm.index === index;
	}
	/**
	 * showNext :  affiche l'image precedente en cliquant sur la fleche gauche
	 */
	function showPrev() {
		vm.index = (vm.index > 0) ? --vm.index : vm.galeries.length - 1;
		vm.info = vm.galeries[vm.index];
	}
	/**
	 * showNext :  affiche l'image suivante en cliquant sur la fleche droite
	 */
	function showNext() {
		vm.index = (vm.index < vm.galeries.length - 1) ? ++vm.index : 0;
		vm.info = vm.galeries[vm.index];
	}
	/**
	 * showPhoto :  affiche des photos
	 */
	function showPhoto(index) {
		vm.index = index;
		vm.info = vm.galeries[vm.index];
	}
	/**
	 * openGallery :  ouvrir l'image dans un popup avec ses detail
	 */
	function openGallery(index){
		vm.index = index;
		vm.info = vm.galeries[vm.index];
        LxDialogService.open(vm.dialogId);
    }
}
/**
 * searchByCategorie : Fonction qui filtre les données par categorie
 * rertourne un tableau qui contient le resultat de filtre
 */
function searchByCategorie(){
	return function(array, categorie) {
		var output = [];
		if(array.length > 0){
		    for (var i=0; i<array.length; i++) {
		      if (array[i].categorie.toLowerCase() === categorie.valeur.toLowerCase()) {
		    	  output.push(array[i]);
		      }
		    }
	    }
	    return output;
	  }
}
/**
 * searchByKeyWord : Cherche les données par un mot clé donné
 * rertourne un tableau qui contient le resultat de recherche
 */
function searchByKeyWord() {
	return function(array, key) {
		var output = [];
		if(array.length > 0){
			for (var i = 0; i < array.length; i++) {
				var recherche = key.toLowerCase();
				if (array[i].desc.toLowerCase().indexOf(recherche) != -1){
					output.push(array[i]);
					continue;
				}
				if (array[i].tag.toLowerCase().indexOf(recherche) != -1){
					output.push(array[i]);
					continue;
				}
				if (array[i].nom.toLowerCase().indexOf(recherche) != -1){
					output.push(array[i]);
					continue;
				}
			}
		}
		return output;
	}
}
/**
 * getAllCategories :  retourne la liste des categories
 */
function getAllCategories() {
	return function(data) {
		if(data.length > 0){
			var categories = [], flags = [];
			for (var i = 0; i < data.length; i++) {
				if(flags[data[i].categorie]) continue;
			    flags[data[i].categorie] = true;
			    categories.push({valeur : data[i].categorie.charAt(0).toUpperCase() + data[i].categorie.substring(1).toLowerCase()});
			}
		}
		return categories;
	}
}