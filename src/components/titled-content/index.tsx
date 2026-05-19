import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import SpacedScroll from "../spaced-scroll";

export interface TitledContentProps extends PropsWithChildren {
    title: string;
    scrollPadding?: number;
    spacing?: number;
    onGoBack?: () => void;
}

export default function TitledContent(props: TitledContentProps) {

    const { children, title, scrollPadding, spacing = 50, onGoBack } = props;

    return (
        <>
            <SpacedScroll spacing={spacing} scrollPadding={onGoBack ? 150 : scrollPadding} style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {children}
            </SpacedScroll>
            {
                onGoBack &&
                <Pressable onPress={onGoBack} style={styles.backButton}>
                    <Text
                        style={styles.backButtonText}
                    >
                        {"<"}
                    </Text>
                </Pressable>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 64,
        fontFamily: 'ewert',
        color: '#1500FF',
    },
    backButton: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 100,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 16,
    },
    backButtonText: {
        marginTop: -13,
        marginLeft: -2,
        fontSize: 64,
        fontFamily: 'ewert',
        color: '#1500FF',
    }
}); 