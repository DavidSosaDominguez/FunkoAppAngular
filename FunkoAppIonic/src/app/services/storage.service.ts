import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  async uploadPicture(picture: File, uid: string): Promise<string> {
    const extension = picture.name.split('.').pop();
    const filePath = `profile_pictures/${uid}.${extension}`;
    const imageRef = ref(this.storage, filePath);

    await uploadBytes(imageRef, picture);
    return await getDownloadURL(imageRef);
  }

  async getDefaultPicture() {
    const filePath = `profile_pictures/profile.png`;
    const imageRef = ref(this.storage, filePath);
    return await getDownloadURL(imageRef);
  }
}
