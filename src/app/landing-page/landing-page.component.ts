import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BottomBannerComponent } from "../bottom-banner/bottom-banner.component";

@Component({
  selector: 'app-landing-page',
  imports: [NavbarComponent, BottomBannerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
