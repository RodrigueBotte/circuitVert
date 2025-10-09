// Chargement des fonts
  const [fontsLoaded, fontError] = useFonts({
    HappyMonkey: require("../assets/font/HappyMonkey-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Cache le splash screen quand les fonts sont chargées
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Attend que les fonts soient chargées
  if (!fontsLoaded && !fontError) {
    return null;
  }