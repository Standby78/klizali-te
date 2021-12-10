import { useAuth } from "components/AuthProvider";

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function SignIn() {
	const { auth, initializing, getRedirect, clearRedirect, user, error } =
		useAuth();

	const [pswd, setPswd] = useState<string>("");
	const [signInInProgress, setInProgress] = useState(false);
	const mounted = useRef<boolean>();
	const router = useRouter();

	/* Guard if page is navigated away while sign in process is still active */
	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!initializing) {
			if (user) {
				const redirect = getRedirect();
				if (redirect) {
					router.push(redirect); // go to page which redirected to login
					clearRedirect();
				} else {
					router.push("/admin"); // go to default protected page
				}
			}
		}
	}, [router, getRedirect, clearRedirect, initializing, user]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (pswd) {
			try {
				setInProgress(true);
				await auth.signIn(pswd, 2000);
			} catch (error) {
				if (mounted.current) {
					setInProgress(false);
				}
			}
		} else {
			console.log("Pogrešna lozinka");
		}
	};

	const handlePswd = function (e: React.FormEvent<HTMLInputElement>) {
		setPswd(e.currentTarget.value);
	};

	if (initializing) {
		return <span className="progress">Učitavanje aplikacije</span>;
	}
	if (signInInProgress) {
		return <span className="progress">Prijava u tijeku</span>;
	}

	return (
		<div className="admin">
			<h2>Prijava</h2>

			{!user ? ( // there is no user, show sign in form
				<div>
					<form className="login" onSubmit={handleSubmit}>
						<label>
							Lozinka:
							<input
								type="password"
								required
								value={pswd}
								onChange={handlePswd}
							/>
						</label>
						<input type="submit" required value="Prijava" />
					</form>
					{error ? (
						<div>
							<p>{error.message}</p>
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
}
