angular.module('app').directive('youtubeTrailer', function(ngDialog, $sce) {
	return{
		restrict: 'AE',
		scope: true,
		link: function(scope, elem, attrs) {
			scope.trailerUrl = $sce.trustAsResourceUrl('//www.youtube.com/embed/'+scope.movie.trailer+'?rel=0&autoplay=1&autohide=1&iv_load_policy=3');
			elem.bind('click', function() {
				ngDialog.open({ 
		        	template: '<iframe class="trailer-iframe" src="{{trailerUrl}}" frameborder="0" allowfullscreen></iframe>',
		        	plain: true,
		        	scope: scope,
		        	showClose: false,
		        	className: 'ngdialog-theme-plain trailer'
		        });
			});
		}
	};
});