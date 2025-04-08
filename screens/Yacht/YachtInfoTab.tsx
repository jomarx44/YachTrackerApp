import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from 'constant/colors';

const YachtInfoTab:React.FC<{ route: any }> = ({ route }) => {
  const {yacht } = route.params;

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}}>
      <Image source={{ uri: yacht.imageLink }} style={{ width: 200, height: 200 }} />
      </View>
    <View style={styles.infoContainer}>
    <Text style={styles.text}> ID: {yacht.id}</Text>
     <Text style={styles.text}> Slug: {yacht.slug}</Text>
     <Text style={styles.text}> Size: {yacht.size}</Text>
     <Text style={styles.text}> Category: {yacht.category || 'Unknown'} </Text>
     <Text style={styles.text}> Date: {new Date(yacht.dateTime).toLocaleDateString() || 'Unknown'} </Text>
     <Text style={styles.text}> Note:  </Text>
     <Text style={{color: colors.text, margin: 10}}>{yacht.text}</Text>
    </View>
    </View>
  )
}

export default YachtInfoTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  text: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 30
  },
  infoContainer: {
    width: '50%',
    alignItems: 'flex-start',
    marginTop: 20
  }
})