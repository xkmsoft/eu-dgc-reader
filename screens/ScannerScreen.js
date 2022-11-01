import React from 'react';

import {StyleSheet, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export const ScannerScreen = ({navigation}) => {
  function onSuccess(e) {
    navigation.navigate('MainScreen', {qr: e.data});
  }
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      showMarker={true}
      topContent={
        <Text style={styles.centerText}>
          Please scan your digital green certificate QR code
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});
