import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts"
export {bcrypt}

import {
  hash as hashPromise,
  hashSync,
  compare as comparePromise,
  compareSync,
} from "https://deno.land/x/bcrypt/mod.ts";

export const isRunningInDenoDeploy = Deno.permissions?.query === undefined; 

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
      new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;
export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
      new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;
