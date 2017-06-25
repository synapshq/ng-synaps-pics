# ng-synaps-pics
Synaps.pics bindings for AngularJS

## Installation

With npm:

```
npm install --save ng-synaps-pics
```

## Usage

```html
<img synaps-pics="$ctrl.imageUrl" width="300" height="200" crop="fit" retina>
```

```html
<div class="hero" synaps-pics="$ctrl.imageUrl" height="400" retina as-background>
```

### Attributes

_Details will come here..._

### Global configurations

```
angular.module('myModule', ['synaps.pics'])
    .config(function (SynapsPicsConfigProvider) {
        SynapsPicsConfigProvider.setHttpsDisabled(); // use http instead of https

        SynapsPicsConfigProvider.setServiceUrl('my.image.alias.com'); // default is: img.synaps.pics
    });
```