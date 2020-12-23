import 'isomorphic-unfetch'

import { User, UploadOptions } from '../types'
import { BASE_URL } from './constants'
import { get, dataToFile } from './utils'

export const upload = async ({ apiKey, name, type, public: isPublic, data }: UploadOptions) => {
	if (typeof apiKey !== 'string') throw new Error('Invalid API key')
	if (typeof name !== 'string') throw new Error('Invalid name')
	if (typeof type !== 'string') throw new Error('Invalid type')
	if (typeof isPublic !== 'boolean') throw new Error('Invalid access level')
	if (!Buffer.isBuffer(data)) throw new Error('Invalid data')
	
	const response = await fetch(`${BASE_URL}/files`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			type,
			public: isPublic,
			data: data.toString('base64')
		})
	})
	
	if (response.ok)
		return dataToFile(await response.json())
	
	throw new Error(await response.text())
}

export const getFile = async (id: string) => {
	if (typeof id !== 'string') throw new Error('Invalid ID')
	
	const response = await get(`${BASE_URL}/files/${id}`)
	return response && dataToFile(await response.json())
}

export const getUserFromId = async (id: string) => {
	if (typeof id !== 'string') throw new Error('Invalid ID')
	
	const response = await get(`${BASE_URL}/users/id/${id}`)
	return response && response.json() as Promise<User>
}

export const getUserFromSlug = async (slug: string) => {
	if (typeof slug !== 'string') throw new Error('Invalid slug')
	
	const response = await get(`${BASE_URL}/users/slug/${slug}`)
	return response && response.json() as Promise<User>
}
