import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/context/AuthProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const { session, isLoading } = useSession();

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (!session) {
  //   return <Redirect href='/login' />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
        },
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'albums' : 'albums-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='word_management'
        options={{
          title: 'Word Management',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'create' : 'create-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
