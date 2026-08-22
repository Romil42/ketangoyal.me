import {
  createImageUrlBuilder,
  type ImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import {sanityClient} from "./client";

const imageBuilder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource): ImageUrlBuilder {
  return imageBuilder.image(source).auto("format").fit("max");
}
