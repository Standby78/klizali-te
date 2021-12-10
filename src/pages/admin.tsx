import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { getData, setData } from "../adapters/api.adapter";
export default function Protected() {
	const [slots, setSlots] = useState(null);

	const { sendMessage, readyState } = useWebSocket(
		process.env.NEXT_PUBLIC_WEBSOCKET_URL
	);

	useEffect(() => {
		getData().then((res) => setSlots(res));
	}, []);

	const handleClick = (value) => {
		const body = {
			location: "klizaliste-pula",
			action: value === 1 ? "increment" : "decrement",
		};

		setData(body).then((res) => {
			setSlots(res);
			if (readyState === ReadyState.OPEN)
				sendMessage(
					JSON.stringify({ action: "onUpdate", message: res })
				);
		});
	};

	return (
		<div className="admin">
			<p className="location">Klizalište Pula</p>
			<p>Trenutačni broj korisnika:</p>
			<button type="button" onClick={() => handleClick(-1)}>
				-
			</button>
			<span className="slots">{slots}</span>
			<button type="button" onClick={() => handleClick(1)}>
				+
			</button>
		</div>
	);
}

Protected.requireAuth = true;
