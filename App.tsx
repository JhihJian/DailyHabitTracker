/**
 * 日记习惯 App - 每日追踪您的习惯
 * 
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faPlus, faHome, faChartBar, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

// 自定义颜色常量，匹配原型图中的配色方案
const AppColors = {
  primary: '#4267B2',
  primaryLight: '#768FDE',
  primaryDark: '#2A4172',
  health: '#FF7A5A',
  study: '#3EC8AC',
  growth: '#F7C137',
  work: '#7D70BA',
  white: '#FFFFFF',
  lightGray: '#F8F9FB',
  mediumGray: '#8A94A6',
  darkGray: '#2D3142',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FFC107',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#232F34',
  subText: '#4A6572',
  border: '#E0E0E0',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
};

// 定义习惯数据类型
interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'study' | 'work' | 'growth';
  completed: boolean;
  streak: number;
  total: number;
  current: number;
}

// 示例习惯数据，匹配原型图中的类型
const HABITS: Habit[] = [
  {id: '1', name: '早起晨练', description: '每天6:30起床，进行30分钟晨练', category: 'health', completed: true, streak: 42, total: 3, current: 3},
  {id: '2', name: '阅读', description: '每天阅读30分钟专业书籍', category: 'study', completed: true, streak: 36, total: 3, current: 2},
  {id: '3', name: '编程学习', description: '每天完成一个编程挑战', category: 'work', completed: false, streak: 28, total: 2, current: 1},
  {id: '4', name: '冥想', description: '每天冥想15分钟，保持专注', category: 'growth', completed: true, streak: 55, total: 2, current: 2},
  {id: '5', name: '喝水', description: '每天喝满8杯水', category: 'health', completed: false, streak: 118, total: 4, current: 0},
  {id: '6', name: '英语学习', description: '每天背诵10个英语单词', category: 'work', completed: false, streak: 23, total: 3, current: 1},
  {id: '7', name: '日记', description: '每晚睡前写日记', category: 'growth', completed: false, streak: 47, total: 1, current: 0},
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [habits, setHabits] = useState<Habit[]>(HABITS);
  const [activeTab, setActiveTab] = useState('全部');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // 计算今日总进度
  const totalTasks = habits.reduce((sum, habit) => sum + habit.total, 0);
  const completedTasks = habits.reduce((sum, habit) => sum + habit.current, 0);
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map(habit => {
        if (habit.id === id) {
          const newCompleted = !habit.completed;
          const newCurrent = newCompleted ? (habit.current < habit.total ? habit.current + 1 : habit.current) : 
                                           (habit.current > 0 ? habit.current - 1 : 0);
          return {...habit, completed: newCompleted, current: newCurrent};
        }
        return habit;
      }),
    );
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? AppColors.darkGray : AppColors.lightGray,
  };

  const tabs = ['全部', '健康', '学习', '工作', '成长'];
  
  // 根据活动标签筛选习惯
  const filteredHabits = activeTab === '全部' 
    ? habits 
    : habits.filter(habit => {
        const category = habit.category;
        if (activeTab === '健康' && category === 'health') return true;
        if (activeTab === '学习' && category === 'study') return true;
        if (activeTab === '工作' && category === 'work') return true;
        if (activeTab === '成长' && category === 'growth') return true;
        return false;
      });

  // 获取习惯级别，基于当前完成次数
  const getHabitLevel = (habit: Habit): number => {
    const ratio = habit.current / habit.total;
    if (ratio >= 1) return 3; // 完成
    if (ratio >= 0.5) return 2; // 进行中
    if (ratio > 0) return 1; // 刚开始
    return 0; // 未开始
  };

  // 获取分类的颜色
  const getCategoryColor = (category: 'health' | 'study' | 'work' | 'growth'): string => {
    switch(category) {
      case 'health': return AppColors.health;
      case 'study': return AppColors.study;
      case 'work': return AppColors.work;
      case 'growth': return AppColors.growth;
      default: return AppColors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      {/* 状态栏 */}
      <View style={styles.statusBar}>
        <View></View>
        <Text style={styles.time}>{new Date().toLocaleTimeString().slice(0, 5)}</Text>
        <View style={styles.icons}>
          <Text>📶</Text>
          <Text>📡</Text>
          <Text>🔋</Text>
        </View>
      </View>
      
      {/* 内容区域 */}
      <View style={styles.content}>
        {/* 分类标签 */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTabIndex === index && styles.activeTab
              ]}
              onPress={() => {
                setActiveTab(tab);
                setActiveTabIndex(index);
              }}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTabIndex === index && styles.activeTabText
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* 进度条 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTitle}>
            <Text style={styles.progressTitleText}>今日进度</Text>
            <Text style={styles.progressTitleText}>{completedTasks}/{totalTasks}</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                {width: `${progressPercentage}%`}
              ]}
            />
          </View>
        </View>
        
        {/* 习惯列表 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.habitList}
        >
          {filteredHabits.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyTitle}>还没有习惯</Text>
              <Text style={styles.emptyDesc}>点击底部的"+"按钮创建您的第一个习惯吧！</Text>
            </View>
          ) : (
            filteredHabits.map(habit => {
              const level = getHabitLevel(habit);
              const categoryColor = getCategoryColor(habit.category);
              
              return (
                <TouchableOpacity
                  key={habit.id}
                  style={[
                    styles.habitCard,
                    {borderLeftColor: level > 0 ? categoryColor : 'transparent'},
                    level === 3 && styles.habitCardLevel3
                  ]}
                  onPress={() => toggleHabit(habit.id)}
                >
                  <Text style={styles.habitStatus}>今日: {habit.current}/{habit.total}</Text>
                  <View 
                    style={[
                      styles.habitIcon,
                      {backgroundColor: categoryColor + '20'}, // 使用透明度
                    ]}
                  >
                    <Text style={{fontSize: 20}}>
                      {habit.category === 'health' ? '🚶' : 
                       habit.category === 'study' ? '📚' : 
                       habit.category === 'work' ? '💻' : '🧠'}
                    </Text>
                  </View>
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitName}>{habit.name}</Text>
                    <Text style={styles.habitDesc}>{habit.description}</Text>
                    <Text style={styles.habitTotal}>累计打卡: {habit.streak}次</Text>
                  </View>
                  <View style={[
                    styles.habitAction,
                    habit.completed && styles.habitActionCompleted
                  ]}>
                    <Text style={{color: habit.completed ? AppColors.white : AppColors.darkGray}}>✓</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
      
      {/* 添加按钮 */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      
      {/* 底部导航 */}
      <View style={styles.tabBar}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={styles.tabItemIcon}>🏠</Text>
          <Text style={[styles.tabItemText, styles.tabItemActiveText]}>今日</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabItemIcon}>📊</Text>
          <Text style={styles.tabItemText}>统计</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabItemIcon}>👤</Text>
          <Text style={styles.tabItemText}>我的</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 390,
    alignSelf: 'center',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: AppColors.white,
    position: 'relative',
    height: '100%',
  },
  statusBar: {
    height: 44,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  time: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  icons: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // 为底部导航留出空间
    flex: 1,
  },
  tabs: {
    padding: 4,
    backgroundColor: AppColors.lightGray,
    borderRadius: 20,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: AppColors.primary,
  },
  tabText: {
    color: AppColors.mediumGray,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabText: {
    color: AppColors.white,
  },
  progressContainer: {
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  progressTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    position: 'relative',
    zIndex: 1,
  },
  progressTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.darkGray,
  },
  progressBar: {
    height: 8,
    backgroundColor: AppColors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.primary,
    borderRadius: 4,
  },
  habitList: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    color: AppColors.lightGray,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: AppColors.darkGray,
  },
  emptyDesc: {
    fontSize: 14,
    color: AppColors.mediumGray,
    textAlign: 'center',
  },
  habitCard: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    borderLeftWidth: 4,
  },
  habitCardLevel3: {
    borderLeftWidth: 4,
  },
  habitStatus: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 12,
    color: AppColors.mediumGray,
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: AppColors.darkGray,
  },
  habitDesc: {
    fontSize: 14,
    color: AppColors.mediumGray,
    marginBottom: 4,
  },
  habitTotal: {
    fontSize: 12,
    color: AppColors.mediumGray,
  },
  habitAction: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  habitActionCompleted: {
    backgroundColor: AppColors.success,
  },
  fab: {
    position: 'absolute',
    bottom: 84,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: AppColors.white,
    fontWeight: 'bold',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.03)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabItemActive: {
    color: AppColors.primary,
  },
  tabItemIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: AppColors.mediumGray,
  },
  tabItemActiveText: {
    color: AppColors.primary,
    fontWeight: '600',
  },
});

export default App;
