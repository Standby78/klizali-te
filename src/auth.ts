export type UserCB = (user: User, error: any) => void;

const userPassword = process.env.NEXT_PUBLIC_PASSWORD;

export type User = {
	email: string;
	name: string;
	token: string;
};

export class Auth {
	user: User;

	error: { message: string } | null;

	cb: UserCB;

	constructor() {
		this.user = null;
		this.error = null;
	}

	onAuthStateChanged(cb: UserCB) {
		this.cb = cb;

		return () => {
			this.cb = null;
		};
	}

	protected onUserChange(user: User | null, error?: { message: string }) {
		this.cb && this.cb(user, error);
	}

	signIn(password: string, delay = 2000) {
		return new Promise((resolve, reject) => {
			if (password !== userPassword) {
				const error = { message: "Pogrešna lozinka" };
				this.error = error;
				reject(error);
				this.onUserChange(null, this.error);

				return;
			}

			setTimeout(() => {
				this.user = {
					name: "Klizalište",
					email: "test",
					token: "some12413token",
				};

				window.sessionStorage.setItem(
					"user",
					JSON.stringify(this.user)
				);
				this.onUserChange(this.user);
				resolve(this.user);
			}, delay);
		});
	}

	signOut() {
		window.sessionStorage.removeItem("user");
		this.user = null;
		this.onUserChange(this.user);
	}

	resolveUser(timeout: number) {
		setTimeout(() => {
			if (window) {
				const signedInUser = window.sessionStorage.getItem("user");
				if (signedInUser) {
					this.user = JSON.parse(signedInUser);
				}
			} else {
				this.user = null;
			}
			this.onUserChange(this.user);
		}, timeout);

		return this;
	}
}
