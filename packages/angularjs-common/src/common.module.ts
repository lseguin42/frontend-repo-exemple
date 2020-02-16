import * as angular from 'angular';

export const Ng1CommonModule = angular
    .module('myCommonModule', [])
    .service('SharedService', function () {
      console.log('Init SharedService');
      return {
        doSomething: () => console.log('do something...'),
      };
    })
    .run(() => console.log('AngularJS (CommonModule) is runing...'))
    .name;

export const $injector = angular.bootstrap('<div></div>', [Ng1CommonModule]);

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
  protected abstract ng1Template: string;
  protected $scope: angular.IScope;
  protected root: JQLite;
  protected $injector = $injector;

  private disconnectorTimer: any = 0;

  protected get ngModuleName(): string {
    return (this.constructor as any).ng1Module;
  }

  protected loadNgModule() {
    this.$injector.loadNewModules([this.ngModuleName]);
  }

  connectedCallback () {
    if (this.disconnectorTimer) {
      clearTimeout(this.disconnectorTimer);
      this.disconnectorTimer = 0;
      return;
    }

    if (!this.shadowRoot) {
      this.loadNgModule();
      this.attachShadow({ mode: 'open' });
      this.root = angular.element(this.shadowRoot as any);
    }

    const $compile = this.$injector.get('$compile');
    const $rootScope = this.$injector.get('$rootScope');
    const element = angular.element(this.ng1Template);

    this.$scope = $rootScope.$new(true);
    this.root.append(element);
    $compile(element)(this.$scope);
    this.$scope.$apply();
  }

  disconnectedCallback() {
    this.disconnectorTimer = setTimeout(() => {
      this.disconnectorTimer = 0;
      this.destroyScopeCallback();
    }, 0);
  }

  destroyScopeCallback() {
    this.$scope.$destroy();
    this.shadowRoot.innerHTML = '';
  }
}
