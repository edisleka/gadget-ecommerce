import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as z from 'zod'

const formSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Email is required'
        : 'Invalid email address',
  }),
  password: z.string().min(8, {
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Password is required'
        : 'Password must be at least 8 characters',
  }),
})

export default function Auth() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signIn = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const signUp = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the app</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        <Controller
          control={control}
          name='email'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Email'
                placeholderTextColor='#aaa'
                autoCapitalize='none'
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Password'
                secureTextEntry
                placeholderTextColor='#aaa'
                autoCapitalize='none'
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(signIn)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={handleSubmit(signUp)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUpButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%',
  },
})
