import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
declare var $: any;
@Injectable()
export class AlertService {
    public subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
    }

    success(message: string) {
        this.showMessage({ type: 'success', text: message });
    }

    error(message: string) {
        this.showMessage({ type: 'error', text: message });
    }

    showMessage(message: any) {
        let classs = 'alert-danger';
        if (message.type === 'success') {
            classs = 'alert-success';
        }
        $('#messageAppend').slideUp('fast', '', function() {
            let text = '<div class="alert alert-dismissible fade show ' + classs + '" role="alert"> <button type="button" class="close" aria-label="Close" onclick="$(\'#messageAppend\').slideUp(\'fast\', \'\', function() {$(\'#messageAppend\').html(\'\'); });"> <span aria-hidden="true">&times;</span> </button> ' + message.text + ' </div>';
            $('#messageAppend').html(text);
            $('#messageAppend').slideDown();
            if (this.inetrval) {
                clearTimeout(this.inetrval);
            }
            this.inetrval = setTimeout(function() {
                $('#messageAppend').slideUp('fast', '', function() {
                    $('#messageAppend').html('');
                });

            }, 4000);
        });
    }
}
