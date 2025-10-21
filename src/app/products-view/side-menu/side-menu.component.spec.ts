import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { createSpyFromClass } from 'jest-auto-spies';
import { TestBed } from '@angular/core/testing';
import { PieService } from '../../services/pie.service';
import { PRODUCT_ROUTER_TOKENS } from '../../products-view/product-routes.constant';
import { Pie } from '../../models/pie';
import { SideMenuComponent } from './side-menu.component';
import { createPie } from '../../models/mock-pie-factory';

@Component({
  template: 'Dummy'
})
export class DummyComponent{}

describe('SideMenuComponent', () => {
  const setup = async(pies: Pie[]) => {
    const mockPieService = createSpyFromClass(PieService, {
      observablePropsToSpyOn: ['filteredPies$']
    });
    mockPieService.filteredPies$.nextWith(pies);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: PieService,
          useValue: mockPieService
        },
        // provide location mocks
        provideLocationMocks(),
        // provide router with mock routes
        provideRouter([
          {
            path: PRODUCT_ROUTER_TOKENS.CUSTOMIZE,
            component: DummyComponent
          },
          {
            path: PRODUCT_ROUTER_TOKENS.DETAIL,
            component: DummyComponent
          },
          // must provide a route that returns the component under test
          // must be last or it will match all of the other routes
          {
            path: '**',
            component: SideMenuComponent
          },
        ])
      ]
    });
    // implement RouterTestingHardness
    const harness = await RouterTestingHarness.create();
    const activatedComponent = await harness.navigateByUrl('/', SideMenuComponent);

    // get location reference
    const location = TestBed.inject(Location);

    return {
      harness,
      activatedComponent,
      location
    };
  }

  it('navigates to the detail view when customize is false', async() => {
    const pieId1 = 'pieId1';
    const pie1 = createPie({id: pieId1});

    // setup
    const { location } = await setup([pie1]);

    // get button and click it
    const pieButton = screen.getByTestId(`detail-view-${pieId1}`);
    fireEvent.click(pieButton);

    // expect location to change
    expect(location.path()).toEqual(`/detail?productId=${pieId1}`);
  });

  it('navigates to the detail view when customize is true', async() => {
    const pieId1 = 'pieId1';
    const pie1 = createPie({id: pieId1});

    // setup
    const { location, activatedComponent, harness } = await setup([pie1]);
    activatedComponent.customize = true;
    harness.detectChanges();

    // get button and click it
    const pieButton = screen.getByTestId(`customize-view-${pieId1}`);
    fireEvent.click(pieButton);

    // expect location to change
    expect(location.path()).toEqual(`/customize?productId=${pieId1}`);
  });

});
