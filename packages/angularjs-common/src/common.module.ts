import * as angular from 'angular';

export const Ng1CommonModule = angular
    .module('myCommonModule', [])
    .service('SharedService', function () {
      var value = 0;
      console.log('Init SharedService');
      return {
        get value() { return value },
        inc: () => value++,
      };
    })
    .run(() => console.log('AngularJS (CommonModule) is runing...'))
    .name;

export const $injector = angular.bootstrap('<div></div>', [Ng1CommonModule]);

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
  protected abstract ng1Template: string;
  protected abstract ng1Module: string;
  protected $scope: angular.IScope;
  protected root: JQLite;
  protected $injector = $injector;
  private isBuilt = false;
  private disconnectorTimer: any = 0;

  public keepAlive = false;

  protected loadNgModule() {
    this.$injector.loadNewModules([this.ng1Module]);
  }

  connectedCallback () {
    clearTimeout(this.disconnectorTimer);

    if (this.isBuilt) {
      return;
    }
    this.isBuilt = true;

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
      if (this.keepAlive) {
        return;
      }
      this.disconnectorTimer = 0;
      this.destroyAngularScope();
    }, 0);
  }

  destroyAngularScope() {
    this.$scope.$destroy();
    this.shadowRoot.innerHTML = '';
    this.isBuilt = false;
  }
}