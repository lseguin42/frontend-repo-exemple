import * as angular from 'angular';

export const Ng1CommonModule = angular
    .module('myCommonModule', [])
    .service('SharedService', function () {
      console.log('Init SharedService');
      return {
        doSomthing: () => console.log('do something...'),
      };
    })
    .run(() => console.log('AngularJS (CommonModule) is runing...'))
    .name;

export const $injector = angular.bootstrap('<div></div>', [Ng1CommonModule]);