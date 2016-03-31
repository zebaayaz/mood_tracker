# Mood Tracker

This is the mood tracker app that will be submitted as a prototype for Computer Science 320 at UMass Amherst, in the Spring semester 2016. 

To set up this app, you will need to do a few things. First, you will need to install some components in order for the app to run on your machine. You will need:



Node.js and NPM (follow instructions at https://nodejs.org/en/).

Ionic (once you have Node and NPM installed, run this command: `npm install -g ionic`)



Now, you will create a local version of this repository on your machine. First, fork this repository (if you are not sure how to do that, ask me or use Github's documentation).

Once you have done that, go to a terminal or command prompt and cd into whatever directory you want your local repo to be located in (I use my home directory). Once that is done, run the following command:

`git clone git@github.com:username/mood_tracker`

where 'username' is your github username. This will create a local repository on your machine.

Once that is done, and you have a copy of the repository, you are going to need to install a few more components. Run the following two commands in the directory of your local repository (if you are in your home directory, run `cd mood_tracker`)

`npm install`
`bower install`

And that should be all you need! The code we will be working on is all located in the folder `www/js`

To actually run the app and see what it looks like, you can do a few different things.
Running `ionic serve -c` will open a local server where you can view the app in your browser (-c indicates console logs so you can see some error logging and other useful javascripty things). It may look a little different and act differently than on your phone, but it will at least give you an idea of what the functionality of your changes are.

To emulate the app on your machine as if it were on a phone, there are a few things that need to be done first.

For IOS: Make sure that you have the latest versions of XCode and XCode command line tools installed (download from the app store).
For Android: Make sure you have the latest versions of the Android SDK and the JDK. Also you must create an Android virtual device (instructions here: http://developer.android.com/tools/devices/managing-avds.html).

Then, run `ionic emulate {platform}` where `platform` is either `ios` or `android`. This will open an emulator on your machine that will act more like a phone. Try to only do this when your browser is acting funny with functionality or you are testing for a release.

If you have any questions about setting up the app, please feel free to contact me on slack or via email (bgregg@umass.edu).

Also, here are some great tutorials on how to use Ionic. It is a great framework with great documentation.

http://ionicframework.com/docs/overview/

Any of those tutorials will be helpful when trying to learn the basics of Ionic/Angular.

This is a test commit