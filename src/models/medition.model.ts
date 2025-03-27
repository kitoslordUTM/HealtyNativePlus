import { User } from "./auth.model";

export type Medition = {

    id?: string;
    meditionName: string;
    value: number;
    createdAt?: string
    user: User;

}
