import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import Button from "../../components/button";
import TitledContent from "../../components/titled-content";
import useEyeHelper from "./hooks/eye-helper";

export default function HomeScreen() {

    const nav = useNavigation();
    const { eyeState, pause, help } = useEyeHelper();

    return (
        <TitledContent title={"love\nyour\neyes"}>
            <Button title="Help them now" onPress={help} />
            <Text style={styles.description}>{"Your eyes need to look at something distant every 20 minutes for 20 seconds to stay healthy.\n\nWe will send you a notification every 20 minutes to remind you to look into the distance for 20 seconds.\n\nRead more on how to help your eyes"}</Text>
            <Button title="Set eye safe zone" onPress={() => nav.navigate('SafeZone')} />
        </TitledContent>
    );
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        fontFamily: 'americanTypewriter',
    }
});
