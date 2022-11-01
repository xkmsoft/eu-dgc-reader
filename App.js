import React from 'react';
import {MainScreen} from './screens/MainScreen';
import {ScannerScreen} from './screens/ScannerScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          initialParams={{qr: null}}
          options={{title: 'EU DGC QR Code Verifier'}}
        />
        <Stack.Screen
          name="ScannerScreen"
          component={ScannerScreen}
          options={{title: 'QR Code Scanner'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
