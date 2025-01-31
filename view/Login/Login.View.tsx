import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Image } from "react-native"
import { Text } from "@/components/ui/text"
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control"
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { StyleSheet } from "react-native" 
import { LoginProps } from "./utils.view"


export default function Login( { handleLogin}:LoginProps ) {




  return (
    <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto  ">
    <Image
      source={require('@/assets/login.png')}
      className="mb-6 h-[240px] w-[300px] rounded-md aspect-[4/3]"
      alt="image"
    />
   
    <VStack className="mb-6">
      
        <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="mb-3 rounded-xl"
      >
        <InputField placeholder="Correo electrónico" />
      </Input>

    
      <Input className="my-1  rounded-xl"  >
        <InputField
          type="password"
          placeholder="password"
          />
      </Input>

    </VStack>

    <Box className="flex-col sm:flex-row">
      <Button  
      onPress={handleLogin}
      className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1 rounded-xl" >
        <ButtonText size="sm">Sign In</ButtonText>
      </Button>
      <Button
        variant="outline"
        className="px-4 py-2 border-outline-300 sm:flex-1  rounded-xl mb-2"
      >
        <ButtonText size="sm" className="text-typography-600 ">
          Sign In with Google
        </ButtonText>
        
        <Image
        source={require('@/assets/googlePng.jpg')}
        style={style.image}
        />


      </Button>

      <Box className="flex-row gap-1 mt-1 mb-6">
      <Text>
        Don't have an account?
      </Text>

      <Text bold={true}  >
        Sign up
      </Text>

      </Box>
    </Box>
  </Card>
  )
}


const style = StyleSheet.create({
  image: {
    width: 15
    , height: 15
  }
});