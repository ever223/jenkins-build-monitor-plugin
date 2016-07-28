angular.
    module('buildMonitor.settings', [ 'buildMonitor.services', 'rzModule']).

    controller('controlPanel', ['$scope', 'cookieJar', 'townCrier',
        function ($scope, cookieJar, townCrier) {
            'use strict';

            $scope.settings.fontSize        = cookieJar.get('fontSize',        1);
            $scope.settings.numberOfColumns = cookieJar.get('numberOfColumns', 2);
            $scope.settings.colourBlind     = cookieJar.get('colourBlind',     0);

            $scope.fotOptions = {floor: 0.3, ceil: 2, step: 0.1, precision: 1};
            $scope.columnOptions = {floor: 2, ceil: 8, step: 1, precision: 0};

            angular.forEach($scope.settings, function(value, name) {
                $scope.$watch('settings.' + name, function(currentValue) {
                    cookieJar.put(name, currentValue);
                });
            });

            // that's the minimum viable product .. at its tiniest
            townCrier.uponNewVersion(function() {
                $scope.newVersionAvailable = true;
            });
        }]);