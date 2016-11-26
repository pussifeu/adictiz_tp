/**
 * directive qui créer l'element à choix multiple pour le choix d'une langue
 */
angular
  .module('adictiz')
  .directive('ngTranslateLanguageSelect', selectLangueDirective);
function selectLangueDirective(LocaleService) {
	var directive = {
			restrict: 'AE',
		      replace: true,
		      template: ''+
		        '<div class="language-select" ng-if="vm.visible">'+
		          '<label>'+
		            '{{"directives.language-select.Language" | translate}}:  '+
		          
		          '</label>'+
		          '<select ng-model="vm.currentLocaleDisplayName"'+
		          'ng-options="localesDisplayName for localesDisplayName in vm.localesDisplayNames"'+
		          'ng-change="vm.changeLanguage(vm.currentLocaleDisplayName)">'+
		        '</select>'+
		        '</div>'+
		      '',
		      controller: controllerDirective,
		      controllerAs: 'vm',
		      bindToController: true
	}
    return directive;
}
controllerDirective.$inject = ['LocaleService'];
function controllerDirective(LocaleService) {
	var vm = this;
	vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
	vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();
	vm.visible = vm.localesDisplayNames && vm.localesDisplayNames.length > 1;

	vm.changeLanguage = function (locale) {
      LocaleService.setLocaleByDisplayName(locale);
    };
  }
