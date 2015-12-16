// Code goes here

(function () {

    var app = angular.module("ChoicesModule", []);

    var MainController = function ($scope, ChoicesService) {

        var _choice = {
             ChoiceId : ""
            , FirstChoiceOptionId : ""
            , FourthChoiceOptionId: ""
            , SecondChoiceOptionId: "" 
            , SelectionDate: ""
            , StudentFirstName: ""
            , StudentId: "" 
            , StudentLastName: ""
            , ThirdChoiceOptionId: ""
            , YearTermId: ""
        };

        var onGetAllComplete = function (data) {
            $scope.choices = data;
            $scope.optionChart = optionChart;
            optionChart();
        };

        var onGetAllError = function (reason) {
            $scope.error = "Could not get all choices.";
        };

        $scope.search = function () {
            ChoicesService.getChoices()
              .then(onGetAllComplete, onGetAllError);
        };

        $scope.getOptions = function () {
            ChoicesService.getOptions()
              .then(onGetAllOptionsComplete, onGetAllOptionsError);
        };

        var onGetAllOptionsError = function (reason) {
            $scope.error = "Could not get all options.";
        };

        $scope.optionNames = [];

        var onGetAllOptionsComplete = function (data) {
            $scope.options = data;
            for (var i = 0; i < $scope.options.length; i++) {
                $scope.optionNames[$scope.options[i].OptionId] = $scope.options[i].Title;
            }
        };

        $scope.getYearTerms = function () {
            ChoicesService.getYearTerms()
              .then(onGetAllYearTermsComplete, onGetAllYearTermsError);
        };

        var onGetAllYearTermsError = function (reason) {
            $scope.error = "Could not get all year terms.";
        };

        $scope.yearTermNames = [];

        var onGetAllYearTermsComplete = function (data) {
            $scope.yearTerms = data;
            for (var i = 0; i < $scope.yearTerms.length; i++) {
                $scope.yearTermNames[$scope.yearTerms[i].YearTermId] = $scope.yearTerms[i].Year + " - " + $scope.yearTerms[i].Term;
                if ($scope.yearTerms[i].IsDefault) {
                    $scope.data = {};
                    $scope.data.yearTermSelect = $scope.yearTerms[i].YearTermId;
                }
            }
        };


        var onFindComplete = function (data) {
            $scope.choice = data;
        };

        var onFindError = function (reason) {
            $scope.error = "Could not find a choice.";
        };

        $scope.findChoice = function (choiceId) {
            ChoicesService.getChoice(choiceId)
            .then(onFindComplete, onFindError);
        };

        var onAddComplete = function (data) {
            $scope.newChoice = data;

           _choice.ChoiceId= ""
           _choice.FirstChoiceOptionId = ""
           _choice.FourthChoiceOptionId = ""
           _choice.SecondChoiceOptionId = ""
           _choice.SelectionDate = ""
           _choice.StudentFirstName = ""
           _choice.StudentId = ""
           _choice.StudentLastName = ""
           _choice.ThirdChoiceOptionId = ""
           _choice.YearTermId = ""
        };

        var onAddError = function (reason) {
            $scope.error = "Could not add a choice.";
        };

        $scope.addChoice = function () {
            var data = {
                ChoiceId: $scope.choice.ChoiceId
                , FirstChoiceOptionId: $scope.choice.FirstChoiceOptionId
                , FourthChoiceOptionId: $scope.choice.FourthChoiceOptionId
                , SecondChoiceOptionId: $scope.choice.SecondChoiceOptionId
                , SelectionDate: $scope.choice.SelectionDate
                , StudentFirstName: $scope.choice.StudentFirstName
                , StudentId: $scope.choice.StudentId
                , StudentLastName: $scope.choice.StudentLastName
                , ThirdChoiceOptionId: $scope.choice.ThirdChoiceOptionId
                , YearTermId: $scope.choice.YearTermId
            }
            ChoicesService.addChoice(data)
            .then(onAddComplete, onAddError);
        };

        var onDeleteComplete = function (data) {
            $scope.choice = data;
            $("#dialog_delete").dialog();
            $scope.ChoiceId = 0;
        };

        var onDeleteError = function (reason) {
            $scope.error = "Could not delete choice.";
        };

        $scope.deleteChoice = function (choiceId) {
            ChoicesService.deleteChoice(choiceId)
            .then(onDeleteComplete, onDeleteError);
        };

        var onUpdateComplete = function (data) {
            $scope.choice = undefined;
            $("#dialog_update").dialog();
        };

        var onUpdateError = function (reason) {
            $scope.error = "Could not delete choice.";
        };

        $scope.updateChoice = function () {

            var data = {
                ChoiceId: $scope.choice.ChoiceId
                , FirstChoiceOptionId: $scope.choice.FirstChoiceOptionId
                , FourthChoiceOptionId: $scope.choice.FourthChoiceOptionId
                , SecondChoiceOptionId: $scope.choice.SecondChoiceOptionId
                , SelectionDate: $scope.choice.SelectionDate
                , StudentFirstName: $scope.choice.StudentFirstName
                , StudentId: $scope.choice.StudentId
                , StudentLastName: $scope.choice.StudentLastName
                , ThirdChoiceOptionId: $scope.choice.ThirdChoiceOptionId
                , YearTermId: $scope.choice.YearTermId
            }

            ChoicesService.updateChoice(data)
            .then(onUpdateComplete, onUpdateError);
        };

        var optionChart = function () {
            var optionSelections = [];

            for (var i = 0; i < $scope.options.length; i++) optionSelections[$scope.options[i].OptionId] = 0;

            for (var i = 0; i < $scope.choices.length; i++) {
                if ($scope.choices[i].YearTermId == $scope.data.yearTermSelect) {
                    optionSelections[$scope.choices[i].FirstChoiceOptionId]++;
                }
            }

            var options = [];
            
            for (var i = 0; i < $scope.options.length; i++) {
                options.push({name: $scope.options[i].Title, y: (optionSelections[$scope.options[i].OptionId]/$scope.choices.length)});
            }



            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'First Choice Option Selections'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Options',
                    colorByPoint: true,
                    data: options
                }]
            });
        };

        $scope.ChoiceId = 0;
        $scope.message = "All Choices";
        $scope.choice = _choice;
    };

    app.controller("MainController", MainController);
}());