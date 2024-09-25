import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ClientService } from '../../Services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private cService: ClientService,private formBuilder:FormBuilder,private route:Router){
    this.registerForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      surname:["",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      mail:["",[Validators.required,Validators.email,Validators.maxLength(50)]],
      password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    })
  }

  onSubmit(){

    if(this.registerForm.valid){

      const newClient = {
        idClient : 0,
        name : this.registerForm.value.name,
        surname : this.registerForm.value.surname,
        mail : this.registerForm.value.mail,
        password : this.registerForm.value.password
      }

      this.registerClient(newClient);
    }

  }

  registerClient(client : Client){

    this.cService.registerClient(client).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Error: ", error );
      }
    })
  }
}
