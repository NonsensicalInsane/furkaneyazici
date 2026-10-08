// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

declare namespace App {
  interface Locals {
    /** Language of the post being rendered (SinglePost.astro), for <Term> */
    postLang?: string;
  }
}
