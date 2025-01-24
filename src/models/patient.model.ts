export type Patient = {
    // name: string;
    // lastname: string;
    // age: number;
    // gender: string;
    // telephone: number;
    // direction: string;
    // condition: string;
    // createdAt?: Date; // Generado automáticamente por `timestamps: true`
    // updatedAt?: Date; // Generado automáticamente por `timestamps: true`

  patientid: string;   // Identificador único del paciente
  name: string;        // Nombre completo del paciente
  age: number;         // Edad del paciente
  gender: string;      // Género del paciente (Ej: "Femenino", "Masculino", etc.)
  historialid: string;
  }