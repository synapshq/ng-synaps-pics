var directive = function (SynapsPics) {
  return {
    restrict: 'A',
    scope: {
      image: '<synapsPics',
      width: '<',
      height: '<'
  },
    link: function (scope, element, attrs, modalCtrl) {
      function setImage(imageUrl) {
        var targetAttr = 'src';

        if ('asLink' in attrs) {
          targetAttr = 'href';
        }

        if ('asAttr' in attrs) {
          targetAttr = attrs.asAttr;
        }

        if ('asBackground' in attrs) {
          element.css('background-image', 'url(' + imageUrl + ')');
        } else {
          element.attr(targetAttr, imageUrl);
        }
      }

      var getLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
      };

      scope.$watch('image', function (image) {
        var placeholderUrl = SynapsPics.getPlaceholderUrl(scope.width, scope.height, ('retina' in attrs) ? 2 : 1);

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

          element.on('error', function () {
            setImage(placeholderUrl);
          })
        } else {
          setImage(placeholderUrl);
        }
      })
    }
  };
};

directive.$inject = ['SynapsPics'];

module.exports = directive;
