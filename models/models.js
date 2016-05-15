/*
* @Author: steve
* @Date:   2016-04-11 16:19:44
* @Last Modified by:   steve
* @Last Modified time: 2016-05-12 00:19:27
*/

(function () {

	var baseURL= 'http://rest-api-ivc.mybluemix.net';

    angular.module('ivcApp').factory('Entidad', function ($resource, auth) {
    	return $resource(baseURL+'/api/Entidades/:id_entidad?access_token='+auth.getToken());
	});

	angular.module('ivcApp').factory('Dependencia', function ($resource, auth) {
    	return $resource(baseURL+'/api/Dependencias?access_token='+auth.getToken());
	});

})();