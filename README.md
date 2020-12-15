# [filein](https://filein.io) API

## Install

```bash
npm i filein
```

## Table of Contents

### Models

- [User](#user)
- [File](#file)

### Methods

- [Upload](#upload)
- [Get File](#get-file)
- [Get User](#get-user)

## Models

### User

```ts
interface User {
	id: string
	slug: string
	name: string
	files: number
	comments: number
}
```

### File

```ts
interface File {
	id: string
	name: string
	type: string
	size: number
	owner: string | null
	comments: number
	uploaded: Date
	public: boolean
	link: string
	url: string
	secureUrl: string
}
```

## Methods

### Upload

#### Definition

```ts
interface UploadOptions {
	name: string
	type: string
	public: boolean
	data: Buffer
}

function upload(options: UploadOptions): Promise<File>
```

#### Example

```js
const { upload } = require('filein')
const { readFileSync } = require('fs')
const { join } = require('path')

const file = await upload({
	name: 'me.png',
	type: 'image/png',
	public: false,
	data: readFileSync(join(__dirname, 'me.png'))
})

console.log(file)
```

### Get File

#### Definition

```ts
function getFile(id: string): Promise<File | null>
```

#### Example

```js
const { getFile } = require('filein')

console.log(await getFile('EMppZ8g3Fu.jpg'))
```

### Get User

#### Definition

```ts
// Faster
function getUserFromId(id: string): Promise<User | null>

// Slower
function getUserFromSlug(slug: string): Promise<User | null>
```

#### Example

```js
const { getUserFromId, getUserFromSlug } = require('filein')

console.log(await getUserFromId('R61liLnxF4bojbAtmjgtsSl9PMt2'))
console.log(await getUserFromSlug('ken-mueller'))
```
