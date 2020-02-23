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
  private isBuilt = false;
  private disconnectorTimer: any = 0;

  public keepAlive = false;

  protected loadNgModule() {
    $injector.loadNewModules([this.ng1Module]);
  }

  get root() {
    return angular.element(this.shadowRoot as any);
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
    }

    const $compile = $injector.get('$compile');
    const $rootScope = $injector.get('$rootScope');

    this.$scope = $rootScope.$new(true);
    const element = $compile(this.ng1Template)(this.$scope);
    this.root.append(element);
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
    this.root.children().remove();
    this.$scope.$destroy();
    this.$scope = null;
    this.isBuilt = false;
  }
}