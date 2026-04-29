import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

export interface SpacedScrollProps extends PropsWithChildren {
    spacing: number;
    allowScroll?: boolean;
    scrollPadding?: number;
    style?: StyleProp<ViewStyle>;
    inset?: Edges;
}

export default function SpacedScroll(props: SpacedScrollProps) {

    const {
        children,
        style,
        spacing,
        scrollPadding = 0,
        allowScroll = true,
        inset = ['top']
    } = props;

    return (

        <KeyboardAwareScrollView
            style={[styles.container, style]}
            scrollEnabled={allowScroll}
            showsVerticalScrollIndicator={false}
            bottomOffset={50}
        >
            <SafeAreaView edges={inset} style={{ gap: spacing, paddingBottom: scrollPadding }}>
                {children}
            </SafeAreaView>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
});