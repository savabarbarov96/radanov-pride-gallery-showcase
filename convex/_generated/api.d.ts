/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as cats from "../cats.js";
import type * as contact from "../contact.js";
import type * as files from "../files.js";
import type * as imageMigration from "../imageMigration.js";
import type * as pedigree from "../pedigree.js";
import type * as reservations from "../reservations.js";
import type * as seed from "../seed.js";
import type * as siteSettings from "../siteSettings.js";
import type * as tiktokVideos from "../tiktokVideos.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  cats: typeof cats;
  contact: typeof contact;
  files: typeof files;
  imageMigration: typeof imageMigration;
  pedigree: typeof pedigree;
  reservations: typeof reservations;
  seed: typeof seed;
  siteSettings: typeof siteSettings;
  tiktokVideos: typeof tiktokVideos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
