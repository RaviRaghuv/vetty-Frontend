import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/board']);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    // Trim whitespace from inputs
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    if (this.authService.login(trimmedEmail, trimmedPassword)) {
      // Clear form
      this.email = '';
      this.password = '';
      // Navigate to board
      this.router.navigate(['/board']).then(() => {
        console.log('Navigation to board successful');
      }).catch((error) => {
        console.error('Navigation error:', error);
        this.errorMessage = 'Error redirecting to board. Please try again.';
      });
    } else {
      this.errorMessage = 'Invalid email or password. Use: admin@test.com / admin123';
    }
  }
}

