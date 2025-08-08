import AuthProvider, { useAuth } from '@/providers/authProvider'
import QueryProvider from '@/providers/query-provider'
import { Stack } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import { ToastProvider } from 'react-native-toast-notifications'

const InitialLayout = () => {
  const { session, mounting } = useAuth()

  // console.log(JSON.stringify(session, null, 2))

  if (mounting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Protected guard={!session}>
        <Stack.Screen name='auth' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name='(shop)'
          options={{ headerShown: false, title: 'CodeShop' }}
        />
        <Stack.Screen
          name='categories'
          options={{
            headerShown: false,
            title: 'Categories',
          }}
        />
        <Stack.Screen
          name='product'
          options={{ headerShown: false, title: 'Product' }}
        />
        <Stack.Screen
          name='cart'
          options={{
            presentation: 'modal',
            title: 'Shopping Cart',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <QueryProvider>
          <InitialLayout />
        </QueryProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
