import * as React from 'react';
import {Dimensions, Image, StyleSheet, ScrollView, Text, View} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const finalImageHeight = 281 * screenWidth / 500;

export default function TabTwoScreen({route}) {

    const movie = route.params;

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.image} source={{uri: movie.backdrop_url}} />
                <Text style={styles.title}>{movie.original_title}</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Popularity: {movie.popularity}</Text>
                    <Text style={styles.info}>Release Date: {movie.release_date}</Text>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <Text style={styles.overview}>{movie.overview}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    image: {
        width: screenWidth,
        height: finalImageHeight,
    },
    overview: {
        fontSize: 18,
        padding: 15,
    },
    infoContainer: {
        flexDirection: "row"
    },
    info: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    }
});
