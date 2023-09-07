import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your tab screen components
import ContactListPage from './src/screens/contacts/contactListPage';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={ContactListPage} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabBar;
