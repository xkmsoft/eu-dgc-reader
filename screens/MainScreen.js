import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DGC} from '../components/certificate/DGC';

const prefix = 'HC1:';

export const MainScreen = ({route, navigation}) => {
  const [dgc, setDgc] = useState(null);
  const [err, setErr] = useState(null);
  const [api, setApi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (api === null) {
      AsyncStorage.getItem('api')
        .then(data => {
          if (data) {
            setApi(data);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  });
  useEffect(() => {
    if (route.params.qr) {
      const qr = route.params.qr;
      if (!qr.startsWith(prefix)) {
        setDgc(null);
        console.log(`QR Code: ${qr}`);
        setErr(`prefix validation error: prefix ${prefix} could not be found`);
        return;
      }
      setDgc(null);
      setErr(null);
      setLoading(true);
      axios
        .post(api, {qr})
        .then(response => {
          if (response.data.error === undefined) {
            setDgc(response.data);
          } else {
            setErr(response.data.error);
          }
          setLoading(false);
        })
        .catch(e => {
          setErr(`${e.message}: Please make sure the API you set is correct`);
          setLoading(false);
        });
    }
  }, [api, route.params.qr]);

  function onPress() {
    navigation.navigate('ScannerScreen', {});
  }

  function openModal() {
    setModalVisible(true);
    route.params.qr = null;
    setErr(null);
  }
  function saveAPIAndCloseModal() {
    setModalVisible(false);
    if (api) {
      AsyncStorage.setItem('api', api)
        .then(response => {
          setApi(api);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
  if (dgc === null) {
    if (loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size={'small'} color={'#0000FF'} />
        </View>
      );
    }
    if (err) {
      return (
        <ScrollView>
          <TouchableOpacity
            style={styles.touchableOpacity}
            disabled={api === null}
            onPress={onPress}>
            <Text>Scan QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={openModal}>
            <Text>Set API</Text>
          </TouchableOpacity>
          <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>{err}</Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.touchableOpacity}
          disabled={api === null}
          onPress={onPress}>
          <Text>Scan QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity} onPress={openModal}>
          <Text>Set API</Text>
        </TouchableOpacity>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredContainer}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={setApi}
                placeholder={'Set API URL'}
                value={api}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => saveAPIAndCloseModal()}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
  if (dgc) {
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.touchableOpacity}
          disabled={api === null}
          onPress={onPress}>
          <Text>Scan QR Code</Text>
        </TouchableOpacity>
        <DGC dgc={dgc} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    margin: 10,
    padding: 10,
    color: '#FF0000',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    width: '25%',
    padding: 10,
    elevation: 2,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  touchableOpacity: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
});
