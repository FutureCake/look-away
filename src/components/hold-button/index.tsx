import { useState } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export interface HoldButtonProps {
    title: string;
    duration: number;
    onComplete?: () => void;
    onPressStart?: () => void;
    onPressUp?: () => void;
    titleStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
}

export default function HoldButton({ title, duration, onComplete, onPressStart, onPressUp, titleStyle, buttonStyle }: HoldButtonProps) {

    const progress = useSharedValue(0);
    const [buttonWidth, setButtonWidth] = useState(0);

    const longPress = Gesture.LongPress()
        .minDuration(duration)
        .onBegin(() => {
            if (onPressStart) scheduleOnRN(onPressStart);
            progress.value = withTiming(1, { duration });
        })
        .onFinalize((_, success) => {
            if (success && onComplete) {
                scheduleOnRN(onComplete);
            } else if (onPressUp) {
                scheduleOnRN(onPressUp);
            }
            progress.value = withTiming(0, { duration: 50 });
        });

    const fillStyle = useAnimatedStyle(() => ({
        width: progress.value * buttonWidth,
    }));

    return (
        <View style={styles.container}>
            <GestureDetector gesture={longPress}>
                <Animated.View style={[styles.button, buttonStyle]} onLayout={(e) => setButtonWidth(e.nativeEvent.layout.width)}>
                    <Animated.View style={[styles.fill, fillStyle]} />
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                </Animated.View>
            </GestureDetector>
            <View style={styles.stack} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
    title: {
        fontFamily: 'americanTypewriter',
        fontSize: 22,
        zIndex: 1,
    },
    button: {
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 24,
        zIndex: 1,
        overflow: 'hidden',
    },
    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#1500FF',
    },
    stack: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: -4,
        bottom: -4,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
});
