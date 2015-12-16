// ChoicesService.js

(function () {

    var ChoicesService = function ($http) {

        var baseUrl = 'http://localhost:5040/api/Choices/';
        var optionsUrl = 'http://localhost:5040/api/Options/';
        var yearTermsUrl = 'http://localhost:5040/api/YearTerms/';


        var _getOptions = function () {
            return $http.get(optionsUrl)
              .then(function (response) {
                  return response.data;
              });
        };

        var _getYearTerms = function () {
            return $http.get(yearTermsUrl)
              .then(function (response) {
                  return response.data;
              });
        };


        var _getChoice = function (id) {
            return $http.get(baseUrl + id)
             .then(function (response) {
                 return response.data;
             });
        };

        var _getChoices = function () {
            return $http.get(baseUrl)
              .then(function (response) {
                  return response.data;
              });
        };

        var _addChoice = function (data) {
            return $http.post(baseUrl, data)
              .then(function (response) {
                  return response.data;
              });
        };

        var _deleteChoice = function (id) {
            return $http.delete(baseUrl + id)
              .then(function (response) {
                  return response.data;
              });
        };

        var _updateChoice = function (data) {
            return $http.put(baseUrl + data.StudentId, data)
              .then(function (response) {
                  return response.data;
              });
        };

        return {
            getChoice: _getChoice,
            getChoices: _getChoices,
            addChoice: _addChoice,
            deleteChoice: _deleteChoice,
            updateChoice: _updateChoice,
            getYearTerms: _getYearTerms,
            getOptions: _getOptions
        };
    };

    var module = angular.module("ChoicesModule");
    module.factory("ChoicesService", ChoicesService);

}());