import _fetch from 'isomorphic-unfetch'

import { FileData, File } from '../types'
import Error from './error'

export const fetch: typeof _fetch = (...args) => {
	try {
		return _fetch(...args)
	} catch ({ message }) {
		throw new Error(Error.INTERNAL, message)
	}
}

export const get = async (url: string) => {
	const response = await fetch(url)
	
	if (response.ok)
		return response
	
	if (response.status === 404)
		return null
	
	throw await Error.fromResponse(response)
}

export const dataToFile = (data: FileData): File => ({
	...data,
	uploaded: new Date(data.uploaded),
	link: `https://filein.io/${data.id}`,
	url: `http://u.filein.io/${data.id}`,
	secureUrl: `https://storage.googleapis.com/u.filein.io/${data.id}`
})
