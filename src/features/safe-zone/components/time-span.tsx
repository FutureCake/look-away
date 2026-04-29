import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { renderHM } from "../logic";

export interface TimeSpanProps extends PressableProps {
    startTime: number;
    endTime: number;
    use24H: boolean;
}

export default function TimeSpan({
    startTime,
    endTime,
    use24H,
    ...pressable
}: TimeSpanProps) {

    return (
        <Pressable {...pressable}>
            <Text
                style={styles.timeSpan}
            >
                {renderHM(startTime, use24H)} - {renderHM(endTime, use24H)}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    timeSpan: {
        fontSize: 26,
        fontFamily: 'americanTypewriter',
        color: '#1500FF',
    }
});