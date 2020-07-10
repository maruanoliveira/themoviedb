import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import MoviesService from "../services/MoviesService";

const screenWidth = Math.round(Dimensions.get('window').width);
const finalImageHeight = 281 * screenWidth / 500;

export default function Trending({navigation}) {

    const [trendingList, updateTrendingList] = React.useState([]);

    const loadTrendingMovies = async () => {

        if (trendingList.length === 0) {

            const list = await MoviesService.getTrending();

            updateTrendingList(list)

        }

    }

    loadTrendingMovies();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending</Text>
            <ScrollView>
                <FlatList
                    data={trendingList}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.trendingItem}
                                              onPress={() => navigation.navigate('TabTwoScreen', item)}>
                                <Image
                                    style={styles.trendingImage}
                                    source={{uri: item.backdrop_url}}
                                />
                                <Text style={styles.trendingTitle}>{item.original_title}</Text>
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
    trendingItem: {
        alignItems: "center",
        backgroundColor: "#0A0908",
        flex: 1,
        flexBasis: 0,
        paddingBottom: 20,
    },
    trendingImage: {
        width: screenWidth,
        height: finalImageHeight,
    },
    trendingTitle: {
        fontSize: 20,
        marginTop: 10,
        color: '#ffffff',
        fontWeight: "700",
        width: screenWidth,
        textAlign: "center",
    }
});
