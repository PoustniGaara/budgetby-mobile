import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCategory } from '../../redux/CategoriesSlice';

//Styles
import styles from './ItemScreen.style';
import gStyles from '../../globalStyles'

//Local
import ItemCard from './ItemCard/ItemCard';

export default function ItemScreen() {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const route = useRoute();
    const { parentCategory } = route.params;

    dispatch(setCurrentCategory(parentCategory));

    const itemCards = parentCategory.items.map((item, index) => (
        <ItemCard
            key={item.id}
            item={item}
            color={parentCategory.color}
            isLast={index === parentCategory.length - 1}
        />
    ));

    return (
        <ScrollView style={[gStyles.darkTheme]}  >
            <View style={gStyles.cardContainer}>
                <Text style={[gStyles.cardTitle, gStyles.titleFont]}>{parentCategory.name}</Text>
                <View style={[gStyles.card]}>
                    {itemCards}
                </View>
            </View>
        </ScrollView>
    );
}

