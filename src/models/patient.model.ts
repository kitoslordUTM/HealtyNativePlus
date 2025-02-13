

export type Patient = {
  _id?: string;
  name: string;
  lastname: string;
  age: number;
  gender: string;
  telephone: number;
  direction: string;
  condition: string;
  user: string
  // createdAt?: Date; // Generado automáticamente por `timestamps: true`
  // updatedAt?: Date; // Generado automáticamente por `timestamps: true`
};
