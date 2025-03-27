import { useGetPatientsQuery } from "../services/patient.service";
import { useGetPatientsByDoctorIdQuery } from "../services/medic.service";

export const usePatients = (doctorId?: string) =>{

     const { data: fetchedData = [] } = useGetPatientsQuery({});
     const uniquePatients = fetchedData.filter((patient) => !patient.doctor) || []

     const { data, refetch, isLoading } = useGetPatientsByDoctorIdQuery(
        { doctorId: doctorId! }, // Pasamos un objeto con la clave `doctorId`
        { skip: !doctorId }
      );
      
    
     
    return(
        {
            uniquePatients,
            data
        }
    )
}