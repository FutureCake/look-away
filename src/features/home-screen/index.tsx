import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import TitledContent from "../../components/titled-content";
import { useEyeMachine } from "../../shared/contexts/eye-context";
import { notifications } from "../../shared/libs/notifications";

export default function HomeScreen() {

    const nav = useNavigation();
    const { cta, state, stateMsg, userAction, send } = useEyeMachine();

    const handleMainButtonPress = () => {
        if (!userAction) return;
        send({ type: userAction });
    }

    useEffect(() => {
        const checkPermissions = async () => {
            const status = await notifications.hasPermissions();
            if (status === 'granted') send({ type: 'NC_ALLOWED' });
            if (status === 'denied') send({ type: 'NC_DENIED' });
        };
        checkPermissions();
    }, []);

    return (
        <TitledContent title={"love\nyour\neyes"} scrollPadding={80}>
            <View style={styles.primaryActionGroup}>
                <Button title={cta} onPress={handleMainButtonPress} />
                {stateMsg && <Text style={styles.stateMsg}>{stateMsg}</Text>}
            </View>
            <Text style={styles.description}>{"Your eyes need to look at something distant every 20 minutes for 20 seconds to stay healthy.\n\nWe will send you a notification every 20 minutes to remind you to look into the distance for 20 seconds.\n\nDon't want to get spammed all the time? Set a safe zone below:"}</Text>
            <Button title="Set eye safe zone" onPress={() => nav.navigate('SafeZone')} />
            <Text style={styles.description}>{"Want to learn more about how to keep your eyes healthy?\n\nClick below to read more."}</Text>
            <Button title="Let me tell ya" onPress={() => nav.navigate('EyeHealth')} />
        </TitledContent>
    );
}

const styles = StyleSheet.create({
    primaryActionGroup: {
        gap: 15,
    },
    stateMsg: {
        fontSize: 18,
        fontFamily: 'americanTypewriter',
        color: '#1500FF',
        borderLeftWidth: 2,
        borderColor: '#1500FF',
        paddingHorizontal: 15
    },
    description: {
        fontSize: 18,
        fontFamily: 'americanTypewriter',
    }
});
