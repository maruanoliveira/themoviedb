import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import Search from "../components/Search";
import Trending from "../components/Trending";
import GenreSection from "../components/GenreSection";
import MoviesService from "../services/MoviesService";

export default function TabOneScreen({navigation}) {

    const [genreList, updateGenreList] = React.useState([]);

    const loadGenreSections = async () => {

        if (genreList.length === 0) {

            const list = await MoviesService.getGenreList();

            updateGenreList(list);

        }

    }

    loadGenreSections();

    return (
        <View style={styles.container}>
            <ScrollView>
                <Search navigation={navigation} />
                <Trending navigation={navigation} />

                {
                    genreList && genreList.map(genre => {
                        return <GenreSection key={genre.id} navigation={navigation} {...genre} />
                    })
                }

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
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    item: {
        alignItems: "center",
        backgroundColor: "#dcda48",
        flex: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
    },
    poster: {
        width: 100,
        height: 150,
    },
    sectionItem: {
        alignItems: "center",
        backgroundColor: "#dcda48",
        flex: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
    },
    sectionImage: {
        width: 100,
        height: 150,
    },
});
