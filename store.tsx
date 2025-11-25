
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, Moment, MovieData, GameGenreData, SkillData, User, Theme, Language, GalleryItem, PhotoStatsData, RoutineData, StepData, Project, ShareItem } from './types';
import { BLOG_POSTS, MOMENTS, MOVIE_DATA, GAME_GENRE_DATA, SKILLS_DATA, PHOTO_WALL_IMAGES, GALLERY_ITEMS, PHOTO_STATS_DATA, ROUTINE_DATA, STEPS_DATA, PROJECTS, SHARE_ITEMS } from './constants';

// --- Translations ---
const TRANSLATIONS = {
  en: {
    'Home': 'Home',
    'Articles': 'Articles',
    'Moments': 'Moments',
    'Gallery': 'Gallery',
    'Life Log': 'Life Log',
    'Dashboard': 'Life Log', 
    'Projects': 'Projects',
    'Login': 'Login',
    'Logout': 'Logout',
    'My Data': 'Life Log',
    'Latest Updates': 'Latest Updates',
    'Mixed Feed': 'Mixed Feed',
    'Curated': 'Curated',
    'At a Glance': 'At a Glance',
    'Designed with': 'Designed with',
    'Read More': 'Read More',
    'min read': 'min read',
    'Just now': 'Just now',
    'Welcome Back': 'Welcome Back',
    'Join Lumina': 'Join Lumina',
    'Sign In': 'Sign In',
    'Create Account': 'Create Account',
    'Username': 'Username',
    'Password': 'Password',
    'Login / Sign up': 'Login / Sign up',
    'Better every day': 'Better every day',
    "Let's change": "Let's change",
    "it up a bit": "it up a bit",
    "Welcome to my digital garden...": "Welcome to my digital garden. I'm a Product Manager capturing light, exploring tech, and sharing the small data of my daily life.",
    'Watching': 'Watching',
    'Playing': 'Playing',
    'Focus': 'Focus',
    'Current learning priority': 'Current learning priority',
    'Recent Snapshots': 'Recent Snapshots',
    'Shuffle': 'Shuffle',
    'No content found here yet.': 'No content found here yet.',
    'Search': 'Search',
    'Admin': 'Admin',
    'Close': 'Close',
    'Settings': 'Settings',
    'Language': 'Language',
    'Theme': 'Theme',
    'Dark': 'Dark',
    'Light': 'Light',
    'All': 'All',
    'Filter': 'Filter',
    'Camera': 'Camera',
    'Lens': 'Lens',
    'Aperture': 'Aperture',
    'ISO': 'ISO',
    'Shutter': 'Shutter',
    'Location': 'Location',
    'Video': 'Video',
    'Shutter Count': 'Shutter Count',
    'Daily Photos Taken': 'Daily Photos Taken',
    'The Balance': 'The Balance',
    'Weekly Routine': 'Weekly Routine',
    'The Journey': 'The Journey',
    'Daily Steps': 'Daily Steps',
    'The Output': 'The Output',
    'Media Diet': 'Media Diet',
    'Movies & Games': 'Movies & Games',
    'Quantifying the hobbies that keep me sane.': 'Quantifying the habits that make me, me.',
    'About Me': 'About Me',
    'Product Manager': 'Product Manager',
    'Photographer': 'Photographer',
    'Tech Enthusiast': 'Tech Enthusiast',
    'Get in Touch': 'Get in Touch',
    'Live Demo': 'Live Demo',
    'Source Code': 'Source Code',
    'Selected Projects': 'Selected Projects',
    'A collection of my digital creations.': 'A collection of my digital creations.'
  },
  zh: {
    'Home': '首页',
    'Articles': '文章',
    'Moments': '瞬间',
    'Gallery': '影像馆',
    'Life Log': '生活日志',
    'Dashboard': '生活日志',
    'Projects': '项目',
    'Login': '登录',
    'Logout': '登出',
    'My Data': '生活数据',
    'Latest Updates': '最新动态',
    'Mixed Feed': '混合流',
    'Curated': '精选',
    'At a Glance': '概览',
    'Designed with': '设计',
    'Read More': '阅读更多',
    'min read': '分钟阅读',
    'Just now': '刚刚',
    'Welcome Back': '欢迎回来',
    'Join Lumina': '加入 Lumina',
    'Sign In': '登录',
    'Create Account': '创建账户',
    'Username': '用户名',
    'Password': '密码',
    'Login / Sign up': '登录 / 注册',
    'Better every day': '日日精进',
    "Let's change": "尝试一些",
    "it up a bit": "新鲜事物",
    "Welcome to my digital garden...": "欢迎来到我的数字花园。我是产品经理，在这里捕捉光影、探索科技，并分享我日常生活中的小数据。",
    'Watching': '观影',
    'Playing': '在玩',
    'Focus': '关注',
    'Current learning priority': '当前学习重点',
    'Recent Snapshots': '近期快照',
    'Shuffle': '随机切换',
    'No content found here yet.': '暂无内容',
    'Search': '搜索',
    'Admin': '管理',
    'Close': '关闭',
    'Settings': '设置',
    'Language': '语言',
    'Theme': '主题',
    'Dark': '深色',
    'Light': '浅色',
    'All': '全部',
    'Filter': '筛选',
    'Camera': '相机',
    'Lens': '镜头',
    'Aperture': '光圈',
    'ISO': 'ISO',
    'Shutter': '快门',
    'Location': '地点',
    'Video': '视频',
    'Shutter Count': '快门计数',
    'Daily Photos Taken': '每日拍摄数量',
    'The Balance': '平衡',
    'Weekly Routine': '每周例程',
    'The Journey': '旅程',
    'Daily Steps': '每日步数',
    'The Output': '产出',
    'Media Diet': '精神食粮',
    'Movies & Games': '影视与游戏',
    'Quantifying the hobbies that keep me sane.': '量化构成自我的每一个习惯。',
    'About Me': '关于我',
    'Product Manager': '产品经理',
    'Photographer': '独立摄影',
    'Tech Enthusiast': '数码玩家',
    'Get in Touch': '保持联系',
    'Live Demo': '在线演示',
    'Source Code': '源代码',
    'Selected Projects': '精选项目',
    'A collection of my digital creations.': '展示我的数字创造与实验。'
  }
};

