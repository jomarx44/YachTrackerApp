import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from 'constant/colors'

const YachtPositionsTab: React.FC<{ route: any, positions: any, loading: boolean }> = ({ route, positions, loading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Position List</Text>
      {loading ? <ActivityIndicator size="large" color={colors.secondary} /> : (
        <FlatList
          data={positions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
        <View>
           <Text style={styles.text}>{index + 1}. {item.notes}</Text>
        </View>
      )}
      />)
    }
    </View>
  )
}

export default YachtPositionsTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    marginTop: 100,
  },
  textTitle: {
    fontSize: 23,
    fontWeight: '500',
    marginBottom: 10
  },
  text: {
    fontSize: 23,
    fontWeight: '500'
  }
})