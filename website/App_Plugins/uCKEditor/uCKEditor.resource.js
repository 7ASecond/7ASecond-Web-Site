angular.module('umbraco.resources').factory('uCKEditorResource', function ($q, $http, $log, umbRequestHelper, angularHelper) {
    return {

        getUniqueId: function (uniqueIdType) {
            return $http.get("backoffice/uCKEditor/uCKEditorApi/getUniqueId", {
                params: { uniqueIdType: uniqueIdType }
            });
        }

    };
})

