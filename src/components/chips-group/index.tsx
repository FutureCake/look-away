import { StyleSheet, View } from "react-native";
import Chip from "../chip";

export interface ChipsGroupProps<T> {
    options: { title: string, value: T }[];
    selected?: T[];
    onSelect?: (value?: T) => void;
}

export default function ChipsGroup<T>(props: ChipsGroupProps<T>) {

    const { options, selected = [], onSelect } = props;

    return (
        <View style={styles.container}>
            {options.map((option, index) => {
                const isSelected = selected?.includes(option.value);
                return (
                    <Chip
                        key={index}
                        value={option.value}
                        selected={isSelected}
                        onSelect={onSelect}
                        title={option.title}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 18,
    }
})