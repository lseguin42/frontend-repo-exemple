import * as angular from 'angular';

export const Ng1CommonModule = angular
    .module('myCommonModule', [])
    .service('SharedService', function () {
      var value = 0;
      console.log('Init SharedService');
      return {
        get value() { return value },
        inc: () => value++,
      };
    })
    .run(() => console.log('AngularJS (CommonModule) is runing...'))
    .name;

export const $injector = angular.bootstrap('<div></div>', [Ng1CommonModule]);