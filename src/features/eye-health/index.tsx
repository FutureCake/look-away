import { useNavigation } from "@react-navigation/native";
import TitledContent from "../../components/titled-content";
import Article from "./components/article";

export default function EyeHealth() {

    const nav = useNavigation();

    return (
        <TitledContent onGoBack={nav.goBack} title={"tips for\nhappy\neyes"} scrollPadding={80} spacing={60}>
            <Article
                title={"The 20-20-20 rule"}
                description={"Every 20 minutes, look at something 20 feet away for 20 seconds. This lets your ciliary muscle — which contracts to focus up close — fully relax. Studies show it significantly reduces eye fatigue and headaches over a workday."}
            />
            <Article
                title={"Blink consciously"}
                description={"Screen users blink 3-8x per minute — about one third of the normal rate. This starves the cornea of moisture. Make a deliberate habit of slow, complete blinks every few minutes. Lubricating eye drops (preservative-free) can help on dry days."}
            />
            <Article
                title={"Distance training"}
                description={"Alternate focus between near and far objects throughout the day. Look at a nearby finger, then shift to a window 10+ meters away, and back again — 10 repetitions. This exercises the lens's accommodation reflex and may slow myopia progression in susceptible adults."}
            />
            <Article
                title={"Screen position\n& brightness"}
                description={"Position your screen 50-70 cm from your eyes, with the top of the monitor at or slightly below eye level. Match screen brightness to ambient light — a display that looks like a lightbulb in a dim room causes measurable strain. Use your OS night mode after 6 PM to reduce blue-light exposure."}
            />
            <Article
                title={"Optimise your lighting"}
                description={"Glare from windows or overhead lights forces your eyes to work harder. Position your screen perpendicular to windows, not facing or backing them. Indirect, warm-toned lighting (2700–3000 K) is easier on the eyes than cool fluorescent overhead lights."}
            />
            <Article
                title={"Nutrition for eye health"}
                description={"Lutein and zeaxanthin — found in leafy greens, eggs, and corn — accumulate in the macula and filter high-energy blue light. Omega-3 fatty acids (oily fish, flaxseed) support tear film quality. These won't fix strain overnight, but they build structural protection over years."}
            />
        </TitledContent>
    );
}