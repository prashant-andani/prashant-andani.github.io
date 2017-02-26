angular.module('app')
    .filter('wordLimit', function () {
        return function (input) {
            var output = '';
            var words = input.split(' ');
            var limit = 100;
            if(words.length > limit){
                output = words[0];
                for(var i=1; i < limit; i++){
                    output += ' '+words[i];
                }
            } else {
                output = input;
            }

            return output;
        };
    });