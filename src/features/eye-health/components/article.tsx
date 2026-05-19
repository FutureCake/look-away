import { StyleSheet, Text, View } from "react-native";

export interface ArticleProps {
    title: string;
    description: string;
}

export default function Article({ title, description }: ArticleProps) {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            {/* <Text style={styles.readMore}>Read more</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: '#15151d',
        padding: 2,
        marginBottom: 25,
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontFamily: 'americanTypewriter',
        color: '#FFF',
        paddingVertical: 7,
        paddingHorizontal: 14,
        backgroundColor: '#15151d'
    },
    description: {
        fontFamily: 'americanTypewriter',
        fontSize: 18,
        color: '#000',
    },
    // readMore: {
    //     marginTop: 5,
    //     fontFamily: 'americanTypewriter',
    //     fontSize: 18,
    //     color: '#1500FF',
    // }
});