import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private factoryResolver: ComponentFactoryResolver) {

  }

  addDynamicComponent(component: any, viewContainerRef: ViewContainerRef) {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const comp = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(comp.hostView);
  }
}
