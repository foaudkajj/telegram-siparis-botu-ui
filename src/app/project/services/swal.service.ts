import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

@Injectable({ providedIn: "root" })
export class SwalService {
    constructor(private translate: TranslateService) { }
    showErrorMessage(message?: string) {
        swal.fire(
            this.translate.instant("EXCEPTIONS.ERROR"),
            message ? this.translate.instant(message) : '',
            "error"
        );
    }
    showSuccessMessage(message?: string) {
        swal.fire({
            icon: 'success',
            title: message ? message : this.translate.instant("MESSAGES.SUCCESFULL"),
            showConfirmButton: false,
            timer: 1500
        })
    }

    showDeletingMessage() {
        // let theResult =false
        return swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
    }


    showDeletConforme() {
        swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }
}
