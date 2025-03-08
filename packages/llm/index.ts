import { Anthropic, type ClientOptions } from '@anthropic-ai/sdk';

const anthropicClientSingleton = (options?: ClientOptions) => {
  return new Anthropic(options || {
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
};

declare global {
  var anthropicGlobal: undefined | ReturnType<typeof anthropicClientSingleton>;
}

const anthropic: ReturnType<typeof anthropicClientSingleton> = 
  globalThis.anthropicGlobal ?? 
  anthropicClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.anthropicGlobal = anthropic;
}

export default anthropic;

export { type ClientOptions, Anthropic } from '@anthropic-ai/sdk';

export function createAnthropicClient(options: ClientOptions): Anthropic {
  return new Anthropic(options);
};
