# My Gallery (Expo) - Assignment Submission

A cross-platform gallery app built with **Expo** and **React Native**, featuring Google authentication, image picking (camera & library), captions, local persistence, sharing, a responsive grid layout, search, and dark mode toggle.

## Features
- Google Sign-In (iOS, Android, Web)
- Profile photo & name displayed after login
- Pick images from gallery or camera
- Grid display with captions underneath
- Manual text input for captions
- Local persistence using AsyncStorage
- Share image + caption (native share on mobile, Web Share API on web)
- Dark mode toggle and search filter
- Offline-first local storage

## Bonus Features
- Dark mode toggle (manual)
- Caption search filter
- Clear separation of components and utilities

## Quick Setup (Local)
1. Install Expo CLI (if not already installed): `npm install -g expo-cli`
2. Install dependencies: `npm install`
3. Add Google OAuth client IDs:
   - Create OAuth credentials in Google Cloud Console.
   - Obtain client IDs for iOS, Android, Web, and Expo.
   - Update `src/screens/LoginScreen.js` with your client IDs.
4. Start the app: `expo start`  
   - Press `i` to run on iOS simulator  
   - Press `a` to run on Android emulator  
   - Press `w` to run on web or scan the QR code with your device

## Project Structure
/assets         - Images, icons, fonts  
/components     - Reusable components (ImageGrid, CaptionInput, etc.)  
/contexts       - AuthContext for Google sign-in  
/screens        - All screens (GalleryScreen, ImageViewScreen, LoginScreen)  
/utils          - Storage & media helpers  
App.js          - Entry point  

## Notes
- Tested on iOS, Android, and Web (Expo)  
- Web images are converted to base64 for proper display  
- Dark mode affects captions and backgrounds throughout the app  
- Offline-first local persistence is implemented via AsyncStorage  
- Voice captions are supported on web (optional native support via `react-native-voice`)  

## Author
- Your Name / Your College Name  
- Assignment Submission for React Native / Expo Project
