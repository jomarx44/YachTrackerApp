import { ActivityIndicator, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { colors } from 'constant/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/type';
import { Strings } from 'constant/strings';
import { searchYachts } from 'services/searchService';
import { results } from './testData';

type YachtSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'YachtSearch'>;

const YachtSearchScreen: React.FC<YachtSearchScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [yachts, setYachts] = useState(results);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    try {
      const yachts = await searchYachts(query);
      if (yachts) {
        setYachts(yachts);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const openYachtDetails = (item: any) => {
    navigation.navigate('YachtDetails', { yacht: item });
  }
  return (
    <SafeAreaView style={styles.container}>
      {error && <Text style={{ color: 'red', textAlign: 'left', width: '90%', marginVertical: 10 }}>Error occurred while searching yachts</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={Strings.yachtSearchText}
          style={styles.input}
          value={query}
          onChangeText={(text) => setQuery(text)} />
        <Button title={Strings.searchButton} onPress={handleSearch} />
      </View>
      {loading ? <ActivityIndicator size="large" color={colors.secondary} /> : (
        <View style={styles.listContainer}>
          <FlatList
            data={yachts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => openYachtDetails(item)} style={styles.itemContainer}>
                  <Image source={{ uri: item.imageLink }} style={styles.image} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title} ellipsizeMode='tail' numberOfLines={3}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            numColumns={2}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default YachtSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%'
  },
  itemContainer: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    margin: 5, height: 350, width: '47%',
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10
  },
  titleContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 14, fontWeight: '500'
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  }
});
