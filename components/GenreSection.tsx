import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import MoviesService from "../services/MoviesService";

export default function GenreSection({id, name, navigation}) {

    const [movieList, updateMovieList] = React.useState([]);

    const loadTrendingMovies = async () => {

        if (movieList.length === 0) {

            const list = await MoviesService.getByGenre(id);

            updateMovieList(list)

        }

    }

    loadTrendingMovies();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <ScrollView>
                <FlatList
                    data={movieList}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TabTwoScreen', item)}
                                style={styles.genreItem}>
                                <Image
                                    style={styles.genreImage}
                                    source={{uri: item.poster_url}}
                                />
                                <Text style={styles.genreTitle}>{item.original_title}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
    },
    title: {
        fontSize: 30,
        color: '#0A0908',
        fontWeight: "700",
        marginLeft: 15
    },
    genreItem: {
        alignItems: "center",
        backgroundColor: "#0A0908",
        flex: 1,
        flexBasis: 0,
        paddingBottom: 20,
        width: '33.3333%',
    },
    genreImage: {
        width: 133,
        height: 200,
    },
    genreTitle: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        marginTop: 10,
        color: '#ffffff',
        fontWeight: "700",
        width: 133,
        height: 20,
    }
});
