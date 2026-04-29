import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

export interface ButtonProps extends PressableProps {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
}

export default function Button(props: ButtonProps) {

    const { title, titleStyle, buttonStyle, ...pressable } = props;

    return (
        <View style={styles.container}>
            <Pressable style={[styles.button, buttonStyle]} {...pressable}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            </Pressable>
            <View style={styles.stack}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'americanTypewriter',
        fontSize: 16,
    },
    container: {
        alignSelf: 'flex-start',
    },
    button: {
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 24,
        zIndex: 1,
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
    }
});