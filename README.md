## 🛥️ Yacht Tracker App
This mobile application allows users to log in using OAuth2, browse yachts, view yacht details including a map and list of historical positions, and add new positions to a yacht with notes and timestamps.

Built with React Native and Expo, this app interacts with the SuperYacht API.

## ✨ Features
🔐 OAuth2 login using PKCE flow

🔍 Search for yachts with full-text fuzzy matching

📍 View yacht location history on a map

📄 List of all past yacht positions

➕ Add new positions with:

    Map pin (uses current location by default)
  
    Long-press to change marker location
  
    Date/time picker and 140-character note
  
📸 View yacht details (name, photo, build info, etc.)


### 🚀 Getting Started

1. Clone the Repo
    `git clone git@github.com:jomarx44/YachTrackerApp.git
    cd yacht-tracker-app`

2. Install Dependencies
    `npm install or yarn`

3. Run the App
    `npx expo start`
Then scan the QR code with Expo Go or your custom dev client.



### 📦 API Reference

POST /yacht_likes/search - Search yachts

GET /yacht_likes/:id/positions - Get yacht positions

POST /positions?yacht_like_id=XXX - Add new yacht position


### 📍 Tech Stack
- React Native (Expo)
- TypeScript
- Expo Auth Session
- React Navigation
- MapView (react-native-maps)
- SecureStore
- SuperYacht Times API

ScreenRecordings

https://drive.google.com/file/d/1Zr4Xy5tNlqDPsIOm_VPEXlNqfbEB3_jr/view?usp=sharing
