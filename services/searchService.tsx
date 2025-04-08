
import { SEARCH_ENDPOINT } from 'constant/endpoints';
import * as SecureStore from 'expo-secure-store';

export const searchYachts = async (query: string) => {
  const token = await SecureStore.getItemAsync('token');
  const body = {
      size: 25,
      from: 0,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query,
                fields: [
                  "name^3",
                  "previous_names^2"
                ],
                type: "best_fields",
                fuzziness: "AUTO"
              }
            },
            {
              prefix: {
                name: {
                  value: query,
                  boost: 2
                }
              }
            },
            {
              prefix: {
                previous_names: {
                  value: query,
                  boost: 1.5
                }
              }
            },
            {
              term: {
                build_year: {
                  value: query,
                  boost: 5
                }
              }
            }
          ],
          minimum_should_match: 1
        }
      }
  }
  const response = await fetch(SEARCH_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error('Failed to search yachts: ' + errorBody);
  }

  const data = await response.json();
  return data;
}