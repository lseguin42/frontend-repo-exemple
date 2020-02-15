import * as angular from 'angular';

const HelloWorldModule = angular
    .module('helloWorldModule', [])
    .component('helloWorld', {
        template: '<div>{{ vm.name }}</div>',
        controller: function () {
          this.name = 'HelloWorld AngularJS!';
        },
        controllerAs: 'vm',
    })
    .run(() => console.log('AngularJS is runing...'))
    .name;

const $injector = angular.bootstrap('<div></div>', [HelloWorldModule]);

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
    const element = angular.element('<hello-world></hello-world>');

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
