import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { StyleSheet, View } from "react-native";
import { LoginProps } from "./utils.view";

export default function Login({ handleLogin }: LoginProps) {
  return (
    <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto bg-[#F8F8F8]"> {/* Added background color */}
      <View className="items-center mb-6"> {/* Center the image */}
        <Image
          source={require('@/assets/login.png')}
          className="h-[150px] w-[150px] rounded-full"  
          alt="image"
          resizeMode="contain"
        />
      </View>

      <Heading size="2xl" className="text-center mb-4"> {/* Added Heading */}
        Hola, Doctor
      </Heading>

      <VStack className="mb-6 space-y-3"> {/* Added spacing between inputs */}
        <Input
          variant="outline"
          size="md"
          className="rounded-xl bg-white"  
        >
          <InputField placeholder="Usuario" /> {/* Changed placeholder */}
        </Input>

        <Input className="rounded-xl bg-white" > {/* Added background color */}
          <InputField
            type="password"
            placeholder="Contraseña"  
          />
        </Input>
      </VStack>

      <Button
        onPress={handleLogin}
        className="px-4 py-2 mb-4 rounded-xl bg-[#007AFF]"  
      >
        <ButtonText size="sm" className="text-white">Iniciar Sesión</ButtonText> {/* Changed button text and color */}
      </Button>

      <View className="flex-row items-center justify-center mb-6"> {/* Centered the "or" separator */}
        <View className="w-1/4 h-[1px] bg-gray-300"></View>
        <Text className="mx-3 text-gray-500">o</Text>
        <View className="w-1/4 h-[1px] bg-gray-300"></View>
      </View>


      <Button
        variant="outline"
        className="px-4 py-2 border-outline-300 rounded-xl mb-4 flex-row items-center justify-center" 
      >
        <Image
          source={require('@/assets/googlePng.jpg')}
          style={style.image}
        />
        <ButtonText size="sm" className="text-typography-600 ml-2"> {/* Added margin to text */}
          Iniciar sesión con Google
        </ButtonText>
      </Button>

      <View className="flex-row justify-center gap-1"> {/* Centered the sign up text */}
        <Text>
          ¿No tienes una cuenta?
        </Text>

        <Text bold={true} className="text-[#007AFF]"> {/* Changed sign up text color */}
          Regístrate
        </Text>
      </View>
    </Card>
  );
}

const style = StyleSheet.create({
  image: {
    width: 20,  
    height: 20, 
    marginRight: 5,
  },
});