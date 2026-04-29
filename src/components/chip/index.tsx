import { StyleSheet } from "react-native";
import Button, { ButtonProps } from "../button";

export interface ChipProps<T> extends Omit<ButtonProps, 'onPress'> {
    selected?: boolean;
    value?: T;
    onSelect?: (value?: T) => void;
}

export default function Chip<T>(props: ChipProps<T>) {

    const { selected, value, onSelect, ...buttonProps } = props;

    return (
        <Button
            {...buttonProps}
            onPress={() => onSelect?.(value)}
            titleStyle={selected && styles.title}
            buttonStyle={selected && styles.button}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
    },
    title: {
        color: '#fff',
    }
});