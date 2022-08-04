import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../_services';
import { first } from 'rxjs/operators';
import { APICONFIG } from '../../../app.config'

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	apiUrl = APICONFIG.apiEndpoint;
	@Input() selectedLocation: any;
	@Input() showCounter: boolean = false;
	@Output() close: EventEmitter<any> = new EventEmitter;
	@Output() assign: EventEmitter<any> = new EventEmitter;
	constructor(private userService: UserService) { }
	users: any;
	loading: boolean = false;

	back() {
		this.close.emit('Closed');
	}

	ngOnInit() {
		this.loadUsers();
	}

	loadUsers() {
		if (this.selectedLocation) {
			this.loading = true;
			this.userService.getAllWithFilters({ location : this.selectedLocation.id }, this.showCounter).pipe(first()).subscribe(users => {
				this.loading = false;
				if (users) {
					this.users = users;
				}
			}, error => {
				this.loading = false;
			});
		}
		else {
			this.loading = true;
			this.userService.getAll(true).pipe(first()).subscribe(users => {
				this.loading = false;
				if (users) {
					this.users = users;
				}
			}, error => {
				this.loading = false;
			});
		}
	}

	selectPeople(event: any) {
		this.assign.emit(event);
	}

}
