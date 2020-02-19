import * as ng1 from 'angular';
import { of } from 'rxjs';
export * from './common.module';
export const angular = ng1;

of({}).subscribe(()=> {
  console.log('loaded');
});
