export default class FileinError extends Error {
	static readonly BAD_REQUEST = 400
	static readonly INTERNAL = 500
	
	constructor(readonly status: number, readonly message: string) {
		super(message)
	}
	
	static readonly fromResponse = async (response: Response) =>
		new FileinError(response.status, await response.text())
}
