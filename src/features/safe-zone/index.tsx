import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import ChipsGroup from "../../components/chips-group";
import TitledContent from "../../components/titled-content";
import { useAppStore } from "../../shared/stores/app";
import EditTimeSpan from "./components/edit-time-span";
import TimeSpan from "./components/time-span";

export default function SafeZone() {

    const nav = useNavigation();
    const { eyeSafeZones, use24h, set24h } = useAppStore();
    const [editingIndex, setEditingIndex] = useState<number>();

    return (
        <TitledContent title={"eye\nsafe\nzone"} onGoBack={nav.goBack}>
            <Button title="Add eye safe zone" onPress={() => { }} />
            <Text style={styles.description}>{"Add a moment in time where your are away from screens to prevent us from spamming you unnecessarily.\n\nFor example while sleeping :)"}</Text>
            {eyeSafeZones.length > 0 && (
                <>
                    <ChipsGroup
                        options={[
                            { title: '24 H', value: true },
                            { title: '12 H', value: false }
                        ]}
                        selected={[use24h]}
                        onSelect={(value) => set24h(value ?? false)}
                    />
                    <View style={{ gap: 20 }}>
                        {eyeSafeZones.map((zone, index) => {
                            if (index === editingIndex) return <EditTimeSpan
                                key={index}
                                startTime={zone.start}
                                endTime={zone.end}
                                use24H={use24h}
                                onCancel={() => setEditingIndex(undefined)}
                                onSave={(timeSpan) => { setEditingIndex(undefined) }}
                            />
                            return <TimeSpan
                                key={index}
                                startTime={zone.start}
                                endTime={zone.end}
                                use24H={use24h}
                                onPress={() => setEditingIndex(index)}
                            />
                        })}
                    </View>
                </>
            )}
        </TitledContent>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        fontFamily: 'americanTypewriter',
    },
    clockTypes: {
        flexDirection: 'row',
        gap: 20,
    },
    timeSpan: {
        fontSize: 26,
        fontFamily: 'americanTypewriter',
        color: '#1500FF',
    }
}); 