(function () {

    var auth = function($http, CacheFactory){ 

        // Set up service authentication parameters
        var base_url = "http://localhost:8000";
        //var base_url = "https://enigmatic-waters-7832.herokuapp.com";
        
        // Crear cache
        var profCache = CacheFactory.get('profCache');
        if (!profCache) {
            // Create local storage for application
            profCache = CacheFactory('profCache', {
                maxAge: 60 * 60 * 1000, // 1 hour,
                deleteOnExpire: 'aggressive',
                storageMode: 'localStorage'
            });
        }

        var loggedIn = function (token,id){
        	profCache.put('prof-token', token);
            profCache.put('id-user', id);
        };

        var getToken = function (){
        	return profCache.get('prof-token');
        };

        var getUser = function (){
            return profCache.get('id-user');
        };

        var isLoggedIn = function(){
        	var token = getToken();
        	if(token){
                return true;
        	} else {
        		return false;
        	}
        };
    
        var logOut = function(){
            profCache.remove('prof-token');
            profCache.remove('id-user');
        }

        return {
            loggedIn: loggedIn,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            getUser: getUser,
            logOut: logOut
        };
    };

    angular.module('ivcApp').factory('auth', ['$http', 'CacheFactory', auth]);

})();