export interface User {
	id: string
	slug: string
	name: string
	files: number
	comments: number
}

export interface FileData {
	id: string
	name: string
	type: string
	size: number
	owner: string | null
	comments: number
	uploaded: number
	public: boolean
}

export interface File extends FileData {
	uploaded: Date
	link: string
	url: string
	secureUrl: string
}

export interface UploadOptions {
	name: string
	type: string
	public: boolean
	data: Buffer
}

/**
 * Upload a file.
 * 
 * @param options The options to upload the file with.
 */
export function upload(options: UploadOptions): Promise<File>

/**
 * @param id The file's ID (found in the URL).
 */
export function getFile(id: string): Promise<File | null>

/**
 * Faster than `getUserFromSlug`.
 * 
 * @param id The user's ID.
 */
export function getUserFromId(id: string): Promise<User | null>

/**
 * Slower than `getUserFromId`.
 * 
 * @param slug The user's slug (found in the URL).
 */
export function getUserFromSlug(slug: string): Promise<User | null>
