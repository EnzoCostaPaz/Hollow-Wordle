import { Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/colors';

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: { backgroundColor: Colors.fundo },
            }}
        />
    );
}
