import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { of } from "rxjs/internal/observable/of";
import { shareReplay } from "rxjs/internal/operators/shareReplay";
import { tap } from "rxjs/internal/operators/tap";

@Injectable({ providedIn: 'root' })
export class PermessionsService {
    constructor() {
    }

    permesions$ = of(this.GetPermessions())
        .pipe(
            shareReplay(1)
        );

    GetPermessions(): string[] {
        const permessions = JSON.parse((localStorage.getItem("user")))?.Permessions;
        return permessions ? JSON.parse(permessions) : [];
    }

}