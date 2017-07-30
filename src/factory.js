var factory = function (SynapsPicsConfig) {
  var getSizeString = function (width, height, dpi) {
    var sizeParts = [];
    if (width || height) {
      if (width) {
        sizeParts.push('w_' + (width * dpi));
      }

      if (height) {
        sizeParts.push('h_' + (height * dpi));
      }
    }

    return sizeParts.join(',');
  };
  var protocol = SynapsPicsConfig.useHttps ? 'https' : 'http';
  var serviceUrl = protocol + '://' + SynapsPicsConfig.serviceUrl + '/';

  return {
    /**
     * Represents a book.
     * @constructor
     * @param {Object} options - Image options
     * @param {string} options.path - Path of image
     * @param {number} [options.width] - Width of resized image
     * @param {number} [options.height] - Height of resized image
     * @param {boolean} [options.retina=false] - Is retina
     * @param {string} [options.filters] - Filters
     */
    getImageUrl: function (options) {
      var dpi = options.retina ? 2 : 1;
      var params = [];

      var size = getSizeString(options.width, options.height, dpi);

      if (size) {
        params.push(size);
      }

      if (options.crop) {
        params.push('c_' + options.crop);
      }

      if (options.bg) {
        params.push('b_rgb:' + options.bg);
      }

      var pathParts = options.path.replace(/^\/+|\/+$/, '').split('/');
      var fileName = pathParts.pop();
      var realPath = pathParts.join('/');

      return serviceUrl + realPath + '/' + (params.length > 0 ? params.join(',') + '/' : '') + fileName;

    },

    getPlaceholderUrl: function (width, height, dpi) {
      var size = getSizeString(width, height, dpi);

      return serviceUrl + 'synaps/'+ size + ',c_fill/default-placeholder.png';
    }
  }
};

factory.$inject = ['SynapsPicsConfig'];

module.exports = factory;
