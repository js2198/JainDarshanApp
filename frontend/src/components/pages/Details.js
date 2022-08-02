import React from "react";
import "../../App.css";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Details() {
	const location = useLocation();
	const details = location.state;
	const url = `http://maps.google.com/maps?q=${details.Lat},${details.Lon}&z=16&output=embed`;
	return (
		<div className="p-4">
			<Row>
				<Col className="p-4">
					<p>
						Address: {details.BuildingName}, {details.Address}. {details.Area}-{details.Zone}
					</p>
					<p>City: {details.City}</p>
					<p> State: {details.State}</p>
					<p>Bhagwan: {details.ThirthankarName}</p>
					<p>Saalgirah: {details.ThirthankarSalgiraha}</p>
					<p>Upashray present: {details.Upashraya}</p>
					<p>
						Contact details: {details.ContactName} - {details.ContactNumber}
					</p>
				</Col>
				<Col md>
					<iframe src={url} width="100%" height="150%"></iframe>
				</Col>
			</Row>
		</div>
	);
}
