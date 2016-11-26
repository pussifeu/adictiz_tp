/**
 * Service qui gère le changement de la langue, dans ce code qu'on definit quelle langue le site utilise
 */
angular
	.module('adictiz')
	.service('LocaleService', selectLangueService);

function selectLangueService($translate, LOCALES, $rootScope, tmhDynamicLocale) {
	var localesObj = LOCALES.locales;
	var _LOCALES_DISPLAY_NAMES = [];
	var currentLocale = $translate.proposedLanguage();
	var _LOCALES = Object.keys(localesObj);
	
	if (!_LOCALES || _LOCALES.length === 0) {
		console.error('There are no _LOCALES provided');
	}
	_LOCALES.forEach(pushLocales);

	//Service
	this.getLocaleDisplayName = function() {
		return localesObj[currentLocale];
	}
	this.setLocaleByDisplayName = function(localeDisplayName) {
		setLocale(_LOCALES[_LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)]);
	}
	this.getLocalesDisplayNames = function() {
		return _LOCALES_DISPLAY_NAMES;
	}

	// METHODS
	function checkLocaleIsValid(locale) {
		return _LOCALES.indexOf(locale) !== -1;
	}
	function pushLocales(locale) {
		_LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
	}
	/**
	 * setLocale :  definir la langue de l'application
	 */
	function setLocale(locale) {
		if (!checkLocaleIsValid(locale)) {
			console.error('Locale name "' + locale + '" is invalid');
			return;
		}
		currentLocale = locale;
		$translate.use(locale);
	}
}