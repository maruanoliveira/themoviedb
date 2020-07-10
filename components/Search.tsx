import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import MoviesService from "../services/MoviesService";

export default function Search({navigation}) {

    const [loading, updateLoading] = React.useState(false);
    const [searchText, updateSearchText] = React.useState('');
    const [searchResultList, updateSearchResultList] = React.useState([]);

    const onChangeText = async (newSearchText: string) => {

        updateSearchText(newSearchText)

        if (newSearchText) {

            updateLoading(true);

            const list = await MoviesService.getByTitle(newSearchText);

            updateSearchResultList(list);

            updateLoading(false);

        } else {

            updateSearchResultList([]);

        }

    }

    const renderList = () => {

        if (searchResultList.length === 0) return null;

        return (
            <ScrollView>
                <FlatList
                    style={styles.searchList}
                    data={searchResultList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                style={styles.searchListItem}
                                onPress={() => navigation.navigate('TabTwoScreen', item)}>
                                <Image
                                    style={styles.poster}
                                    source={{uri: item.poster_url}}
                                />
                                <View>
                                    <Text style={styles.searchListItemTitle}>{item.original_title}</Text>
                                    <Text style={styles.searchListItemText}>Popularity: {item.popularity}</Text>
                                    <Text style={styles.searchListItemText}>Release Date: {item.release_date}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScrollView>
        )

    }

    const clearSearchInput = () => {
        updateSearchText('')
        updateSearchResultList([]);
    }

    return (
        <View>
            <TextInput
                placeholder={'Pesquisar por título'}
                style={styles.searchInput}
                onChangeText={onChangeText}
                value={searchText}
            />

            {
                searchText !== '' &&
                <TouchableOpacity
                    onPress={clearSearchInput}
                    style={styles.clearButton}
                >
                    <Text style={styles.clearButtonText}>X</Text>
                </TouchableOpacity>
            }

            {
                loading
                    ? <ActivityIndicator size="large" color="#0000ff" />
                    : renderList()
            }
        </View>
    );

}

const styles = StyleSheet.create({
    searchInput: {
        fontSize: 20,
        color: '#000000',
        borderRadius: 5,
        height: 45,
        padding: 15,
        margin: 15,
        backgroundColor: '#f1f1f1',
        fontWeight: '700'
    },
    clearButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 15,
        top: 17
    },
    clearButtonText: {
        fontSize: 20,
        fontWeight: '900',
    },
    searchList: {
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        flexDirection: "row",
        position: "relative"
    },
    searchListItem: {
        flex: 1,
        flexDirection: "row",
        position: "relative"
    },
    searchListItemTitle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '700',
        marginLeft: 5
    },
    searchListItemText: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 5,
    },
    poster: {
        width: 133,
        height: 200,
    }
});
