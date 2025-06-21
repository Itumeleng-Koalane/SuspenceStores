import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../Shared/services/register.service';
import { UserService } from '../Shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  FullName: string = '';
  constructor(private router: Router,private toastr: ToastrService,private authRegService: RegisterService, private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUserprofile().subscribe({
      next:(res:any) => {
        this.FullName = res.name +' '+ res.surname;
      },
      error:(err:any) => {
        console.log("Error while retrieving user profile!!");
        this.toastr.error("Error while retrieving User Profile!!")
      }
    });
  }

  onLogout(){
    this.authRegService.deleteKey();
    this.toastr.info('Bye Bye!');
    this.router.navigateByUrl('/user/login-screen');
  }

  logoutNotification(){
     Swal.fire({
       title: 'Logging Out?',
       text: 'Are you sure you want to logout?',
       icon: 'question',
       confirmButtonText: 'YES',
       cancelButtonText: 'NO',
       showCancelButton: true,
       reverseButtons: true
     }).then((result) => {
       if (result.isConfirmed) {
         this.onLogout();
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         console.log('Logout cancelled');
       }
     });
  }
}
