import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles
import styles from './ItemScreen.style';
import gStyles from '../../globalStyles'

//Local
import ItemCard from './ItemCard/ItemCard';

export default function ItemScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const { headerTitle } = route.params;

    let categoryColor = '#2F7018';
    let color = '#2F7018';

    return (
        <ScrollView style={[gStyles.darkTheme]}  >
            <View style={gStyles.cardContainer}>
                <Text style={[gStyles.cardTitle, gStyles.titleFont]}>{headerTitle}</Text>
                <View style={[gStyles.card]}>
                    <ItemCard name='Mäso' total={100} color={categoryColor} />
                    <ItemCard name='Ryby & Morské plody' total={80} color={categoryColor} />
                    <ItemCard name='Mliečne Výrobky & vajcia' total={70} color={categoryColor} />
                    <ItemCard name='Chlieb & cereálie' total={20} color={categoryColor} />
                    <ItemCard name='Ovocie & zelenina' total={20} color={categoryColor} />
                    <ItemCard name='Nápoje' total={20} color={categoryColor} />
                    <ItemCard name='Mrazené jedlo' total={20} color={categoryColor} />
                    <ItemCard name='Závaraniny & konzervované jedlo' total={20} color={categoryColor} />
                    <ItemCard name='Korenie & omáčky' total={20} color={categoryColor} />
                    <ItemCard name='Ingredience na varenie & pečenie' total={20} color={categoryColor} />
                    <ItemCard name='Snacky & sladkosti' total={0} color={categoryColor} isLast={true} />

                </View>
            </View>

        </ScrollView>
    );
}