// --- Settings Context ---
interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  // Apply theme to html
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string) => {
    // @ts-ignore
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, language, setLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => boolean;
  register: (username: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock User Database
  const [users, setUsers] = useState<Map<string, string>>(new Map([
      ['admin', 'lumina123'],
      ['visitor', 'visitor123']
  ]));

  const login = (u: string, p: string) => {
    if (users.has(u) && users.get(u) === p) {
      setUser({ 
          username: u, 
          role: u === 'admin' ? 'admin' : 'user' 
      });
      return true;
    }
    return false;
  };

  const register = (u: string, p: string) => {
      if (users.has(u)) return false;
      const newUsers = new Map(users);
      newUsers.set(u, p);
      setUsers(newUsers);
      setUser({ username: u, role: 'user' });
      return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// --- Data Context ---
interface DataContextType {
  posts: BlogPost[];
  moments: Moment[];
  shareItems: ShareItem[];
  projects: Project[];
  galleryItems: GalleryItem[];
  movieData: MovieData[];
  gameData: GameGenreData[];
  skillData: SkillData[];
  photoStats: PhotoStatsData[];
  routineData: RoutineData[];
  stepsData: StepData[];
  heroImages: string[];
  
  // CRUD Actions
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  
  addMoment: (moment: Moment) => void;
  updateMoment: (moment: Moment) => void;
  deleteMoment: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  addShareItem: (item: ShareItem) => void;
  updateShareItem: (item: ShareItem) => void;
  deleteShareItem: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  // Data Setters
  updateMovieData: (data: MovieData[]) => void;
  updateGameData: (data: GameGenreData[]) => void;
  updateSkillData: (data: SkillData[]) => void;
  updatePhotoStats: (data: PhotoStatsData[]) => void;
  updateRoutineData: (data: RoutineData[]) => void;
  updateStepsData: (data: StepData[]) => void;
  updateHeroImages: (images: string[]) => void;
  
  // Social Actions
  toggleLike: (id: string, type: 'article' | 'moment' | 'share') => void;
  addComment: (id: string, type: 'article' | 'moment', text: string, username: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [moments, setMoments] = useState<Moment[]>(MOMENTS);
  const [shareItems, setShareItems] = useState<ShareItem[]>(SHARE_ITEMS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [movieData, setMovieData] = useState<MovieData[]>(MOVIE_DATA);
  const [gameData, setGameData] = useState<GameGenreData[]>(GAME_GENRE_DATA);
  const [skillData, setSkillData] = useState<SkillData[]>(SKILLS_DATA);
  const [photoStats, setPhotoStats] = useState<PhotoStatsData[]>(PHOTO_STATS_DATA);
  const [routineData, setRoutineData] = useState<RoutineData[]>(ROUTINE_DATA);
  const [stepsData, setStepsData] = useState<StepData[]>(STEPS_DATA);
  const [heroImages, setHeroImages] = useState<string[]>(PHOTO_WALL_IMAGES);

  // --- CRUD Operations ---

  // Posts
  const addPost = (post: BlogPost) => setPosts([post, ...posts]);
  const updatePost = (updated: BlogPost) => setPosts(posts.map(p => p.id === updated.id ? updated : p));
  const deletePost = (id: string) => setPosts(posts.filter(p => p.id !== id));

  // Moments
  const addMoment = (moment: Moment) => setMoments([moment, ...moments]);
  const updateMoment = (updated: Moment) => setMoments(moments.map(m => m.id === updated.id ? updated : m));
  const deleteMoment = (id: string) => setMoments(moments.filter(m => m.id !== id));

  // Projects
  const addProject = (project: Project) => setProjects([project, ...projects]);
  const updateProject = (updated: Project) => setProjects(projects.map(p => p.id === updated.id ? updated : p));
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));

  // Share Items (Curated)
  const addShareItem = (item: ShareItem) => setShareItems([item, ...shareItems]);
  const updateShareItem = (updated: ShareItem) => setShareItems(shareItems.map(s => s.id === updated.id ? updated : s));
  const deleteShareItem = (id: string) => setShareItems(shareItems.filter(s => s.id !== id));

  // Gallery
  const addGalleryItem = (item: GalleryItem) => setGalleryItems([item, ...galleryItems]);
  const updateGalleryItem = (updated: GalleryItem) => setGalleryItems(galleryItems.map(g => g.id === updated.id ? updated : g));
  const deleteGalleryItem = (id: string) => setGalleryItems(galleryItems.filter(g => g.id !== id));

  // Stats Data Setters
  const updateMovieData = (data: MovieData[]) => setMovieData(data);
  const updateGameData = (data: GameGenreData[]) => setGameData(data);
  const updateSkillData = (data: SkillData[]) => setSkillData(data);
  const updatePhotoStats = (data: PhotoStatsData[]) => setPhotoStats(data);
  const updateRoutineData = (data: RoutineData[]) => setRoutineData(data);
  const updateStepsData = (data: StepData[]) => setStepsData(data);
  const updateHeroImages = (images: string[]) => setHeroImages(images);

  // Social Operations
  const toggleLike = (id: string, type: 'article' | 'moment' | 'share') => {
      if (type === 'article') {
          setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
      } else if (type === 'moment') {
          setMoments(moments.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
      } else if (type === 'share') {
          setShareItems(shareItems.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
      }
  };

  const addComment = (id: string, type: 'article' | 'moment', text: string, username: string) => {
      const newComment = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          content: text,
          date: new Date().toLocaleDateString()
      };

      if (type === 'article') {
          setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, newComment] } : p));
      } else {
          setMoments(moments.map(m => m.id === id ? { ...m, comments: [...m.comments, newComment] } : m));
      }
  };

  return (
    <DataContext.Provider value={{
      posts, moments, shareItems, projects, galleryItems, 
      movieData, gameData, skillData, photoStats, routineData, stepsData, heroImages,
      
      addPost, updatePost, deletePost,
      addMoment, updateMoment, deleteMoment,
      addProject, updateProject, deleteProject,
      addShareItem, updateShareItem, deleteShareItem,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,

      updateMovieData, updateGameData, updateSkillData, 
      updatePhotoStats, updateRoutineData, updateStepsData, updateHeroImages,

      toggleLike, addComment
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
