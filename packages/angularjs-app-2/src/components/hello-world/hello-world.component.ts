import { Ng1CommonModule, Ng1WebComponent, Bind, Attach, angular } from 'angularjs-common';
import template from './hello-world.component.html';
import stylesheet from './hello-world.component.less';

const Ng1HelloWorldModule2 = angular
  .module('helloWorldModule2', [Ng1CommonModule])
  .component('componentB', {
    template,
    controller: ['SharedService', function (SharedService) {
      this.name = 'HelloWorld AngularJS (B)!';
      this.SharedService = SharedService;
    }],
    bindings: {
      foo: '=',
      onAction: '&'
    },
    controllerAs: 'vm',
  })
  .run(() => console.log('AngularJS (module 2) is runing...'))
  .name;

export class HelloWorldComponent extends Ng1WebComponent {
  ng1Module = Ng1HelloWorldModule2;
  ng1Stylesheet = stylesheet;
  ng1Template = `<component-b
    foo="$ctrl.foo"
    on-action="$ctrl.onAction($event)"
  ></component-b>`;

  @Bind() foo: string = 'my-default-value';

  @Attach()
  protected onAction(data) {
    this.dispatchEvent(new CustomEvent('MyAction', { detail: data }));
  }
}