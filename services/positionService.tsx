import * as SecureStore from 'expo-secure-store';
import { ADD_POSITION_ENDPOINT, POSITION_ENDPOINT } from 'constant/endpoints';

export async function getPositions(yachtLikeId: number | string): Promise<any> {
  const token = await SecureStore.getItemAsync('token');
  const response = await fetch(`${POSITION_ENDPOINT.replace('<NUMBER>', yachtLikeId.toString())}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to get positions');
  }
  const data = await response.json();
  return data;
}


export async function addPositions(yachtLikeId: number | string, notes: string, latitude: number, longitude: number, dateTime: Date,): Promise<any> {
  console.log("object: ", {
    yachtLikeId,
    notes,
    latitude,
    longitude,
    dateTime
  })
  const token = await SecureStore.getItemAsync('token');
  const response = await fetch(`${ADD_POSITION_ENDPOINT.replace('<NUMBER>', yachtLikeId.toString())}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      yacht_like_id: yachtLikeId,
      date_time: dateTime,
      lat: latitude,
      lon: longitude,
      notes
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add position');
  }
  const data = await response.json();
  return data;
}
