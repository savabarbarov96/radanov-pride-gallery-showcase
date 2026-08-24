import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export type PageKey = "breeding" | "kittens" | "litters" | "shows";

export interface PageMedia {
  _id: Id<"pageMedia">;
  storageId: Id<"_storage">;
  page: PageKey;
  url: string;
  filename: string;
  altText: string;
  caption?: string;
  isDisplayed: boolean;
  sortOrder: number;
  uploadedAt: string;
}

export const useActivePageMedia = (page: PageKey) =>
  useQuery(api.pageMedia.getActivePageMedia, { page }) as PageMedia[] | undefined;

export const useAllPageMedia = (page: PageKey) =>
  useQuery(api.pageMedia.getAllPageMedia, { page }) as PageMedia[] | undefined;

export const useCreatePageMedia = () => useMutation(api.pageMedia.createPageMedia);
export const useUpdatePageMedia = () => useMutation(api.pageMedia.updatePageMedia);
export const useDeletePageMedia = () => useMutation(api.pageMedia.deletePageMedia);
