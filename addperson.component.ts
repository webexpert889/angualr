import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService, AlertService } from '../../../../_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'addperson',
	templateUrl: './addperson.component.html',
	styleUrls: ['./addperson.component.css']
})
export class AddComponent implements OnInit {
	loading: boolean = false;
	@Output() close: EventEmitter<any> = new EventEmitter;
	@Output() saved: EventEmitter<any> = new EventEmitter;
	@Input() assignButton : boolean = false;
	addUserForm: FormGroup;
	permissions: any;
	selectedImage: File;
	selectedImagePreview: any;
	constructor(private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertService) { }

	ngOnInit() {
		this.addUserForm = this.formBuilder.group({
			'name': [null, [Validators.required]],
			'showEmail' : [false],
			'userId': [null, []],
			'userType': [null, []],
			'email': ['', []],
			'jobTitle': [null, []],
			'department': [null, []],
			'location': [null, []],
			'password': [null, []],
			'permissions': this.formBuilder.array([]),
		});
	}

	back() {
		this.close.emit('Close it');
	}

	get f() { return this.addUserForm.controls; }

    // Add a custodian to database
	addCustodian(option: string = '') {
		this.loading = true;
		this.userService.addCustodian(this.addUserForm.value).pipe(first()).subscribe(permissions => {
			if (this.selectedImage) {
				const formData: FormData = new FormData();
				this.loading = true;
				let fileName = this.selectedImage.name
				formData.append('file', this.selectedImage, fileName);
				// formData.append('id', permissions.id);
				this.userService.uploadCustodianImage(formData, permissions.id).subscribe(
					upload => {
						this.alertService.success(permissions.msg);
						if (option == 'assign') {
							this.saved.emit({ 'people': permissions, 'assign': true });
						} else {
							this.saved.emit({ 'people': permissions, 'assign': false });
						}
						this.loading = false;
					}, error => {
						this.loading = false;
						this.alertService.error(error);
					})
			} else {
				this.loading = false;
				this.alertService.success(permissions.msg);
				if (option == 'assign') {
					this.saved.emit({ 'people': permissions, 'assign': true });
				} else {
					this.saved.emit({ 'people': permissions, 'assign': false });
				}
			}
		}, error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}

    // For selecting image from files
	selectImage(event: any) {
		var files = event.target.files;
		var file = files[0];
		this.selectedImage = file;
		this.readUrl(event);
	}

	readUrl(event: any) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: ProgressEvent) => {
				this.selectedImagePreview = (<FileReader>event.target).result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}
}
