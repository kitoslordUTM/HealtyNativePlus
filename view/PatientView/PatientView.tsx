import { Patient } from "@/src/models/patient.model";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";



export default function PatientView () {

 
  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3 bg-gray-800 shadow-lg">


    {/* Contenedor con nombre y avatar */}
    <Box className="flex-row items-center mb-6">
      {/* Avatar */}
      <Avatar className="mr-4">
        <AvatarFallbackText>RR</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: "https://gluestack.github.io/public-blog-video-assets/john.png",
          }}
          alt="image"
        />
      </Avatar>

      {/* Nombre del paciente */}
      <VStack className="flex-grow">
        <Heading size="md" className="mb-2 text-white text-center">
          {patient.name}
        </Heading>
        <Text size="sm" className="text-gray-500 text-center">
          {patient.patientid}
        </Text>
      </VStack>
    </Box>

    {/* Información adicional */}
    <Box className="flex-row justify-between text-gray-300">
      <VStack>
        <Heading size="sm" className="mb-1 text-white">
          Edad: {patient.age}
        </Heading>
        <Text size="sm">Genero: {patient.gender}</Text>
      </VStack>
    </Box>
    <Box className="flex-col sm:flex-row">

    <Link href={`/patient/${patient.name}`} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-5">
      Ver
    </Link>

      <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" 
      >
        <ButtonText size="sm">Ver paciente</ButtonText>
      </Button>
         
    </Box>
  </Card>
  )
}
