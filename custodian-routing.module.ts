import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustodianComponent } from './custodian.component';
import { AddComponent } from './add/addperson.component';
import { ListComponent } from './list/list.component';
const routes: Routes = [
	{
		path: '',
		component: CustodianComponent,
		children:
			[
                // route for add custodian Page
				{ path: 'add', component: AddComponent, data: { title: 'Add Custodian' } },
                // route for listing of custodian
				{ path: 'list', component: ListComponent, data: { title: 'List Custodian' } },                

			]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustodianRoutingModule { }
