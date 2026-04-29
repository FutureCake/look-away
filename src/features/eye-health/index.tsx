import { useNavigation } from "@react-navigation/native";
import TitledContent from "../../components/titled-content";

export default function EyeHealth() {

    const nav = useNavigation();

    return (
        <TitledContent onGoBack={nav.goBack} title={"tips for\nhappy\neyes"} scrollPadding={80}>
        </TitledContent>
    )
}