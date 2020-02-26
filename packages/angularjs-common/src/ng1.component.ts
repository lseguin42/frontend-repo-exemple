import * as angular from 'angular';
import { $injector } from './common.module';

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
    protected abstract ng1Template: string;
    protected abstract ng1Module: string;
    protected ng1Stylesheet: string = '';
    protected ng1ControllerAs = '$ctrl';
    protected $scope: angular.IScope & { props?: { [propName: string]: any } };
    protected $ctrl: any = {};
    protected root: JQLite;
    private isBuilt = false;
    private disconnectorTimer: any = 0;

    constructor() {
      super();

      const bindings = this.getBindings();
      for (const prop of bindings) {
        Object.defineProperty(this, prop, {
          get: () => this.$ctrl[prop],
          set: (value) => {
            this.$ctrl[prop] = value;
            this.$apply();
          },
        });
      }

      const methods = this.getAttachedMethods();
      for (const prop of methods) {
        this.$ctrl[prop] = (...args) => this[prop](...args);
      }
    }
  
    public keepAlive = false;

    private getBindings(): string[] {
      return (this.constructor as any).__bindings || [];
    }

    private getAttachedMethods(): string[] {
      return (this.constructor as any).__attached || [];
    }
  
    protected loadNgModule() {
      $injector.loadNewModules([this.ng1Module]);
    }

    private $apply() {
      if (this.$scope) {
        this.$scope.$applyAsync();
      }
    }

    protected appendStylesheet() {
      if (this.ng1Stylesheet) {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(this.ng1Stylesheet));
        this.root.append(style);
      }
    }
  
    connectedCallback() {
      clearTimeout(this.disconnectorTimer);
  
      if (this.isBuilt) {
        return;
      }
      this.isBuilt = true;
  
      if (!this.shadowRoot) {
        this.loadNgModule();
        this.root = angular.element(this.attachShadow({ mode: 'open' }) as any);
      }

      this.appendStylesheet();
      const $compile = $injector.get('$compile');
      const $rootScope = $injector.get('$rootScope');
  
      this.$scope = $rootScope.$new(true);

      if (this.ng1ControllerAs) {
        this.$scope[this.ng1ControllerAs] = new Proxy(this.$ctrl, {
          get: (_, propName: any) => {
            return this.$ctrl[propName];
          },
          set: (_, propName: any, value: any) => {
            this.$ctrl[propName] = value;
            this.dispatchEvent(new CustomEvent(`${propName}`, { detail: value }));
            return true;
          },
        });
      }
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