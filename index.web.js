/**
 * 日记习惯 - Web入口文件
 * 
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App.tsx';
import { name as appName } from './app.json';

// 注册应用组件为Web应用的根组件
AppRegistry.registerComponent(appName, () => App);

// Web环境的初始化
if (typeof document !== 'undefined') {
  // 确保DOM已加载完成
  document.addEventListener('DOMContentLoaded', () => {
    const rootTag = document.getElementById('root');
    if (rootTag) {
      // 添加应用样式到头部
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(`
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        #root {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
        }
      `));
      document.head.appendChild(style);
      
      // 确保根元素内容为空
      rootTag.innerHTML = '';
      
      // 运行应用
      AppRegistry.runApplication(appName, {
        rootTag: rootTag,
        initialProps: {}
      });
    } else {
      console.error('找不到root元素，无法挂载React应用');
    }
  });
} 