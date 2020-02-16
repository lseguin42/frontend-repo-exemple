import { Ng1CommonModule, Ng1WebComponent, angular } from 'angularjs-common';

const Ng1HelloWorldModule = angular
  .module('helloWorldModule1', [Ng1CommonModule])
  .component('componentA', {
      template: '<div>{{ vm.name }}</div>',
      controller: ['SharedService', function (_) {
        this.name = 'HelloWorld AngularJS (A)!';
      }],
      controllerAs: 'vm',
  })
  .run(() => console.log('AngularJS (module 1) is runing...'))
  .name;

export class HelloWorldComponent extends Ng1WebComponent {
  ng1Module = Ng1HelloWorldModule;
  ng1Template = '<component-a></component-a>';
}
