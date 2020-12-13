export class File {
	id: string
	link: string
	url: string
	secureUrl: string
	
	constructor(id: string)
}

export interface UploadOptions {
	name: string
	type: string
	public: boolean
	data: Buffer
}

export function upload(options: UploadOptions): Promise<File>
