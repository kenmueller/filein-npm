import 'isomorphic-unfetch'

import { FileData, File } from '../types'

export const get = async (url: string) => {
	const response = await fetch(url)
	
	if (response.ok)
		return response
	
	if (response.status === 404)
		return null
	
	throw new Error(await response.text())
}

export const dataToFile = (data: FileData): File => ({
	...data,
	link: `https://filein.io/${data.id}`,
	url: `http://u.filein.io/${data.id}`,
	secureUrl: `https://storage.googleapis.com/u.filein.io/${data.id}`
})
