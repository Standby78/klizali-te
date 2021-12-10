import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import { getData } from "../adapters/api.adapter";

import SocialIcons from "../components/SocialIcons";
export default function Home() {
	const [slots, setSlots] = useState(null);
	useEffect(() => {
		getData().then((res) => setSlots(res));
	}, []);
	const { lastMessage } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

	useEffect(() => {
		if (lastMessage) {
			setSlots(lastMessage.data);
		}
	}, [lastMessage]);

	return (
		<div>
			<div className="absolute first" />
			<div className="absolute second" />
			<div className="absolute container">
				<div className="info">
					<div className="logo">
						<a
							target="_blank"
							rel="noreferrer"
							href="https://www.pula.hr/hr/"
						>
							<img
								alt="Pula logo"
								width="187px"
								height="64px"
								src="/pula-logo.png"
							/>
						</a>
					</div>
					<p className="location">KLIZALIŠTE PULA</p>
					<p>Broj slobodnih mjesta:</p>
					<p className="mjesta"> {slots && <>{slots}</>}</p>
					Radno vrijeme: <p> Ned - Čet: 09:00 - 22:00 </p>
					<p>Pet - Sub: 09:00 - 23:00</p>
					<SocialIcons />
				</div>
			</div>
		</div>
	);
}
