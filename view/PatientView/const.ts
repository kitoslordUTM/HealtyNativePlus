import { Patient } from "@/src/models/patient.model"
import React from "react"

export type PatientListProps = {
    data: Patient[]
    refetch: () => void
    button?: React.ReactNode
}
