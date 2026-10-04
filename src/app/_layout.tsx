// src/app/_layout.tsx
import { Cinzel_700Bold } from '@expo-google-fonts/cinzel/700Bold';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_500Medium } from '@expo-google-fonts/poppins/500Medium';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { useFonts } from 'expo-font';
import { DarkTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { Colors } from '@/constants/colors';

// Mantém a splash na tela até as fontes carregarem
SplashScreen.preventAutoHideAsync();

const tema = {
    ...DarkTheme,
    colors: { ...DarkTheme.colors, background: Colors.fundo },
};

export default function RootLayout() {
    const [fontesCarregadas, erroNasFontes] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Montserrat_600SemiBold,
        Cinzel_700Bold,
    });
    const pronto = fontesCarregadas || erroNasFontes !== null;

    useEffect(() => {
        if (pronto) SplashScreen.hideAsync();
    }, [pronto]);

    if (!pronto) return null;

    return (
        <ThemeProvider value={tema}>
            <StatusBar style="light" />
            <Slot />
        </ThemeProvider>
    );
}
