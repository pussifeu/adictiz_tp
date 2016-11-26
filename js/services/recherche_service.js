/**
 * Service qui lit le fichier json qui contient les données à afficher
 */
angular
  .module('recherche.module', [])
  .factory('RechercheService', rechercheService);
function rechercheService($http, $q) {
	  var oFactory = {
			  /**
			   * foction qui lit le fichier json
			   * jsonFIleNmae :  chemin du fichier en parametre
			   */
			  getImageByJsonFile: function(jsonFIleNmae) {
	              var defered = $q.defer();
	              $http.get(jsonFIleNmae)
	              .success(function(data) {
	            	  defered.resolve(data);
	              })
	              .error(function() {
	            	 defered.reject("error");
	              });
	              return defered.promise;
	          }
		  };
	  return oFactory; 
}
