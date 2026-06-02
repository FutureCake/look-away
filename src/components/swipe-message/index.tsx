import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const CLOSE_BUTTON_WIDTH = 40;
const SWIPE_REVEAL_THRESHOLD = CLOSE_BUTTON_WIDTH;

export interface SwipeMessageProps {
    message: string;
    onClose: () => void;
    style?: ViewStyle;
}

export default function SwipeMessage({ message, onClose, style }: SwipeMessageProps) {

    const [measured, setMeasured] = useState(false);
    const translateX = useSharedValue(0);
    const height = useSharedValue(0);
    const isRevealed = useSharedValue(false);

    const measuredHeight = useSharedValue(0);
    const marginTop = useSharedValue(0);
    const marginBottom = useSharedValue(0);

    const dismiss = () => {
        "worklet";

        height.value = withTiming(0, { duration: 250 });
        marginTop.value = withDelay(150, withTiming(0, { duration: 250 }));
        marginBottom.value = withDelay(150, withTiming(0, { duration: 250 }, () => {
            scheduleOnRN(onClose);
        }));

    };

    const pan = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onStart(() => {
            isRevealed.value = translateX.value > 0;
        })
        .onUpdate((e) => {
            const base = isRevealed.value ? CLOSE_BUTTON_WIDTH : 0;
            const next = base + e.translationX;
            translateX.value = Math.max(0, next);
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_REVEAL_THRESHOLD) {
                translateX.value = withSpring(CLOSE_BUTTON_WIDTH, { damping: 50, stiffness: 200 });
                isRevealed.value = true;
            } else {
                translateX.value = withSpring(0, { damping: 50, stiffness: 200 });
                isRevealed.value = false;
            }
        });

    const handleClose = () => {
        dismiss();
    };

    const containerStyle = useAnimatedStyle(() => ({
        height: height.value,
        marginTop: marginTop.value,
        marginBottom: marginBottom.value,
        overflow: "hidden",
    }));

    const contentStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const closeButtonStyle = useAnimatedStyle(() => ({
        width: Math.max(CLOSE_BUTTON_WIDTH, translateX.value),
    }));

    if (!measured) {
        return (
            <View
                style={[styles.container, style, { position: 'absolute', opacity: 0 }]}
                onLayout={(e) => {
                    measuredHeight.value = e.nativeEvent.layout.height;
                    height.value = 0;
                    marginTop.value = 0;
                    marginBottom.value = 0;
                    setMeasured(true);
                    height.value = withTiming(e.nativeEvent.layout.height, { duration: 500 });
                    if (style?.marginTop !== undefined) {
                        marginTop.value = withTiming(Number(style.marginTop), { duration: 500 });
                    }
                    if (style?.marginBottom !== undefined) {
                        marginBottom.value = withTiming(Number(style.marginBottom), { duration: 500 });
                    }
                }}
            >
                <View style={styles.content}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        );
    }

    return (
        <Animated.View
            style={[styles.container, style, containerStyle]}
        >
            <View style={styles.fillStyle} />

            <Animated.View style={[styles.closeButton, closeButtonStyle]}>
                <Pressable onPress={handleClose} style={styles.closeButtonPressable}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
            </Animated.View>

            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.content, contentStyle]}>
                    <Text style={styles.message}>{message}</Text>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 2,
        borderColor: "#1500FF",
        position: "relative",
    },
    fillStyle: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#1500FF",
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        backgroundColor: "#fff",
    },
    message: {
        fontSize: 18,
        fontFamily: "americanTypewriter",
        color: "#1500FF",
    },
    closeButton: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: CLOSE_BUTTON_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1500FF",
    },
    closeButtonPressable: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});
