import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Search.css";
import { Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import escapeRegExp from "escape-string-regexp";
import { useNavigate } from "react-router-dom";

// export default function Search() {
//   return (<form onSubmit={this.handleSearch}>
//     <label>
//       Name:
//       <input type="text" value={this.state.value} onChange={this.handleChange} />
//     </label>
//     <input type="submit" value="Submit" />
//   </form>);
// }

export default function Search() {
	const [state, setState] = useState({
		state: "",
		city: "",
		keyword: "",
		locations: [],
	});
	const [filteredLoc, setFilteredLoc] = useState([]);

	const updateFilteredLoc = (locationList) => {
		const match = new RegExp(escapeRegExp(state.keyword.trim()), "i");
		locationList = locationList.filter((loc) => match.test(loc.Address));
		setFilteredLoc(locationList);
	};

	const handleStateChange = (event) => {
		var locationList = state.locations.filter((loc) => loc.State === event.target.value);
		setState({ ...state, state: event.target.value });
		updateFilteredLoc(locationList);
	};

	const handleCityChange = (event) => {
		var locationList = state.locations.filter((loc) => loc.City === event.target.value);
		setState({ ...state, city: event.target.value });
		updateFilteredLoc(locationList);
	};

	const handleKeywordChange = (event) => {
		var locationList = state.locations;
		if (state.state !== "") {
			locationList = locationList.filter((loc) => loc.State === state.state);
		}
		if (state.city !== "") {
			locationList = locationList.filter((loc) => loc.City === state.city);
		}
		setState({ ...state, keyword: event.target.value });
		const match = new RegExp(escapeRegExp(event.target.value.trim()), "i");
		locationList = locationList.filter((loc) => match.test(loc.Address));
		setFilteredLoc(locationList);
	};

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:5000/")
			.then((data) => {
				// console.log(data.data);
				setState({ ...state, locations: data.data });
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div >
			<Form className="search-container p-5">
				<Row>
				<Col>
					<Form.Group controlId="formGridState">
						
						<Form.Select onChange={handleStateChange} aria-label="Default select example">
							<option>Select state...</option>
							<option>Maharashtra</option>
							<option>Gujarat</option>
						</Form.Select>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="formGridCity">
						
						<Form.Select onChange={handleCityChange} aria-label="Default select example">
							<option>Select city...</option>
							<option>Mumbai</option>
							<option>Pune</option>
						</Form.Select>
					</Form.Group>
				</Col>
				<Col md>	
					<Form.Group className="searchinput" controlId="formSearchKeyword">
						<Form.Control onChange={handleKeywordChange} placeholder="Search keyword..." />
					</Form.Group>
				</Col>
				</Row>
			</Form>
			<div className="card-container">
				{filteredLoc.map((res) => {
					return (
						<Card className="mx-auto my-3 p-3" bg="light" key={res.SrNo} style={{ width: "75%",  cursor: "pointer" }} onClick={()=>{navigate("/details", { state: res });}}>
							<Row>
								<Col sm={10}>
									<Card.Title>{res.BuildingName}</Card.Title>
									<Card.Text>{res.ThirthankarName}</Card.Text>
									<Card.Text>{res.Address}</Card.Text>
								</Col>
								
							</Row>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
