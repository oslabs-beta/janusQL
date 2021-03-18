import type {Config} from '@jest/types';

// sync object
// const config: Config.InitialOptions = {
//   verbose: true,
// };
// export default config;

// async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};