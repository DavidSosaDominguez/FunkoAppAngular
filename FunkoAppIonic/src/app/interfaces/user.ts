
export interface AppUser {
  email: string;
  name: string;
  surname: string;
  picture: File|null;
}

export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  surname: string;
  pictureURL: string;
}
