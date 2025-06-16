import { trigger, transition, query, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    RouterOutlet
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [
        trigger('routerFadeIn', [
            transition('* <=> *', [
                query('center', [
                    style({ opacity: 0 }),
                    animate('1s ease-in-out', style({ opacity: 1 })),
                ], { optional: true }),
            ])
        ])
    ]
})

export class UserComponent {

  constructor(private context: ChildrenOutletContexts){}
  
  getRouterUrl(){
    return this.context.getContext('primary')?.route?.url;
  }
}
