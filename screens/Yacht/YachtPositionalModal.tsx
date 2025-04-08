import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Strings } from 'constant/strings';
import { colors } from 'constant/colors';
import { addPositions } from 'services/positionService';

interface Props {
  visible: boolean;
  yacht: string;
  onClose: () => void;
  onPositionAdded: () => void;
}
const YachtPositionalModal = ({ visible, yacht, onClose, onPositionAdded }: Props) => {
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(Strings.permissionText);
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude
      });
    }
    getCurrentLocation();
  }, [])

  const handleLongPress = (e: MapPressEvent) => {
    const { coordinate } = e.nativeEvent;
    setLocation(coordinate);
  }

  const handleAddPosition = async () => {
    try {
     const data =  await addPositions(yacht, note, location?.latitude || 0, location?.longitude || 0, date);
     onPositionAdded();
    } catch (error) {
      console.error('Failed to add position:', error);
    }
  }
  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title={Strings.close} onPress={onClose} />
        </View>

        {location && (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              ...location,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            onPress={handleLongPress}
          >
            <Marker
              coordinate={location}
            />
          </MapView>
        )}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{Strings.selectDateTime}</Text>
          <DateTimePicker value={date} onChange={(_, selected) => selected && setDate(selected)} mode='datetime' />
        </View>
        <TextInput
          placeholder={Strings.note}
          maxLength={140}
          value={note}
          onChangeText={setNote}
          style={styles.input}
        />

        <View style={{ marginBottom: 20 }}>
          <Button title={Strings.addPosition} onPress={handleAddPosition} />
        </View>
      </View>
    </Modal>
  )
}

export default YachtPositionalModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "10%",
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dateContainer: {
    marginTop: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  dateText: {
    fontSize: 18, fontWeight: '500'
  },
  input: {
    borderWidth: 1, padding: 8, marginBottom: 16
  }
})