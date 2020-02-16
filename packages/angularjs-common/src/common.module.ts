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

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
  protected abstract ng1Template: string;
  protected $scope: angular.IScope;
  protected root: JQLite;

  private get ng1Module() {
    return (this.constructor as any).ng1Module;
  }

  private loadNg1Module() {
    if (!(this.constructor as any).ng1Loaded) {
      (this.constructor as any).ng1Loaded = true;
      if (this.ng1Module) {
        $injector.loadNewModules([this.ng1Module]);
      }
    }
  }

  connectedCallback () {
    this.loadNg1Module();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.root = angular.element(this.shadowRoot as any);
    }

    const $compile = $injector.get('$compile');
    const $rootScope = $injector.get('$rootScope');
    const element = angular.element(this.ng1Template);

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
