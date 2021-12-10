export const getData = async () => {
	const res = await fetch(process.env.NEXT_PUBLIC_FREESLOTS_API_URL, {
		method: "PATCH",
		body: JSON.stringify({ location: "klizaliste-pula" }),
	});
	const res_1 = await res.json();

	return JSON.parse(res_1.body).slots;
};

export const setData = async (bodyValue) => {
	const res = await fetch(process.env.NEXT_PUBLIC_FREESLOTS_API_URL, {
		method: "PATCH",
		body: JSON.stringify(bodyValue),
	});
	const res_1 = await res.json();

	return JSON.parse(res_1.body).slots;
};
