import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoadPanelService {
	public loadingChanged = new Subject<boolean>();

	postLoadingChanged(state: boolean) {
		this.loadingChanged.next(state);
	}
}
