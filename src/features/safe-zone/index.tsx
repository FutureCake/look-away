import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import TitledContent from "../../components/titled-content";

export default function SafeZone() {

    const nav = useNavigation();

    return (
        <TitledContent title={"eye\nsafe\nzone"} onGoBack={nav.goBack}>
            <Button title="Add eye safe zone" onPress={() => nav.navigate('TimeSpan')} />
            <Text style={styles.description}>{"Add a moment in time where your are away from screens to prevent us from spamming you unnecessarily.\n\nFor example while sleeping :)"}</Text>
            <View></View>
        </TitledContent>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        fontFamily: 'americanTypewriter',
    }
}); 