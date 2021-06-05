import { of } from "rxjs";
import { ToastActions } from "./toasts";

export const httpError = (store$: any, p: any) => {
	// Obecnej toad na HTTP error Connection error
	console.log(p);
	if (
		p &&
		p.hasOwnProperty("error") &&
		p.error.hasOwnProperty("error") &&
		p.error.error.hasOwnProperty("message")
	)
		store$.dispatch(
			ToastActions.showToast({
				message: {
					severity: "error",
					summary: "Server Error",
					detail: p.error.error.message,
				},
			})
		);
	else if (
		p &&
		p.hasOwnProperty("error") &&
		p.error.hasOwnProperty("error") &&
		p.error.error.hasOwnProperty("code")
	)
		store$.dispatch(
			ToastActions.showToast({
				message: {
					severity: "error",
					summary: "Server Error",
					detail: p.error.error.code,
				},
			})
		);
	else
		store$.dispatch(
			ToastActions.showToast({
				message: {
					severity: "error",
					summary: "Server Error",
					detail: "Server error",
				},
			})
		);
	return of({});
};
