import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, update, remove } from '../../../../redux/CategoriesSlice';
import { View, Text, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Styles
import styles from "./CategoryPanel.style";
import gStyles from "../../../../globalStyles";

//Local components
import CategoryCard from '../CategoryCard/CategoryCard';

const CategoryPanel = () => {

    const dispatch = useDispatch();

    const currentSheet = useSelector((state) => state.sheets.currentSheet);

    if (currentSheet === null) { return };

    const recentCategories = currentSheet.categories;

    const lastMonthPercentage = 0;

    const categoryCards = recentCategories.map((category, index) => (
        <CategoryCard
            key={category.id}
            category={category}
            isLast={index === recentCategories.length - 1}
        />
    ));

    return (
        <View style={gStyles.cardContainer}>
            <Text style={[gStyles.titleFont, styles.overview]}>This Month</Text>
            <View style={gStyles.card}>
                <View style={[styles.topContainer]}>
                    <View style={[styles.topLeftContainer]}>
                        <Text style={[gStyles.grayFont, styles.totalText]}>Total</Text>
                        <Text style={[styles.totalNumber]}>{currentSheet.total} DKK</Text>
                    </View>
                    <View style={[styles.topRightContainer]}>
                        <AntDesign name='arrowup' size={24} color="#C6C4C4" ></AntDesign>
                        <Text style={[gStyles.grayFont]}>{lastMonthPercentage}% than last month</Text>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    {categoryCards}
                </View>
            </View>
        </View>
    );
};

export default CategoryPanel;