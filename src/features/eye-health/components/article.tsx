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
            <Text style={styles.readMore}>Read more</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignSelf: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: '#1500FF',
        paddingBottom: 2,
        marginBottom: 15,
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontFamily: 'americanTypewriter',
        color: '#1500FF',
        paddingVertical: 7,
        borderBottomWidth: 2,
        borderBottomColor: '#1500FF',
    },
    description: {
        fontFamily: 'americanTypewriter',
        fontSize: 18,
        color: '#000',
    },
    readMore: {
        marginTop: 10,
        fontFamily: 'americanTypewriter',
        fontSize: 18,
        color: '#1500FF',
        textDecorationLine: 'underline',
    }
});