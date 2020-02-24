import * as angular from 'angular';
import { $injector } from './common.module';

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
    protected abstract ng1Template: string;
    protected abstract ng1Module: string;
    protected $scope: angular.IScope;
    protected root: JQLite;
    private isBuilt = false;
    private disconnectorTimer: any = 0;
  
    public keepAlive = false;
  
    protected loadNgModule() {
      $injector.loadNewModules([this.ng1Module]);
    }
  
    connectedCallback () {
      clearTimeout(this.disconnectorTimer);
  
      if (this.isBuilt) {
        return;
      }
      this.isBuilt = true;
  
      if (!this.shadowRoot) {
        this.loadNgModule();
        this.root = angular.element(this.attachShadow({ mode: 'open' }) as any);
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