import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

export interface SpacedScrollProps extends PropsWithChildren {
    spacing: number;
    allowScroll?: boolean;
    style?: StyleProp<ViewStyle>;
    inset?: Edges;
}

export default function SpacedScroll(props: SpacedScrollProps) {

    const {
        children,
        style,
        spacing,
        allowScroll = true,
        inset = ['top']
    } = props;

    return (

        <ScrollView
            style={[styles.container, style]}
            scrollEnabled={allowScroll}
        >
            <SafeAreaView edges={inset} style={{ gap: spacing }}>
                {children}
            </SafeAreaView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
});