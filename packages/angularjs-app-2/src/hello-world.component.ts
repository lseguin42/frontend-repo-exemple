import * as angular from 'angular';
import { $injector, Ng1CommonModule } from 'angularjs-common';

const HelloWorldModule2 = angular
    .module('helloWorldModule2', [Ng1CommonModule])
    .component('componentB', {
        template: '<div>{{ vm.name }}</div>',
        controller: ['SharedService', function (SharedService) {
          this.name = 'HelloWorld AngularJS (2)!';
        }],
        controllerAs: 'vm',
    })
    .run(() => console.log('AngularJS (module 2) is runing...'))
    .name;

$injector.loadNewModules([HelloWorldModule2]);

/* WebComponent Wrapper */
export class HelloWorldComponent extends HTMLElement {
  private $scope: angular.IScope;
  private root: JQLite;

  connectedCallback () {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.root = angular.element(this.shadowRoot as any);
    }

    const $compile = $injector.get('$compile');
    const $rootScope = $injector.get('$rootScope');
    const element = angular.element('<component-b></component-b>');

    this.$scope = $rootScope.$new(true);
    this.root.append(element);
    $compile(element)(this.$scope);
    this.$scope.$apply();
  }

  disconnectedCallback() {
    this.$scope.$destroy();
    this.shadowRoot.innerHTML = '';
  }
}
