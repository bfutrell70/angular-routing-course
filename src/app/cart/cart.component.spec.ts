import { CartComponent } from './cart.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createSpyFromClass, provideAutoSpy } from 'jest-auto-spies';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ROUTER_TOKENS } from '../app-route.constants';
import { signal } from '@angular/core';

describe('CartComponent', () => {
  const setup = async () => {
    const mockCartService = {
      cartItemsPlusQuantity: signal([]),
      subtotal: signal(1),
      salesTax: signal(1),
      total: signal(1),
    };

    // mock router service and spy on navigate
    const mockRouter = createSpyFromClass(Router, {
      methodsToSpyOn: ['navigate']
    });

    const options = {
      imports: [
        CommonModule,
        CurrencyPipe,
        MatButtonModule,
        FormsModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideAutoSpy(CartService),
        {
          provide: CartService,
          useValue: mockCartService,
        },
        // provide mock router
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    };

    const { fixture } = await render(CartComponent, options);

    return {
      fixture,
      mockRouter,
    };
  }

  it('calls router.navigate on close', async () => {
    // setup test
    const { mockRouter } = await setup();

    // find and click close button
    const closeButton = screen.getByText('close');
    fireEvent.click(closeButton);

    // expect router.navigate to have been called
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith([{ outlets: { [ROUTER_TOKENS.CART]: null } }], {
      queryParamsHandling: 'merge'
    });
  });
});
