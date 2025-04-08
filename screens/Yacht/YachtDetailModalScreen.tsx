import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YachtMapTab from './YachtMapTab';
import YachtPositionsTab from './YachtPositionsTab';
import YachtInfoTab from './YachtInfoTab';
import YachtPositionalModal from './YachtPositionalModal';
import { useEffect, useState } from 'react';
import { colors } from 'constant/colors';
import { Strings } from 'constant/strings';
import { getPositions } from 'services/positionService';

const Tab = createMaterialTopTabNavigator();
export default function YachtDetailModalScreen({ route }: { route: any }) {

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const {yacht } = route.params;

  useEffect(() => {
    refreshPositions();
  }, []);

  const refreshPositions = async () => {
    setLoading(true);
    try {
      const { positions } = await getPositions(yacht.id);
      setPositions(positions);
      setLoading(false);
    } catch (error) {
      console.error('Failed to get positions:', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitle}>{yacht.title}</Text>
        <TouchableOpacity onPress={() => setIsAddModalVisible(true)} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator>
        <Tab.Screen name={Strings.map}>
          {() => <YachtMapTab route={route} positions={positions} />}
        </Tab.Screen>
        <Tab.Screen name={Strings.position}>
          {() => <YachtPositionsTab route={route} positions={positions} loading={loading} />}
        </Tab.Screen>
        <Tab.Screen name={Strings.info}>
          {() => <YachtInfoTab route={route} />}
        </Tab.Screen>
      </Tab.Navigator>

      <YachtPositionalModal
        visible={isAddModalVisible}
        yacht={yacht.id}
        onClose={() => setIsAddModalVisible(false)}
        onPositionAdded={() => { setIsAddModalVisible(false); refreshPositions() }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '500',
    width: '80%'
  },
  addBtn: {
    width: '20%',
    alignItems: 'center'
  },
  addBtnText: {
    fontSize: 30,
    color: colors.text
  }
})