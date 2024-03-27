/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import xxhash from './xxhash-wasm/index.js';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const hasher = await xxhash();

		const input = 'The string that is being hashed';

		let s = '';
		// 32-bit version
		s += '\n' + hasher.h32(input); // 3998627172 (decimal representation)
		// For convenience, get hash as string of its zero-padded hex representation
		s += '\n' + hasher.h32ToString(input); // "ee563564"

		// 64-bit version
		s += '\n' + hasher.h64(input); // 5776724552493396044n (BigInt)
		// For convenience, get hash as string of its zero-padded hex representation
		s += '\n' + hasher.h64ToString(input); // "502b0c5fc4a5704c"

		return new Response(s);
	},
};
