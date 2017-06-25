module.exports = function () {
  this.useHttps = true;
  this.serviceUrl = 'img.synaps.pics';

  this.setServiceUrl = function (serviceUrl) {
    this.serviceUrl = serviceUrl;
  };

  this.setHttpsDisabled = function () {
    this.useHttps = false;
  };

  this.setHttpsEnabled = function () {
    this.useHttps = true
  };

  this.$get = function () {
    return this;
  };

};
