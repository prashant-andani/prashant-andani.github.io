angular.module('app')
    .filter('noParens', function () {
        return function (input) {
            input = input || '';
            var out = "";
            var inputSplit = input.split(" (");
            out = inputSplit[0];
            return out;
        };
    });