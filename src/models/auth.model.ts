export type User = {
    email: string;
    password: string;
    verified?: boolean;
    verificationCodeValidation?: string;
    forgotPasswordCode?: string;
    forgotPasswordCodeValidation?: number;
    createdAt?: string;
    updatedAt?: string;
  };
