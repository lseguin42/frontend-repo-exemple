import { $injector, Ng1CommonModule, Ng1WebComponent, angular } from 'angularjs-common';

const HelloWorldModule2 = angular
    .module('helloWorldModule2', [Ng1CommonModule])
    .component('componentB', {
        template: '<div>{{ vm.name }}</div>',
        controller: ['SharedService', function (SharedService) {
          this.name = 'HelloWorld AngularJS (B)!';
        }],
        controllerAs: 'vm',
    })
    .run(() => console.log('AngularJS (module 2) is runing...'))
    .name;

$injector.loadNewModules([HelloWorldModule2]);

export class HelloWorldComponent extends Ng1WebComponent {
  ng1Template = '<component-b></component-b>';
}