# 💊 RxID

What do you get when you mix RFID technology with perscription management? RxID!

## What's the Deal?
RxID is an RFID-enabled bracelet designed for secure medical data storage and automated medication management. By scanning the bracelet, healthcare providers, emergency responders, or caregivers can instantly access critical medical information, ensuring accurate and timely treatment.

The system also features a smart pill dispenser that dispenses the correct dosage based on the user’s prescription schedule when the RFID bracelet is scanned, minimizing the risk of missed doses or incorrect medication intake.

Additionally, doctors, EMS personnel, and other authorized healthcare professionals can update prescriptions, record new medical history, allergies, and emergency notes in a patient’s secure digital profile. These updates sync in real time, ensuring that medical records remain accurate and up to date for optimal patient care. 

## 📽️ Demo Video
Check out the video below to see RxID in action!

## ❇️ Features
- **RFID Card:** connects users to a medical database storing information on their medical conditions and perscriptions. In case of emergency, medical staff can scan the tags and have instant access to their patient's key details.
- **Comprehensive Database**: allows medical professionals to view and edit your medical history and perscriptions, and allows you to keep up to date on your health and medications.  
- **Secure (and Fun!) Pill Dispensing:** a physical dispenser equipped with an internal hopper can release the exact number of pills the user needs, based on their perscription.  

## 🖥️ Technologies
- **Raspberry Pi**
- **Firebase**
- **RFID**
- **Python**
- **Expo**
- **React Native**
- **Typescript**

## 🔧 Mechanical Design
The dispenser mechanism is comprised of three 3D printed pieces, and a placeholder cardboard hopper. A disc with a slot is sized to hold one pill at a time, and rotates between a loading state and a dropping state. Attached is an animation of the mechanism created in SolidWorks. 

https://github.com/user-attachments/assets/4a65a5f0-bbfc-46f4-97bd-6743562c6120

## 🚀 Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/shaansuthar/rxid.git
   cd rxid
   ```
2. Install dependencies
   ```bash
   cd mobile
   npm install
   ```
3. Create environment variables
   - Create a .env file containing your Firebase API information

## ⚙️ Usage
1. Install the Expo Go mobile app
2. Start the program
   ```bash
   cd mobile
   npx expo start
   ```
3. Scan the QR code generated

## 🤝 Contributing
We'd love to see your contributions! Feel free to:
1. Fork the repository
2. Create another branch
3. Submit a pull request

## 🎁 Acknowledgements
Thank you to the volunteers at MakeUofT for giving us the chance to build and present this project!
