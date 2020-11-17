import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Homepage/Header/Header';
import './Login.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';

const Login = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
	const [user, setUser] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		password: '',
		cPassword: '',
		error: '',
		success: false,
	});

	const handleBlur = (e) => {
		let isFieldValid = true;

		if (e.target.name === 'email') {
			isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
		}
		if (e.target.name === 'password') {
			isFieldValid = e.target.value.length >= 6;
		}

		if (isFieldValid) {
			const newUser = { ...user };
			newUser[e.target.name] = e.target.value;
			setUser(newUser);
		}
	};

	const handleSubmit = (e) => {
		if (user.email && user.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					const { email } = res.user;
					const signedInUser = { email };
					setLoggedInUser(signedInUser);
					// history.replace(from);
					e.target.reset();
					alert('Login successful.');
				})
				.catch((error) => {
					const newUser = { ...user };
					newUser.error = error.message;
					setUser(newUser);
				});
		}
		e.preventDefault();
	};

	const handleGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => {
				const { displayName, email, photoURL } = res.user;
				const signedInUser = { name: displayName, email, photo: photoURL };
				setLoggedInUser(signedInUser);
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<div>
			<Header></Header>
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 bg-white my-4 form">
						<div className="px-3 py-4">
							<h3 className="mb-5 text-bold">Login</h3>

							<form className="loginForm" onSubmit={handleSubmit}>
								<div class="form-group">
									<input
										onBlur={handleBlur}
										name="email"
										type="email"
										class="form-control"
										id="email"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
								</div>
								<div class="form-group">
									<input
										onBlur={handleBlur}
										name="password"
										type="password"
										class="form-control"
										id="exampleInputPassword1"
										placeholder="Password"
									/>
								</div>
								<div className="form-footer">
									<p>Forgot Password?</p>
								</div>
								<button
									type="submit"
									class="brand-btn apartment-submit-btn w-100 mt-3"
								>
									Login
								</button>

								<p
									style={{ fontSize: '14px', color: 'red' }}
									className="my-2 text-center"
								>
									{user.error}
								</p>
							</form>
							<p className="my-3 text-center">
								Don't have an account?
								<span className="ml-2">
									<Link to="/signup">Create an account</Link>
								</span>
							</p>
						</div>
					</div>
					<div className="col-md-4 offset-md-4 text-center">
						<span>or</span>
						<div className="special-login-btns mt-3">
							<button
								onClick={handleGoogleSignIn}
								id="googleLogin"
								className="btn form-control"
							>
								<p className="m-0">Continue with Google</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
