import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from 'src/domain/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    nickname: '',
    password: ''
  }

  userCreateForm: FormGroup;

  constructor(private authService: AuthService,
     private router: Router,
      private messageService: MessageService) { }

  ngOnInit(): void {
    this.userCreateForm = new FormGroup({
      login: new FormControl('', [Validators.required, this.noWhitespace]),
      password: new FormControl('', [Validators.required, Validators.minLength(4),
      Validators.maxLength(10)])
    });
  }

  logar() {
    this.authService.authenticate(this.login).subscribe( resposta => {
      this.authService.addUser(resposta);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuário deletado com sucesso!', life: 3000 })
      this.router.navigate(['/home']);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Falha', detail: error.error.message, life: 3000 })
    })
   
  }

  addUser() {
    this.login.nickname = this.userCreateForm.value.login
    this.login.password = this.userCreateForm.value.password
    this.logar()
  }

  validators() {
    return this.userCreateForm.valid
  }

  noWhitespace(control) {
    if (control.value && control.value.trim().length == 0) {
      return { whitespace: true };
    }
    return null;
  }

}
