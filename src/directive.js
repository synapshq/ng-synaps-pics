var directive = function (SynapsPics) {
  return {
    restrict: 'A',
    scope: {
      image: '<synapsPics',
      width: '<',
      height: '<'
  },
    link: function (scope, element, attrs, modalCtrl) {
      var srcsetSupported = 'srcset' in document.createElement('img');
      var lazy = 'lazy' in attrs;

      function setImage(imageUrl) {
        var targetAttr = 'src';

        if ('asLink' in attrs) {
          targetAttr = 'href';
        }

        if ('asAttr' in attrs) {
          targetAttr = attrs.asAttr;
        }

        var showImage = function () {
          if ('asBackground' in attrs) {
            element.css('background-image', 'url(' + imageUrl + ')');
          } else {
            element.attr(targetAttr, imageUrl);
          }
        };

        if (lazy) {
          if (checkInViewport()) {
            showImage();
          } else {
            angular.element(window).on('scroll resize', function () {
              if (checkInViewport()) {
                angular.element(window).off('scroll resize', this);
                showImage();
              }
            });
          }
        } else {
          showImage();
        }
      }

      var getLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
      };

      scope.$watch('image', function (image) {
        var placeholderUrl = SynapsPics.getPlaceholderUrl(scope.width, scope.height, ('retina' in attrs) ? 2 : 1);

        element.on('error', function () {
          element.off('error');
          setImage(placeholderUrl);
        });

        if (image) {
          var imageUrl = SynapsPics.getImageUrl({
            path: getLocation(image).pathname,
            width: scope.width,
            height: scope.height,
            retina: ('retina' in attrs),
            crop: attrs.crop || 'fill',
            bg: attrs.bg
          });

          setImage(imageUrl);
        } else {
          setImage(placeholderUrl);
        }
      });

      var checkInViewport = function () {
        var el = element[0];
        var lazyDistance = ~~(attrs.lazy);

        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        var isVisible = (elemTop >= document.body.scrollTop - lazyDistance) && (elemBottom <= window.innerHeight);
        return isVisible;
      };

    }
  };
};

directive.$inject = ['SynapsPics'];

module.exports = directive;
