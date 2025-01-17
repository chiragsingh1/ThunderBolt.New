import { createContext, Dispatch, SetStateAction } from "react";
import { GenericId } from "convex/values";

export interface UserDetail {
    _id: GenericId<"users">;
    _creationTime: number;
    name: string;
    email: string;
    picture: string;
    uid: string;
    token?: number;
}

interface UserContextType {
    userDetail: UserDetail | null;
    setUserDetail: Dispatch<SetStateAction<UserDetail>>;
}

export const UserContext = createContext<UserContextType>({
    userDetail: null,
    setUserDetail: () => {},
});
