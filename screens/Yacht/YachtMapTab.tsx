import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const YachtMapTab: React.FC<{ route: any, positions: any }> = ({ route, positions }) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={positions?.[0]}>
        <Marker
        key={positions?.[0]?.id}
          coordinate={{
            latitude: positions?.[0]?.latitude,
            longitude: positions?.[0]?.longitude
          }}
          title={positions?.[0]?.notes}
        />
      </MapView>
    </View>
  )
}

export default YachtMapTab

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: '100%',
    width: '100%'
  }
})