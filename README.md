# DNA-C Claim Devices Mobile App

This app is used to claim Day-0 or DNA-C supported Plug-n-Play(PnP) devices and provision it. As a first step, we are listing the uncalimed devices found by PnP service.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See Deployment section on how to deploy the project on a live system.

### Prerequisites

- MacBook
- Xcode min v9.3.1 (9E501)
- node.js min v8.x


## Deployment

- Clone the repo
- Run npm install to get the dependencies
- Open Xcode and choose Open existing project. Select ios/claimDevices from the cloned repo and open it
- Will load the project in Xcode
- Either select your MacBook USB connected device or select a simulator from Xcode.
- Click on Play button (>) to build and deploy the app to the selected device

## Debugging

- Command /bin/sh failed with exit code 2
Select Show the Project Navigator. Select claimDevices --> Libraries --> React.xcodeproj. Select Build Phases tab. Expand Start Packager and change the port to 8888.
Search 8081 port in your cloned project and replace it with 8888 (RCTDefines.h -> line # 79 and 88 and in RCTInspectorDevServerHelper.mm)

- Network request failed
Open RCTHTTPRequestHandler.h file in XCode. Search "#pragma mark - NSURLSession delegate" and then add the following code
- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential *))completionHandler{
    if([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust]){
        //if([challenge.protectionSpace.host isEqualToString:@"mydomain.com"]){
            NSURLCredential *credential = [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust];
            completionHandler(NSURLSessionAuthChallengeUseCredential,credential);
        // }
    }
}

- Code signing error (during installation on mobile using XCode)
Select Show the Project Navigator. Select claimDevices --> General tab and expand "Signing" accordian. Add an account using Team dropdown. Sign in with your Apple ID 
Also, change the bundle identifier to different path under  claimDevices --> General tab --> Identity



## Installation

- On deploy the app in mobile, it will ask to trust the Untrusted Enterprise developer.

[![TrustApp](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/trust_device_message.png)](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/trust_device_message.png)

- In the mobile, navigate to Settings --> General --> Device Management --> Profiles
- Click on 'Trust ClaimDevices'
- Pop-up will appear and click on Trust in the pop-up
- After trust, the app run smoothly and it will launch the login screen

## Screenshots

### Login screen

[![Login](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/login_screen.png)](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/login_screen.png)

### Unclaimed devices list screen



[![Unclaimed](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/unclaimed_devices_list_screen.png)](https://github.com/CiscoDevNet/DNAC-ClaimAP-Mobile-App/blob/master/img/unclaimed_devices_list_screen.png)

## Built With

* react-native
* react
* redux
* react-redux
* react-native-vector-icons

## License

See the [LICENSE](LICENSE) file for details
