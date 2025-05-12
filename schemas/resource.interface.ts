import { type Resource as IResource } from "@portaljs/ckan";

export type Resource = IResource & {
  iframe?: boolean;
};
