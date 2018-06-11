#DNA-C Claim Devices Mobile App
DNA-C ClaimDevices mobile app is used to claim Day-0 or DNA-C supported Plug-n-Play(PnP) devices and provision it. As a first step, we are listing the uncalimed devices found by PnP service.

Prerequisite:
- MacBook 
- Xcode Version 9.3.1 (9E501)

Steps to deploy the mobile app to iOS devices:
- Clone the repo
- Open Xcode editior and navigate to ios/claimDevices and open it
- Will load the project in Xcode
- Either select your MacBook USB connected device or select a simulator from Xcode.
- Click on Play button (>) to build and deploy the app to the selected device

Launch:
- If you launch the app after successful deploy, it will prompt to enter your DNA-C Cluster IP address and its credentials.
- Use a cluster which as unclaimed devices to view the data in the App.
- Default, it will list few hardcoded PnP simulated devices in the page.
