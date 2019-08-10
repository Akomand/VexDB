# VexDB AR

VexDB is a mobile application developed in order to make accessing Vex Robotics Competition team records and events convenient. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

First, visit [here](https://brew.sh/) to install Homebrew.

### Installing 

#### Node, Watchman, JDK
Use 'brew' to install the following

```
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

#### Install React-Native CLI
```
npm install -g react-native-cli
```

#### Visit [React-Native](https://facebook.github.io/react-native/docs/getting-started) to set up your dev environment

### Running the application

```
git clone https://github.com/Akomand/VexDB.git
cd VexDB
npm install
```

And repeat

```
react-native run-ios
        OR
react-native run-android
```

## Built With

* React-Native
* Node js
* [VexDB API](https://vexdb.io/the_data)

