export interface Route {
    test: RegExp,
    loader: () => Promise<any>,
    template: string,
}

export class Router {
    protected activeRoute: Route = null;
    loadingTemplate = '<div>module is loading...</div>';

    constructor(
        private routes: Route[],
        private mountPoint: HTMLElement,
    ) {}

    protected currentLocation() {
        return location.hash;
    }

    protected loading() {
        this.mountPoint.innerHTML = this.loadingTemplate;
    }

    protected async handleRouting() {
        const location = this.currentLocation();
        for (const route of this.routes) {
            if (route.test.test(location)) {
                if (this.activeRoute === route) {
                    return;
                }
                this.activeRoute = route;
                this.loading();
                await route.loader();
                if (this.activeRoute === route) {
                    this.mountPoint.innerHTML = route.template;
                }
                return;
            }
        }
        this.mountPoint.innerHTML = '';
    }

    bootstrap() {
        window.addEventListener('hashchange', () => this.handleRouting(), false);
        this.handleRouting();
    }
}