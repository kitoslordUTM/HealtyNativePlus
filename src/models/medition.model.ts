import { User } from "./auth.model";

export type Medition = {

    id?: string;
    meditionName: string;
    value: number;
    date: Date;
    user: User;

}
