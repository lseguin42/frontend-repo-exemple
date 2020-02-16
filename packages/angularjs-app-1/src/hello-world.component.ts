import { $injector, Ng1CommonModule, Ng1WebComponent, angular } from 'angularjs-common';

const HelloWorldModule = angular
    .module('helloWorldModule', [Ng1CommonModule])
    .component('componentA', {
        template: '<div>{{ vm.name }}</div>',
        controller: ['SharedService', function (SharedService) {
          this.name = 'HelloWorld AngularJS (A)!';
        }],
        controllerAs: 'vm',
    })
    .run(() => console.log('AngularJS (module 1) is runing...'))
    .name;

$injector.loadNewModules([HelloWorldModule]);

export class HelloWorldComponent extends Ng1WebComponent {
  ng1Template = '<component-a></component-a>';
}
