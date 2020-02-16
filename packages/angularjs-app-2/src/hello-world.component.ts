import { Ng1CommonModule, Ng1WebComponent, angular } from 'angularjs-common';

const Ng1HelloWorldModule2 = angular
  .module('helloWorldModule2', [Ng1CommonModule])
  .component('componentB', {
      template: '<div>{{ vm.name }}</div>',
      controller: ['SharedService', function (_) {
        this.name = 'HelloWorld AngularJS (B)!';
      }],
      controllerAs: 'vm',
  })
  .run(() => console.log('AngularJS (module 2) is runing...'))
  .name;

export class HelloWorldComponent extends Ng1WebComponent {
  ng1Module = Ng1HelloWorldModule2;
  ng1Template = '<component-b></component-b>';
}