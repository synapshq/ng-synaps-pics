var ngModule = require('./module');

ngModule.provider('SynapsPicsConfig', require('./provider'));
ngModule.factory('SynapsPics', require('./factory'));
ngModule.directive('synapsPics', require('./directive'));

module.exports = ngModule;
