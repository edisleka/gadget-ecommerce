import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function TabsLayout() {
  return (
    // <SafeAreaView edges={['top']} style={styles.safeArea}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1BC464',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          // paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <Entypo name='shopping-cart' size={24} color={color} />
          ),
          tabBarLabel: 'Shop',
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='book' size={24} color={color} />
          ),
          tabBarLabel: 'Orders',
        }}
      />
    </Tabs>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
