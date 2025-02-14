import { Patient } from "@/src/models/patient.model"

export type PatientListProps = {
    data: Patient[]
    refetch: () => void
}
