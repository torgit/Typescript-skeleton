import { DateHelper } from './../../../src/helper/date';
import { User } from './../../../src/database/entity/user';
export const userTor: User = {
    userId: 1,
    firebaseUid: "1",
    email: "tor@hotmail.com",
    displayName: "tor",
    profilePictureUrl: "",
    profilePictureProvider: "google",
    emailVerify: true,
    createdAt: DateHelper.getCurrentUtcDateTime(),
    updatedAt: DateHelper.getCurrentUtcDateTime()
};