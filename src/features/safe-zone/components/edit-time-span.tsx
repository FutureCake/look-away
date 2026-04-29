import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { renderHM } from "../logic";

export interface EditTimeSpanProps {
    startTime: number;
    endTime: number;
    use24H: boolean;
    onSave?: (value: { startTime: number, endTime: number }) => void;
    onCancel?: () => void;
}

export default function EditTimeSpan({ startTime, endTime, use24H, onSave, onCancel }: EditTimeSpanProps) {
    return (
        <View style={styles.container}>
            <View style={styles.actionsContainer}>
                <TextInput autoFocus style={styles.value} value={renderHM(startTime, use24H)} />
                <Text style={styles.value}>-</Text>
                <TextInput style={styles.value} value={renderHM(endTime, use24H)} />
            </View>
            <View style={styles.actionsContainer}>
                <Pressable style={styles.actionButton} onPress={() => onSave?.({ startTime, endTime })}><Text>Save</Text></Pressable>
                <Pressable style={styles.actionButton} onPress={onCancel}><Text>Cancel</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    value: {
        fontFamily: 'americanTypewriter',
        fontSize: 24,
        color: '#1500FF',
    },
    actionButton: {

    }
});