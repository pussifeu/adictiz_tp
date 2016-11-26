/**
 * app : config global de l'application
 */
'use strict';
angular
	.module("adictiz", [
		'lumx',
		'ui.router',
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ngAnimate',
		'pascalprecht.translate',
		'tmh.dynamicLocale',
		'recherche.module'
	])
	.config(routeConfig)
	.config(loadLanguageConfig)
	.config(localProviderDynamic)
	.constant('DEBUG_MODE', true)
	.constant('LOCALES', {
		'locales' : {
			'fr_FR' : 'Français',
			'en_US' : 'English'
		},
		'preferredLocale' : 'fr_FR'
	}).constant('_',
		 window._
	);

function localProviderDynamic(tmhDynamicLocaleProvider) {
	tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
}
//Charge le ressources et definir le language //
function loadLanguageConfig($translateProvider, DEBUG_MODE, LOCALES) {
	if (DEBUG_MODE) {
		$translateProvider.useMissingTranslationHandlerLog();
	}

	$translateProvider.useStaticFilesLoader({
		prefix : 'languages/locale-',
		suffix : '.json'
	});

	$translateProvider.preferredLanguage(LOCALES.preferredLocale);
	$translateProvider.useLocalStorage();
}
// Config pour le route //
function routeConfig($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url : "/home",
			templateUrl : "html/home.html",
			controller : "HomeController",
			controllerAs : 'vm'
		})
		.state('formulaire', {
			url : "/formulaire",
			templateUrl : "html/formulaire.html",
			controller : "FormulaireController",
			controllerAs : 'vm'
		})
		.state('recherche', {
			url : "/recherche",
			templateUrl : "html/recherche.html",
			controller : "RechercheController",
			controllerAs : 'vm'
		});
	$urlRouterProvider.otherwise('/home');
}