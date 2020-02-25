import * as angular from 'angular';
import { $injector } from './common.module';

/* Ng1 WebComponent Wrapper */
export abstract class Ng1WebComponent extends HTMLElement {
    protected abstract ng1Template: string;
    protected abstract ng1Module: string;
    protected ng1Stylesheet: string = '';
    protected ng1ControllerAs = '';
    protected $scope: angular.IScope & { props?: { [propName: string]: any } };
    protected root: JQLite;
    private isBuilt = false;
    private disconnectorTimer: any = 0;

    private props: { [propName: string]: any } = {};

    constructor(bindProps: string[] = []) {
      super();

      for (const prop of bindProps) {
        Object.defineProperty(this, prop, {
          get: () => this.props[prop],
          set: (value) => {
            this.props[prop] = value;
            this.$apply();
          },
        });
      }
    }
  
    public keepAlive = false;
  
    protected loadNgModule() {
      $injector.loadNewModules([this.ng1Module]);
    }

    private $apply() {
      if (this.$scope) {
        this.$scope.$apply();
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
        this.$scope[this.ng1ControllerAs] = new Proxy(this, {
          get: (ctrl, propName: any) => {
            if (typeof this[propName] == 'function') {
              return this[propName].bind(this);
            }
            return this[propName];
          },
          set: (_, propName: any, value: any) => {
            this.props[propName] = value;
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