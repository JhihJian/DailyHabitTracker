# 日记习惯 - 每日习惯追踪应用

这是一个基于 React Native 开发的每日习惯追踪应用，帮助用户养成良好的习惯，记录日常进步。

## 功能特点

- 💪 习惯追踪：轻松记录和追踪日常习惯完成情况
- 📊 数据统计：查看习惯连续打卡天数、完成率等统计信息
- 🏆 成就系统：激励用户坚持良好习惯
- 🔔 提醒功能：定时提醒，不错过习惯打卡
- 🌓 深色模式：支持浅色/深色主题切换

## 开发环境设置

### 前提条件

- Node.js
- JDK 11 或更高版本
- Android Studio (用于 Android 开发)
- Xcode (用于 iOS 开发，仅 macOS)

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/daily-habit-tracker.git
cd daily-habit-tracker
```

2. 安装依赖：
```bash
npm install
```

3. 运行 Android 应用：
```bash
npx react-native run-android
```

4. 运行 iOS 应用（仅 macOS）：
```bash
npx react-native run-ios
```

## 项目结构

```
src/
  ├── components/   # 可复用组件
  ├── screens/      # 应用页面
  ├── navigation/   # 路由导航
  ├── context/      # 上下文管理
  ├── utils/        # 工具函数和类型定义
  ├── hooks/        # 自定义 hooks
  ├── assets/       # 静态资源
  └── theme/        # 主题配置
```

## 技术栈

- React Native
- TypeScript
- React Navigation
- AsyncStorage

## 贡献指南

欢迎贡献代码、报告问题或提出改进建议！请先 fork 仓库，然后提交 pull request。

## 许可证

本项目基于 MIT 许可证开源。

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
