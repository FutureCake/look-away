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
    const { eyeSafeZones, use24h, set24h, addEyeSafeZone, updateEyeSafeZone, removeEyeSafeZone } = useAppStore();
    const [editingId, setEditingId] = useState<string>();

    return (
        <TitledContent title={"eye\nsafe\nzone"} onGoBack={nav.goBack}>
            <Button title="Add eye safe zone" onPress={() => {
                const now = Date.now();
                const id = addEyeSafeZone(now, now + 60 * 60 * 1000);
                setEditingId(id);
            }} />
            <Text style={styles.description}>{"Add a moment in time where your are away from screens to prevent us from spamming you unnecessarily.\n\nFor example while sleeping :)"}</Text>
            {Object.keys(eyeSafeZones).length > 0 && (
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
                        {Object.entries(eyeSafeZones).map(([id, zone]) => {
                            if (id === editingId) return <EditTimeSpan
                                key={id}
                                startTime={zone.start}
                                endTime={zone.end}
                                use24H={use24h}
                                onCancel={() => setEditingId(undefined)}
                                onSave={(timeSpan) => { setEditingId(undefined) }}
                                onDelete={() => { removeEyeSafeZone(id); setEditingId(undefined); }}
                            />
                            return <TimeSpan
                                key={id}
                                startTime={zone.start}
                                endTime={zone.end}
                                use24H={use24h}
                                onPress={() => setEditingId(id)}
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