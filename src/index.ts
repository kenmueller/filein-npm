import 'isomorphic-unfetch'

import { User, UploadOptions } from '../types'
import { BASE_URL } from './constants'
import { get, dataToFile } from './utils'

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
	
	if (response.ok)
		return dataToFile(await response.json())
	
	throw new Error(await response.text())
}

export const getFile = async (id: string) => {
	const response = await get(`${BASE_URL}/files/${id}`)
	return response && dataToFile(await response.json())
}

export const getUserFromId = async (id: string) => {
	const response = await get(`${BASE_URL}/users/id/${id}`)
	return response && response.json() as Promise<User>
}

export const getUserFromSlug = async (slug: string) => {
	const response = await get(`${BASE_URL}/users/slug/${slug}`)
	return response && response.json() as Promise<User>
}
