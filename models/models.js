/*
* @Author: steve
* @Date:   2016-04-11 16:19:44
* @Last Modified by:   steve
* @Last Modified time: 2016-06-07 11:25:56
*/

(function () {

	var baseURL= 'http://rest-api-ivc.mybluemix.net';

    angular.module('ivcApp').factory('Entidad', function ($resource, auth) {
    	return $resource(
    		baseURL+'/api/Entidades/:id_entidad?access_token='+auth.getToken(),
    		null,
    		{
    			'update' : {method:'PUT'}
    		}
    	);
	});

	angular.module('ivcApp').factory('Dependencia', function ($resource, auth) {
    	return $resource(
            baseURL+'/api/Dependencias/:id_dependencia?access_token='+auth.getToken(),
            null,
            {
                'update' : {method:'PUT'}
            }
        );
	});

    angular.module('ivcApp').factory('Funcionario', function ($resource, auth) {
        return $resource(
            baseURL+'/api/Funcionarios/:id_funcionario?access_token='+auth.getToken(),
            null,
            {
                'update' : {method:'PUT'}
            }
        );
    });

})();