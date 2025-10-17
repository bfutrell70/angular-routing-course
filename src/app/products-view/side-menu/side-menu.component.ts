import { Component, Input } from '@angular/core';
import { PieService } from '../../services/pie.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { tap } from 'rxjs';
import { PRODUCT_ROUTER_TOKENS } from '../products.routes';

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  @Input() customize = false;
  pies$ = this.pieService.filteredPies$;
  readonly customizeLink = `./${PRODUCT_ROUTER_TOKENS.CUSTOMIZE}`;
  readonly detailLink = `./${PRODUCT_ROUTER_TOKENS.DETAIL}`;

  constructor(
    private readonly pieService: PieService,
  ) { }
}
