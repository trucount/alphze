'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import usersData from '../../data/users.json'

interface User {
  id: number;
  username: string;
  email: string;
  quizScores: { [quizId: number]: number };
  likedVideos: number[];
  achievements: string[];
  level: number;
  xp: number;
  watchTime: number;
  streak: number;
  lastLoginDate: string;
  badges: string[];
  friends: number[];
  watchlist: number[];
  reviewsWritten: number;
  commentsPosted: number;
  videosShared: number;
  customLists: { name: string; videos: number[] }[];
  preferences: {
    favoriteGenres: string[];
    notificationSettings: {
      email: boolean;
      push: boolean;
    };
    colorScheme: string;
  };
  challenges: string[];
  rewards: string[];
  watchParties: number[];
  recommendations: number[];
  viewingHistory: number[];
  quizCreated: number;
  pollsParticipated: number;
  dailyChallengesCompleted: number;
  weeklyGoals: {
    watchTime: number;
    quizzesCompleted: number;
    commentsPosted: number;
  };
  socialScore: number;
  contentCreatorScore: number;
  fanTheories: string[];
  predictionsCorrect: number;
  virtualCurrency: number;
  subscriptionTier: string;
  referrals: number;
  seasonPassProgress: number;
  avatarItems: string[];
  profileTheme: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
  updateQuizScore: (quizId: number, score: number) => void;
  updateWatchTime: (videoId: number, time: number) => void;
  leaderboard: User[];
  notifications: string[];
  addNotification: (message: string) => void;
  addXP: (xp: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    setLeaderboard(usersData.sort((a, b) => b.xp - a.xp));
  }, []);

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      setLeaderboard(prev => 
        prev.map(u => u.id === newUser.id ? newUser : u).sort((a, b) => b.xp - a.xp)
      );
    }
  };

  const updateQuizScore = (quizId: number, score: number) => {
    if (user) {
      const newQuizScores = { ...user.quizScores, [quizId]: score };
      updateUser({ quizScores: newQuizScores, xp: user.xp + score });
    }
  };

  const updateWatchTime = (videoId: number, time: number) => {
    if (user) {
      const newWatchTime = user.watchTime + time;
      updateUser({ watchTime: newWatchTime });
    }
  };

  const login = async (email: string, password: string) => {
    const foundUser = usersData.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (username: string, email: string, password: string) => {
    const newUser: User = {
      id: usersData.length + 1,
      username,
      email,
      password,
      quizScores: {},
      likedVideos: [],
      achievements: [],
      level: 1,
      xp: 0,
      watchTime: 0,
      streak: 0,
      lastLoginDate: new Date().toISOString(),
      badges: [],
      friends: [],
      watchlist: [],
      reviewsWritten: 0,
      commentsPosted: 0,
      videosShared: 0,
      customLists: [],
      preferences: {
        favoriteGenres: [],
        notificationSettings: {
          email: true,
          push: true,
        },
        colorScheme: 'default',
      },
      challenges: [],
      rewards: [],
      watchParties: [],
      recommendations: [],
      viewingHistory: [],
      quizCreated: 0,
      pollsParticipated: 0,
      dailyChallengesCompleted: 0,
      weeklyGoals: {
        watchTime: 0,
        quizzesCompleted: 0,
        commentsPosted: 0,
      },
      socialScore: 0,
      contentCreatorScore: 0,
      fanTheories: [],
      predictionsCorrect: 0,
      virtualCurrency: 0,
      subscriptionTier: 'free',
      referrals: 0,
      seasonPassProgress: 0,
      avatarItems: [],
      profileTheme: 'default',
    };
    setUser(newUser);
    setLeaderboard(prev => [...prev, newUser].sort((a, b) => b.xp - a.xp));
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
  };

  const addXP = (xp: number) => {
    if (user) {
      updateUser({ xp: user.xp + xp });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      updateUser,
      updateQuizScore,
      updateWatchTime,
      leaderboard,
      notifications,
      addNotification,
      addXP,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

