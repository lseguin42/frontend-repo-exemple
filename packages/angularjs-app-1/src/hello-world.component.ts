import * as angular from 'angular';

class HelloWorldController {
    name = 'HelloWorld AngularJS!';
    constructor () {}
}

const HelloWorldModule = angular
    .module('helloWorldModule', [])
    .component('helloWorld', {
        template: '<div>{{ vm.name }}</div>',
        controller: HelloWorldController,
        controllerAs: 'vm',
    })
    .run(() => console.log('AngularJS is runing...'))
    .name;

export class HelloWorldComponent extends HTMLElement {
  static $injector: angular.auto.IInjectorService;
  $scope: angular.IScope;
  root: JQLite;

  constructor() {
    super();
  }

  connectedCallback () {
    if (!HelloWorldComponent.$injector) {
      HelloWorldComponent.$injector = angular.bootstrap('<div></div>', [HelloWorldModule]);
    }

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.root = angular.element(this.shadowRoot as any);
    }

    const $compile = HelloWorldComponent.$injector.get('$compile');
    const $rootScope = HelloWorldComponent.$injector.get('$rootScope');
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
