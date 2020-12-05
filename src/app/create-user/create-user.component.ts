import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from "@angular/forms";
import { FileUploadService } from "../shared/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
      

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  selectedFile: File;
  idUsuario:number;
  message: string;
  imageName: any;
 
  form = new FormGroup({
    ref: new FormControl(''),
    refId: new FormControl(''),
    field: new FormControl(''),

  });

  form2 = new FormGroup({
    nombre: new FormControl(''),
    poblacion: new FormControl(''),
    telefono: new FormControl(null),
    saldo:new FormControl(null)

  });
 
  employee= {
    nombre : "",
    poblacion:"",
    telefono:0
  };
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService,
    public http:HttpClient
  ) {
    // Reactive Form
   
  }
 

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
   
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile);
    uploadImageData.append('ref', this.form.value.ref);
    uploadImageData.append('refId', this.form.value.refId);

    uploadImageData.append('field', this.form.value.field);

  
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:1337/upload', uploadImageData)
      .subscribe((response) => {
        
      }
      );


  }

  onUpload2() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    
    this.http.post('http://localhost:1337/usuarios', this.form2.value)
      .subscribe((response:any) => {
        console.log(response)
        this.form.controls.refId.setValue(response.id);
        this.form.controls.ref.setValue('usuarios');
        this.form.controls.field.setValue('mifoto');
      }
      );


  }
}