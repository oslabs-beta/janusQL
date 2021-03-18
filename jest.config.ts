import type {Config} from '@jest/types';

// async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};