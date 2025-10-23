import { ImageGallery } from "../../../shared/types/types";

export interface IGalleryUsecase {
  execute(): Promise<ImageGallery[]>;
}
