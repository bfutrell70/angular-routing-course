import { TestBed } from '@angular/core/testing';
import { authRouteGuard } from './auth-route-guard';
import { AuthService } from './services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { createSpyFromClass } from 'jest-auto-spies';
import { subscribeSpyTo } from '@hirez_io/observer-spy'
import { ROUTER_TOKENS } from './app-route.constants';

describe('authRouteGuard', () => {
  const setup = (
    path: string = '',
    permissions: string[] = []
  ) => {
    const mockAuthService = createSpyFromClass(AuthService, {
      observablePropsToSpyOn: ['userAuth']
    });
    mockAuthService.userAuth.nextWith(permissions);

    // mock router and spy on parseUrl to return url tree
    const mockRouter = createSpyFromClass(Router, {
      methodsToSpyOn: ['parseUrl']
    });
    const urlTree = new UrlTree();
    mockRouter.parseUrl.mockReturnValue(urlTree);
    // END mock router and spy on parseUrl to return url tree

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {provide: Router, useValue: mockRouter}
      ]
    });

    // instantiate route guard in test bed injection context
    const guard = TestBed.runInInjectionContext(authRouteGuard(path));

    return {
      guard,
      urlTree,
      mockRouter
    };
  }
  it('returns true when permission exists', () => {
    const path = 'cart';
    const permissions = [path, 'other permission'];

    // setup
    const { guard } = setup(path, permissions);

    // subscribe to guard
    const guardSpy = subscribeSpyTo(guard);

    // expect guard to return true
    expect(guardSpy.getLastValue()).toBe(true);
  });

  it('returns UrlTree when permission does not exist', () => {
    const path = 'cart';
    const permissions = ['other permission'];

    // setup
    const { guard, urlTree, mockRouter } = setup(path, permissions);

    // subscribe to guard
    const guardSpy = subscribeSpyTo(guard);

    // expect guard to return a url tree
    expect(guardSpy.getLastValue()).toEqual(urlTree);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith(`/${ROUTER_TOKENS.NOT_AUTH}`);
  });
})
