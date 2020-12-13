import 'isomorphic-unfetch'

import { UploadOptions } from '../types'
import { BASE_URL } from './constants'

export class File {
	link: string
	url: string
	secureUrl: string
	
	constructor(public id: string) {
		this.link = `https://filein.io/${id}`
		this.url = `http://u.filein.io/${id}`
		this.secureUrl = `https://storage.googleapis.com/u.filein.io/${id}`
	}
}

export const upload = async ({ name, type, public: isPublic, data }: UploadOptions) => {
	const response = await fetch(`${BASE_URL}/files`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			type,
			public: isPublic,
			data: data.toString('binary')
		})
	})
	
	const text = await response.text()
	
	if (response.ok)
		return new File(text)
	
	throw new Error(text)
}
