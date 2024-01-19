# Running a Capacitor App in ReactJS.

Prerequisites:

- Node.js and npm or **yarn** (recommended) installed on your machine.
- ReactJS project set up.

Could you add the platforms you want to target? For example, to add Android and iOS:

    npx cap add android
    npx cap add ios

Copy the build files to the appropriate Capacitor folder:

    npx cap Copy

Run sync to update the native project with the latest web code:

    npx cap sync

Copy the web assets to the native project:

    npx cap copy

Build your ReactJS app (assuming you are using Yarn):

    yarn run build

Run your Capacitor app on Android with live-reload and external URL:

    npx cap run android -l --external

when you run `npx cap run android -l --external`, it launches your Capacitor app on an Android device or emulator in Android Studio, enables live reload for web code changes and loads the web assets from an external server.

## Generating Signed APK in Android Studio: How to build APK app.  

**Step 1**: Go to **Build** or click on three dots which are located on the hand side where you can find **build option** -> **Generate Signed Bundle** or APK, and a pop-up will arise. Choose APK in the pop-up and click on Next.

![](https://media.geeksforgeeks.org/wp-content/uploads/20200720115426/GSA1-660x273.png)

Now you Can see some things like this:

![](https://i.stack.imgur.com/PHA2I.png)

please select **APK** and click on **next button** as shown in the above image.


**Step 2**: if you already had **keys** and **alias** setup which maybe now is: **android** in both. then, click on the next button

![](https://i.stack.imgur.com/Zpvu3.png)

**Step 3**: After clicking Next in the next pop-up *make sure to choose **release** as Build* Variants and check the two Signature Versions as well. Then click on Finish.

![](https://i.stack.imgur.com/YLPGd.png)

**Step 4**: After completing these steps you can locate your signed app at app -> release -> app-release as your APK file by clicking on that pop-up as shown in the below image.

![](https://media.geeksforgeeks.org/wp-content/uploads/20200720125857/GSA5-660x263.png)

> Now you can put this generated release app into your real device. 
