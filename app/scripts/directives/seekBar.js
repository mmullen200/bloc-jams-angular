(function() {
    /* For directives, the callback function (in this case, seekBar) is a factory function. It returns an object that describes the directive's behavior to Angular's HTML compiler. This object communicates the behavior through options. */
    function seekBar($document) {
        var calculatePercent = function (seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
          
            // Specifies a URL from which the directive will upload a template
            templateUrl: '/templates/directives/seek_bar.html',
            /* Specifies what the template should replace. If true, the template replaces the directive's element. If false, the template replaces the contents of the directive's element */
            replace: true,
            /* Restricts the directive to a specific declaration style: elements */
            restrict: 'E',
            // The & is a type of directive scope binding. There are three types: @, =, &. The & binding provides a way to execute an expression in the context of the parent scope.
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                
                // scope.value holds the value of the seek bar, such as the currently playing song time or the current volume. Default value is 0.
                scope.value = 0;
                // scope.max holds the maximum value of the song and volume seek bars.      Default value is 100.
                scope.max = 100;
                
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue){
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue){
                   scope.max = newValue; 
                });
                
                // percentString() is a function that calculates a percent based on the value and maximum value of a seek bar.
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                
                // scope.fillStyle() returns the width of the seek bar fill element based on the calculated percent.
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function() {
                  return {left: percentString()};  
                };
                
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                       var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                        scope.value = percent * scope.max;
                        notifyOnChange(scope.value);
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
                
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();