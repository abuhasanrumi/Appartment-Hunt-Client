import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import UserSidebar from '../UserSidebar/UserSidebar';

const MyRent = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [myRent, setMyRent] = useState([]);

	useEffect(() => {
		fetch(
			`https://still-lowlands-65832.herokuapp.com/myRent?email=${loggedInUser.email}`
		)
			.then((res) => res.json())
			.then((data) => console.log(data));
	}, []);
	return (
		<div>
			<div className="container-fluid bg-white">
				<div className="row">
					<UserSidebar></UserSidebar>
					<div className="col-md-10 pl-4">
						<div className="dashboardTitle pt-5 pb-4 ">
							<div className="title">
								<h4>My Rents</h4>
							</div>
							{loggedInUser.email ? (
								<div className="username text-right">
									<img
										className="rounded-circle"
										style={{ height: '40px', width: '40px' }}
										src={loggedInUser.photo}
										alt=""
									/>
									{loggedInUser.name}
								</div>
							) : (
								''
							)}
						</div>

						<div className="dashboardBody">
							<div className="dashboardTable">
								<table class="table table-striped">
									<thead>
										<tr>
											<th scope="col">House Name</th>
											<th scope="col">Price</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr className="align-items-center">
											<td>House Name</td>
											<td>Price</td>
											<td>
												<Link to="">
													<button className="btn brand-btn">
														View Details
													</button>
												</Link>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyRent;
