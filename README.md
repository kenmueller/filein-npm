# [filein](https://filein.io) API

## Install

```bash
npm i filein
```

## File

```ts
class File {
	id: string
	link: string
	url: string
	secureUrl: string
	
	constructor(id: string)
}
```

## Upload

```ts
interface UploadOptions {
	name: string
	type: string
	public: boolean
	data: Buffer
}

function upload(options: UploadOptions): Promise<File>
```

## Example

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
