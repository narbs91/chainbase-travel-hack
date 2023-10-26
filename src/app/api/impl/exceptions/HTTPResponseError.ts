export class HTTPResponseError extends Error {
	constructor(response: any) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
	}
}