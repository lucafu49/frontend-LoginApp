import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../interfaces/client';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  loginForm: FormGroup;
  public clientData : Client[] = [];
  public message:string = "";

  constructor(private cService: ClientService, private router:Router,private formBuilder:FormBuilder){
    this.loginForm = this.formBuilder.group({
      mail:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginClient(this.loginForm.value.mail,this.loginForm.value.password);
    }
  }
  
  loginClient(mail:string,password:string){

    this.cService.loginClient(mail,password).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Error: ", error );
        this.message = error.error.error
      }
    })
  }
}
