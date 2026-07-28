export type Language = "en" | "ru" | "uz"

export interface Translations {
  // Navigation
  nav: {
    tasks: string
    leaderboard: string
    about: string
    login: string
    getStarted: string
    home: string
  }
  // Hero Section
  hero: {
    badge: string
    title: string
    titleHighlight: string
    titleEnd: string
    description: string
    startJourney: string
    viewTasks: string
  }
  // Stats Section
  stats: {
    activeUsers: string
    tasksCompleted: string
    co2Saved: string
    treesPlanted: string
  }
  // Tasks Section
  tasks: {
    badge: string
    title: string
    description: string
    points: string
    markComplete: string
    completed: string
    easy: string
    medium: string
    hard: string
  }
  // Leaderboard Section
  leaderboard: {
    badge: string
    title: string
    description: string
    rank: string
    user: string
    ecoPoints: string
  }
  // About Section
  about: {
    badge: string
    title: string
    description: string
    feature1Title: string
    feature1Description: string
    feature2Title: string
    feature2Description: string
    feature3Title: string
    feature3Description: string
    feature4Title: string
    feature4Description: string
  }
  // Footer
  footer: {
    tagline: string
    product: string
    tasks: string
    leaderboard: string
    rewards: string
    company: string
    about: string
    careers: string
    contact: string
    support: string
    help: string
    privacy: string
    terms: string
    rights: string
  }
  // Login Page
  login: {
    welcomeBack: string
    subtitle: string
    email: string
    password: string
    forgotPassword: string
    loginButton: string
    noAccount: string
    signUp: string
    terms: string
    and: string
    privacy: string
    emailPlaceholder: string
    passwordPlaceholder: string
  }
  // Register Page
  register: {
    title: string
    subtitle: string
    firstName: string
    lastName: string
    email: string
    password: string
    address: string
    age: string
    status: string
    student: string
    pupil: string
    createAccount: string
    haveAccount: string
    login: string
    terms: string
    and: string
    privacy: string
    firstNamePlaceholder: string
    lastNamePlaceholder: string
    emailPlaceholder: string
    passwordPlaceholder: string
    addressPlaceholder: string
    agePlaceholder: string
    statusPlaceholder: string
  }
  // Mock Tasks
  mockTasks: {
    task1Title: string
    task1Description: string
    task2Title: string
    task2Description: string
    task3Title: string
    task3Description: string
    task4Title: string
    task4Description: string
    task5Title: string
    task5Description: string
    task6Title: string
    task6Description: string
  }
  // Store Section
  store: {
    badge: string
    title: string
    description: string
    yourBalance: string
    coins: string
    allProducts: string
    electronics: string
    home: string
    outdoor: string
    accessories: string
    inStock: string
    outOfStock: string
    discount: string
    off: string
    buyNow: string
    notEnoughCoins: string
    signInToBuy: string
    confirmTitle: string
    confirmBody: string
    confirmBuy: string
    buying: string
    purchased: string
    left: string
    loadError: string
    noProducts: string
  }
  // Shared UI strings
  common: {
    loading: string
    retry: string
    save: string
    saving: string
    cancel: string
    edit: string
    close: string
    signIn: string
    days: string
    kg: string
    of: string
  }
  // Account menu and auth feedback
  account: {
    myProfile: string
    myRewards: string
    logout: string
    loggedOut: string
    welcomeBack: string
    accountCreated: string
    signInRequired: string
    signingIn: string
    creatingAccount: string
  }
  // Task interactions
  taskActions: {
    signInToComplete: string
    completing: string
    completed: string
    undo: string
    undone: string
    earned: string
    loadError: string
    todayProgress: string
    allDone: string
  }
  // Leaderboard filters
  leaderboardFilters: {
    allTime: string
    thisMonth: string
    thisWeek: string
    you: string
    empty: string
    yourRank: string
  }
  // Profile page
  profile: {
    title: string
    subtitle: string
    overview: string
    achievementsTab: string
    ordersTab: string
    personalInfo: string
    editProfile: string
    updated: string
    balance: string
    totalEarned: string
    tasksDone: string
    currentStreak: string
    longestStreak: string
    globalRank: string
    co2Saved: string
    treesEquivalent: string
    todayProgress: string
    recentActivity: string
    noActivity: string
    memberSince: string
  }
  // Achievements
  achievements: {
    title: string
    subtitle: string
    unlocked: string
    locked: string
    unlockedOn: string
    reward: string
    newBadge: string
  }
  // Purchase history
  orders: {
    title: string
    subtitle: string
    empty: string
    emptyAction: string
    totalSpent: string
    purchasedOn: string
    paid: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      tasks: "Tasks",
      leaderboard: "Leaderboard",
      about: "About",
      login: "Login",
      getStarted: "Get Started",
      home: "Home",
    },
    hero: {
      badge: "Join 10,000+ eco-conscious users",
      title: "Build",
      titleHighlight: "Sustainable Habits",
      titleEnd: "Through Play",
      description:
        "Transform your daily routine with eco-friendly challenges. Earn rewards, climb the leaderboard, and make a real impact on our planet.",
      startJourney: "Start Your Journey",
      viewTasks: "View Daily Tasks",
    },
    stats: {
      activeUsers: "Active Users",
      tasksCompleted: "Tasks Completed",
      co2Saved: "CO₂ Saved",
      treesPlanted: "Trees Planted",
    },
    tasks: {
      badge: "Daily Challenges",
      title: "Today's Eco Tasks",
      description: "Complete these daily challenges to earn points and build lasting eco-friendly habits",
      points: "points",
      markComplete: "Mark Complete",
      completed: "Completed",
      easy: "easy",
      medium: "medium",
      hard: "hard",
    },
    leaderboard: {
      badge: "Top Performers",
      title: "Global Leaderboard",
      description: "See how you stack up against eco-warriors worldwide",
      rank: "Rank",
      user: "User",
      ecoPoints: "Eco Points",
    },
    about: {
      badge: "Why Choose EcoHabits",
      title: "Make Every Day Count",
      description:
        "Our gamified approach makes sustainability fun and rewarding. Join thousands of users making a difference.",
      feature1Title: "Daily Challenges",
      feature1Description: "New eco-friendly tasks every day to keep you engaged and motivated",
      feature2Title: "Reward System",
      feature2Description: "Earn points and unlock achievements as you complete tasks",
      feature3Title: "Community",
      feature3Description: "Join a global community of eco-warriors making a real impact",
      feature4Title: "Track Progress",
      feature4Description: "Monitor your environmental impact with detailed analytics",
    },
    footer: {
      tagline: "Making sustainability fun and rewarding",
      product: "Product",
      tasks: "Tasks",
      leaderboard: "Leaderboard",
      rewards: "Rewards",
      company: "Company",
      about: "About",
      careers: "Careers",
      contact: "Contact",
      support: "Support",
      help: "Help Center",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
    login: {
      welcomeBack: "Welcome Back",
      subtitle: "Login to continue your eco journey",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Enter your password",
    },
    register: {
      title: "Start Your Eco Journey",
      subtitle: "Create an account to begin building sustainable habits",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      address: "Address / Region",
      age: "Age",
      status: "Status",
      student: "Student",
      pupil: "Pupil",
      createAccount: "Create Account",
      haveAccount: "Already have an account?",
      login: "Login",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
      firstNamePlaceholder: "Sarah",
      lastNamePlaceholder: "Johnson",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Create a strong password",
      addressPlaceholder: "San Francisco, CA",
      agePlaceholder: "21",
      statusPlaceholder: "Select status",
    },
    mockTasks: {
      task1Title: "Use Reusable Water Bottle",
      task1Description: "Avoid single-use plastic bottles today. Carry your reusable bottle everywhere!",
      task2Title: "Bike or Walk to School/Work",
      task2Description: "Choose active transport instead of driving. Good for you and the planet!",
      task3Title: "Meatless Monday",
      task3Description: "Try a plant-based meal today. Reduce your carbon footprint one meal at a time.",
      task4Title: "Turn Off Unused Electronics",
      task4Description: "Unplug chargers and turn off devices not in use. Save energy and money!",
      task5Title: "Take a 5-Minute Shower",
      task5Description: "Challenge yourself to conserve water. Every drop counts!",
      task6Title: "Start Composting Food Scraps",
      task6Description: "Turn your kitchen waste into nutrient-rich soil. Great for the environment!",
    },
    store: {
      badge: "EcoHabits Store",
      title: "Exchange Your Coins",
      description: "Use your hard-earned eco points to get sustainable products and gadgets",
      yourBalance: "Your Balance",
      coins: "coins",
      allProducts: "All Products",
      electronics: "Electronics",
      home: "Home",
      outdoor: "Outdoor",
      accessories: "Accessories",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      discount: "Discount",
      off: "OFF",
      buyNow: "Buy Now",
      notEnoughCoins: "Not enough coins",
      signInToBuy: "Sign in to buy",
      confirmTitle: "Confirm your purchase",
      confirmBody: "This will deduct {price} coins from your balance.",
      confirmBuy: "Confirm",
      buying: "Processing...",
      purchased: "Purchased {name}!",
      left: "left",
      loadError: "Could not load the store",
      noProducts: "No products in this category yet",
    },
    common: {
      loading: "Loading...",
      retry: "Try again",
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      edit: "Edit",
      close: "Close",
      signIn: "Sign in",
      days: "days",
      kg: "kg",
      of: "of",
    },
    account: {
      myProfile: "My Profile",
      myRewards: "My Rewards",
      logout: "Log out",
      loggedOut: "You have been logged out",
      welcomeBack: "Welcome back, {name}!",
      accountCreated: "Welcome to EcoHabits, {name}!",
      signInRequired: "Please sign in to continue",
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
    },
    taskActions: {
      signInToComplete: "Sign in to complete tasks",
      completing: "Saving...",
      completed: "Completed",
      undo: "Undo",
      undone: "Task unmarked",
      earned: "+{points} eco points earned!",
      loadError: "Could not load today's tasks",
      todayProgress: "{done} of {total} completed today",
      allDone: "All tasks done for today. Amazing work!",
    },
    leaderboardFilters: {
      allTime: "All time",
      thisMonth: "This month",
      thisWeek: "This week",
      you: "You",
      empty: "No activity in this period yet",
      yourRank: "Your rank",
    },
    profile: {
      title: "My Profile",
      subtitle: "Track your impact and manage your account",
      overview: "Overview",
      achievementsTab: "Achievements",
      ordersTab: "My Rewards",
      personalInfo: "Personal Information",
      editProfile: "Edit profile",
      updated: "Profile updated",
      balance: "Coin Balance",
      totalEarned: "Total Earned",
      tasksDone: "Tasks Completed",
      currentStreak: "Current Streak",
      longestStreak: "Longest streak",
      globalRank: "Global Rank",
      co2Saved: "CO₂ Saved",
      treesEquivalent: "≈ {count} trees planted",
      todayProgress: "Today's Progress",
      recentActivity: "Recent Activity",
      noActivity: "No completed tasks yet. Start with today's challenges!",
      memberSince: "Member since",
    },
    achievements: {
      title: "Achievements",
      subtitle: "{unlocked} of {total} badges unlocked",
      unlocked: "Unlocked",
      locked: "Locked",
      unlockedOn: "Unlocked on",
      reward: "+{points} bonus points",
      newBadge: "Achievement unlocked: {title}",
    },
    orders: {
      title: "My Rewards",
      subtitle: "Everything you have redeemed with your eco points",
      empty: "You have not redeemed any rewards yet",
      emptyAction: "Visit the store",
      totalSpent: "Total spent",
      purchasedOn: "Redeemed on",
      paid: "Paid",
    },
  },
  ru: {
    nav: {
      tasks: "Задачи",
      leaderboard: "Рейтинг",
      about: "О нас",
      login: "Войти",
      getStarted: "Начать",
      home: "Главная",
    },
    hero: {
      badge: "Присоединяйтесь к 10 000+ экологически сознательных пользователей",
      title: "Создавайте",
      titleHighlight: "Экологичные Привычки",
      titleEnd: "Через Игру",
      description:
        "Преобразите свою повседневную рутину с эко-вызовами. Зарабатывайте награды, поднимайтесь в рейтинге и делайте реальный вклад в нашу планету.",
      startJourney: "Начать Путешествие",
      viewTasks: "Посмотреть Задачи",
    },
    stats: {
      activeUsers: "Активных Пользователей",
      tasksCompleted: "Задач Выполнено",
      co2Saved: "CO₂ Сохранено",
      treesPlanted: "Деревьев Посажено",
    },
    tasks: {
      badge: "Ежедневные Вызовы",
      title: "Сегодняшние Эко-Задачи",
      description: "Выполняйте эти ежедневные вызовы, чтобы заработать очки и выработать экологичные привычки",
      points: "очков",
      markComplete: "Отметить Выполненным",
      completed: "Выполнено",
      easy: "легко",
      medium: "средне",
      hard: "сложно",
    },
    leaderboard: {
      badge: "Лучшие Участники",
      title: "Глобальный Рейтинг",
      description: "Посмотрите, как вы соревнуетесь с эко-воинами по всему миру",
      rank: "Место",
      user: "Пользователь",
      ecoPoints: "Эко Очки",
    },
    about: {
      badge: "Почему EcoHabits",
      title: "Делайте Каждый День Значимым",
      description:
        "Наш игровой подход делает экологичность веселой и вознаграждаемой. Присоединяйтесь к тысячам пользователей, делающих разницу.",
      feature1Title: "Ежедневные Вызовы",
      feature1Description: "Новые эко-задачи каждый день, чтобы вы оставались вовлечёнными и мотивированными",
      feature2Title: "Система Наград",
      feature2Description: "Зарабатывайте очки и открывайте достижения по мере выполнения задач",
      feature3Title: "Сообщество",
      feature3Description: "Присоединяйтесь к глобальному сообществу эко-воинов, делающих реальный вклад",
      feature4Title: "Отслеживание Прогресса",
      feature4Description: "Следите за своим экологическим вкладом с детальной аналитикой",
    },
    footer: {
      tagline: "Делаем экологичность веселой и вознаграждаемой",
      product: "Продукт",
      tasks: "Задачи",
      leaderboard: "Рейтинг",
      rewards: "Награды",
      company: "Компания",
      about: "О нас",
      careers: "Карьера",
      contact: "Контакты",
      support: "Поддержка",
      help: "Центр Помощи",
      privacy: "Политика Конфиденциальности",
      terms: "Условия Использования",
      rights: "Все права защищены.",
    },
    login: {
      welcomeBack: "С Возвращением",
      subtitle: "Войдите, чтобы продолжить ваше эко-путешествие",
      email: "Электронная Почта",
      password: "Пароль",
      forgotPassword: "Забыли пароль?",
      loginButton: "Войти",
      noAccount: "Нет аккаунта?",
      signUp: "Зарегистрироваться",
      terms: "Условия Использования",
      and: "и",
      privacy: "Политика Конфиденциальности",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Введите ваш пароль",
    },
    register: {
      title: "Начните Ваше Эко-Путешествие",
      subtitle: "Создайте аккаунт, чтобы начать формировать экологичные привычки",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная Почта",
      password: "Пароль",
      address: "Адрес / Регион",
      age: "Возраст",
      status: "Статус",
      student: "Студент",
      pupil: "Ученик",
      createAccount: "Создать Аккаунт",
      haveAccount: "Уже есть аккаунт?",
      login: "Войти",
      terms: "Условия Использования",
      and: "и",
      privacy: "Политика Конфиденциальности",
      firstNamePlaceholder: "Сара",
      lastNamePlaceholder: "Джонсон",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Создайте надежный пароль",
      addressPlaceholder: "Сан-Франциско, Калифорния",
      agePlaceholder: "21",
      statusPlaceholder: "Выберите статус",
    },
    mockTasks: {
      task1Title: "Используйте Многоразовую Бутылку",
      task1Description: "Избегайте одноразовых пластиковых бутылок сегодня. Носите с собой многоразовую бутылку везде!",
      task2Title: "Езжайте На Велосипеде или Идите Пешком",
      task2Description: "Выберите активный транспорт вместо вождения. Полезно для вас и планеты!",
      task3Title: "Понедельник Без Мяса",
      task3Description: "Попробуйте растительную еду сегодня. Уменьшайте свой углеродный след по одному приёму пищи.",
      task4Title: "Выключайте Неиспользуемую Электронику",
      task4Description:
        "Отключайте зарядные устройства и выключайте неиспользуемые устройства. Экономьте энергию и деньги!",
      task5Title: "Примите 5-Минутный Душ",
      task5Description: "Бросьте себе вызов экономить воду. Каждая капля важна!",
      task6Title: "Начните Компостировать Пищевые Отходы",
      task6Description: "Превратите кухонные отходы в питательную почву. Отлично для окружающей среды!",
    },
    store: {
      badge: "Магазин EcoHabits",
      title: "Обменяйте Свои Монеты",
      description: "Используйте заработанные эко-очки для получения экологичных продуктов и гаджетов",
      yourBalance: "Ваш Баланс",
      coins: "монет",
      allProducts: "Все Продукты",
      electronics: "Электроника",
      home: "Дом",
      outdoor: "Улица",
      accessories: "Аксессуары",
      inStock: "В Наличии",
      outOfStock: "Нет в Наличии",
      discount: "Скидка",
      off: "СКИДКА",
      buyNow: "Купить Сейчас",
      notEnoughCoins: "Недостаточно монет",
      signInToBuy: "Войдите, чтобы купить",
      confirmTitle: "Подтвердите покупку",
      confirmBody: "С вашего баланса будет списано {price} монет.",
      confirmBuy: "Подтвердить",
      buying: "Обработка...",
      purchased: "Куплено: {name}!",
      left: "осталось",
      loadError: "Не удалось загрузить магазин",
      noProducts: "В этой категории пока нет товаров",
    },
    common: {
      loading: "Загрузка...",
      retry: "Попробовать снова",
      save: "Сохранить",
      saving: "Сохранение...",
      cancel: "Отмена",
      edit: "Изменить",
      close: "Закрыть",
      signIn: "Войти",
      days: "дней",
      kg: "кг",
      of: "из",
    },
    account: {
      myProfile: "Мой Профиль",
      myRewards: "Мои Награды",
      logout: "Выйти",
      loggedOut: "Вы вышли из аккаунта",
      welcomeBack: "С возвращением, {name}!",
      accountCreated: "Добро пожаловать в EcoHabits, {name}!",
      signInRequired: "Пожалуйста, войдите, чтобы продолжить",
      signingIn: "Вход...",
      creatingAccount: "Создание аккаунта...",
    },
    taskActions: {
      signInToComplete: "Войдите, чтобы выполнять задачи",
      completing: "Сохранение...",
      completed: "Выполнено",
      undo: "Отменить",
      undone: "Отметка снята",
      earned: "+{points} эко-очков получено!",
      loadError: "Не удалось загрузить задачи",
      todayProgress: "{done} из {total} выполнено сегодня",
      allDone: "Все задачи на сегодня выполнены. Отличная работа!",
    },
    leaderboardFilters: {
      allTime: "За всё время",
      thisMonth: "За месяц",
      thisWeek: "За неделю",
      you: "Вы",
      empty: "За этот период пока нет активности",
      yourRank: "Ваше место",
    },
    profile: {
      title: "Мой Профиль",
      subtitle: "Отслеживайте свой вклад и управляйте аккаунтом",
      overview: "Обзор",
      achievementsTab: "Достижения",
      ordersTab: "Мои Награды",
      personalInfo: "Личная Информация",
      editProfile: "Редактировать профиль",
      updated: "Профиль обновлён",
      balance: "Баланс Монет",
      totalEarned: "Всего Заработано",
      tasksDone: "Задач Выполнено",
      currentStreak: "Текущая Серия",
      longestStreak: "Лучшая серия",
      globalRank: "Место в Рейтинге",
      co2Saved: "CO₂ Сохранено",
      treesEquivalent: "≈ {count} деревьев посажено",
      todayProgress: "Прогресс за Сегодня",
      recentActivity: "Последняя Активность",
      noActivity: "Пока нет выполненных задач. Начните с сегодняшних!",
      memberSince: "С нами с",
    },
    achievements: {
      title: "Достижения",
      subtitle: "Открыто {unlocked} из {total} значков",
      unlocked: "Открыто",
      locked: "Закрыто",
      unlockedOn: "Открыто",
      reward: "+{points} бонусных очков",
      newBadge: "Достижение открыто: {title}",
    },
    orders: {
      title: "Мои Награды",
      subtitle: "Всё, что вы обменяли на эко-очки",
      empty: "Вы ещё не обменяли ни одной награды",
      emptyAction: "Перейти в магазин",
      totalSpent: "Всего потрачено",
      purchasedOn: "Обменяно",
      paid: "Оплачено",
    },
  },
  uz: {
    nav: {
      tasks: "Vazifalar",
      leaderboard: "Reyting",
      about: "Biz haqimizda",
      login: "Kirish",
      getStarted: "Boshlash",
      home: "Bosh sahifa",
    },
    hero: {
      badge: "10 000+ ekologik ongli foydalanuvchilarga qo'shiling",
      title: "Yarating",
      titleHighlight: "Barqaror Odatlar",
      titleEnd: "O'yin Orqali",
      description:
        "Kundalik tartibingizni ekologik toza muammolar bilan o'zgartiring. Mukofotlar qo'lga kiriting, reytingda ko'tariling va sayyoramizga haqiqiy hissa qo'shing.",
      startJourney: "Sayohatingizni Boshlang",
      viewTasks: "Kunlik Vazifalarni Ko'ring",
    },
    stats: {
      activeUsers: "Faol Foydalanuvchilar",
      tasksCompleted: "Bajarilgan Vazifalar",
      co2Saved: "CO₂ Tejaldi",
      treesPlanted: "Daraxtlar O'tqizildi",
    },
    tasks: {
      badge: "Kunlik Muammolar",
      title: "Bugungi Eko-Vazifalar",
      description: "Bu kunlik muammolarni bajaring, ball to'plang va barqaror ekologik odatlarni shakllantiring",
      points: "ball",
      markComplete: "Bajarildi Deb Belgilash",
      completed: "Bajarildi",
      easy: "oson",
      medium: "o'rta",
      hard: "qiyin",
    },
    leaderboard: {
      badge: "Eng Yaxshi Ishtirokchilar",
      title: "Global Reyting",
      description: "Butun dunyo bo'ylab eko-jangchilar bilan qanday raqobatlashayotganingizni ko'ring",
      rank: "O'rin",
      user: "Foydalanuvchi",
      ecoPoints: "Eko Ballar",
    },
    about: {
      badge: "Nega EcoHabits",
      title: "Har Bir Kunni Muhim Qiling",
      description:
        "Bizning o'yinlashtirish yondashuvimiz ekologiklikni qiziqarli va foydali qiladi. Farq yaratayotgan minglab foydalanuvchilarga qo'shiling.",
      feature1Title: "Kunlik Muammolar",
      feature1Description: "Sizni faol va motivatsiyali saqlash uchun har kuni yangi ekologik vazifalar",
      feature2Title: "Mukofotlar Tizimi",
      feature2Description: "Vazifalarni bajarish jarayonida ball to'plang va yutuqlarga erishing",
      feature3Title: "Hamjamiyat",
      feature3Description: "Haqiqiy hissa qo'shayotgan eko-jangchilarning global hamjamiyatiga qo'shiling",
      feature4Title: "Rivojlanishni Kuzatish",
      feature4Description: "Ekologik ta'siringizni batafsil tahlil bilan kuzatib boring",
    },
    footer: {
      tagline: "Ekologiklikni qiziqarli va foydali qilish",
      product: "Mahsulot",
      tasks: "Vazifalar",
      leaderboard: "Reyting",
      rewards: "Mukofotlar",
      company: "Kompaniya",
      about: "Biz haqimizda",
      careers: "Karyera",
      contact: "Aloqa",
      support: "Qo'llab-quvvatlash",
      help: "Yordam Markazi",
      privacy: "Maxfiylik Siyosati",
      terms: "Foydalanish Shartlari",
      rights: "Barcha huquqlar himoyalangan.",
    },
    login: {
      welcomeBack: "Xush Kelibsiz",
      subtitle: "Eko sayohatingizni davom ettirish uchun kiring",
      email: "Elektron Pochta",
      password: "Parol",
      forgotPassword: "Parolni unutdingizmi?",
      loginButton: "Kirish",
      noAccount: "Hisobingiz yoqmi?",
      signUp: "Ro'yxatdan o'tish",
      terms: "Foydalanish Shartlari",
      and: "va",
      privacy: "Maxfiylik Siyosati",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Parolingizni kiriting",
    },
    register: {
      title: "Eko Sayohatingizni Boshlang",
      subtitle: "Barqaror odatlarni shakllantirishni boshlash uchun hisob yarating",
      firstName: "Ism",
      lastName: "Familiya",
      email: "Elektron Pochta",
      password: "Parol",
      address: "Manzil / Hudud",
      age: "Yosh",
      status: "Holat",
      student: "Talaba",
      pupil: "O'quvchi",
      createAccount: "Hisob Yaratish",
      haveAccount: "Allaqachon hisobingiz bormi?",
      login: "Kirish",
      terms: "Foydalanish Shartlari",
      and: "va",
      privacy: "Maxfiylik Siyosati",
      firstNamePlaceholder: "Sara",
      lastNamePlaceholder: "Jonson",
      emailPlaceholder: "sarah@example.com",
      passwordPlaceholder: "Kuchli parol yarating",
      addressPlaceholder: "San-Fransisko, Kaliforniya",
      agePlaceholder: "21",
      statusPlaceholder: "Holatni tanlang",
    },
    mockTasks: {
      task1Title: "Qayta Ishlatilishi Mumkin Bo'lgan Suv Idishdan Foydalaning",
      task1Description:
        "Bugun bir martalik plastik idishlardan qoching. Qayta ishlatilishi mumkin bo'lgan idishingizni hamma joyda olib yuring!",
      task2Title: "Velosipedda Yuring yoki Piyoda Yuring",
      task2Description: "Mashina haydash o'rniga faol transportni tanlang. Siz va sayyora uchun foydali!",
      task3Title: "Dushanbada Gosht Yemang",
      task3Description: "Bugun o'simlik asosidagi taomni sinab ko'ring. Uglerod izingizni bir taom bilan kamaytiring.",
      task4Title: "Foydalanilmayotgan Elektronikani O'chiring",
      task4Description:
        "Zaryadlovchilarni uzib qo'ying va foydalanilmayotgan qurilmalarni o'chiring. Energiya va pul tejang!",
      task5Title: "5 Daqiqalik Dush Qabul Qiling",
      task5Description: "O'zingizga suvni tejashda qiyinchilik yarating. Har bir tomchi muhim!",
      task6Title: "Oziq-ovqat Chiqindilarini Kompostlashni Boshlang",
      task6Description: "Oshxona chiqindilarini ozuqaviy tuproqqa aylantiring. Atrof-muhit uchun ajoyib!",
    },
    store: {
      badge: "EcoHabits Do'koni",
      title: "Tangalaringizni Almashtirang",
      description: "Qiyin mehnatga to'plagan eko-ballaringizni barqaror mahsulotlar va gadjetlarga sarflang",
      yourBalance: "Balansingiz",
      coins: "tanga",
      allProducts: "Barcha Mahsulotlar",
      electronics: "Elektronika",
      home: "Uy",
      outdoor: "Ochiq Havo",
      accessories: "Aksessuarlar",
      inStock: "Mavjud",
      outOfStock: "Mavjud Emas",
      discount: "Chegirma",
      off: "CHEGIRMA",
      buyNow: "Hozir Sotib Oling",
      notEnoughCoins: "Tangalar yetarli emas",
      signInToBuy: "Sotib olish uchun kiring",
      confirmTitle: "Xaridni tasdiqlang",
      confirmBody: "Balansingizdan {price} tanga yechib olinadi.",
      confirmBuy: "Tasdiqlash",
      buying: "Amalga oshirilmoqda...",
      purchased: "{name} sotib olindi!",
      left: "qoldi",
      loadError: "Do'konni yuklab bo'lmadi",
      noProducts: "Bu turkumda hozircha mahsulot yo'q",
    },
    common: {
      loading: "Yuklanmoqda...",
      retry: "Qayta urinish",
      save: "Saqlash",
      saving: "Saqlanmoqda...",
      cancel: "Bekor qilish",
      edit: "Tahrirlash",
      close: "Yopish",
      signIn: "Kirish",
      days: "kun",
      kg: "kg",
      of: "dan",
    },
    account: {
      myProfile: "Mening Profilim",
      myRewards: "Mening Mukofotlarim",
      logout: "Chiqish",
      loggedOut: "Siz hisobdan chiqdingiz",
      welcomeBack: "Xush kelibsiz, {name}!",
      accountCreated: "EcoHabits'ga xush kelibsiz, {name}!",
      signInRequired: "Davom etish uchun tizimga kiring",
      signingIn: "Kirilmoqda...",
      creatingAccount: "Hisob yaratilmoqda...",
    },
    taskActions: {
      signInToComplete: "Vazifalarni bajarish uchun kiring",
      completing: "Saqlanmoqda...",
      completed: "Bajarildi",
      undo: "Bekor qilish",
      undone: "Belgi olib tashlandi",
      earned: "+{points} eko-ball qo'lga kiritildi!",
      loadError: "Vazifalarni yuklab bo'lmadi",
      todayProgress: "Bugun {total} tadan {done} tasi bajarildi",
      allDone: "Bugungi barcha vazifalar bajarildi. Ajoyib ish!",
    },
    leaderboardFilters: {
      allTime: "Butun davr",
      thisMonth: "Shu oy",
      thisWeek: "Shu hafta",
      you: "Siz",
      empty: "Bu davrda hali faollik yo'q",
      yourRank: "Sizning o'rningiz",
    },
    profile: {
      title: "Mening Profilim",
      subtitle: "Ta'siringizni kuzating va hisobingizni boshqaring",
      overview: "Umumiy",
      achievementsTab: "Yutuqlar",
      ordersTab: "Mening Mukofotlarim",
      personalInfo: "Shaxsiy Ma'lumotlar",
      editProfile: "Profilni tahrirlash",
      updated: "Profil yangilandi",
      balance: "Tanga Balansi",
      totalEarned: "Jami Ishlangan",
      tasksDone: "Bajarilgan Vazifalar",
      currentStreak: "Joriy Seriya",
      longestStreak: "Eng uzun seriya",
      globalRank: "Global O'rin",
      co2Saved: "CO₂ Tejaldi",
      treesEquivalent: "≈ {count} ta daraxt o'tqizildi",
      todayProgress: "Bugungi Natija",
      recentActivity: "So'nggi Faollik",
      noActivity: "Hali bajarilgan vazifa yo'q. Bugungilardan boshlang!",
      memberSince: "Ro'yxatdan o'tgan",
    },
    achievements: {
      title: "Yutuqlar",
      subtitle: "{total} tadan {unlocked} ta nishon ochildi",
      unlocked: "Ochilgan",
      locked: "Yopiq",
      unlockedOn: "Ochilgan sana",
      reward: "+{points} bonus ball",
      newBadge: "Yutuq ochildi: {title}",
    },
    orders: {
      title: "Mening Mukofotlarim",
      subtitle: "Eko-ballaringizga almashtirgan barcha narsalar",
      empty: "Siz hali hech qanday mukofot almashtirmadingiz",
      emptyAction: "Do'konga o'tish",
      totalSpent: "Jami sarflangan",
      purchasedOn: "Almashtirilgan",
      paid: "To'langan",
    },
  },
}
