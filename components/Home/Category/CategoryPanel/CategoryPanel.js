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

    const categories = useSelector((state) => state.categories.categories);
    const recentSheet = useSelector((state) => state.recentSheet.recentSheet);

    const handleAddCategory = (newCategory) => {
        dispatch(add(newCategory));
    };

    const handleUpdateCategory = (updatedCategory) => {
        dispatch(update(updatedCategory));
    };

    const handleDeleteCategory = (categoryId) => {
        dispatch(remove(categoryId));
    };

    const categoryCards = categories.map((category, index) => (
        <CategoryCard
            key={category.id}
            name={category.name}
            total={category.total}
            color={category.color}
            isLast={index === categories.length - 1}
        />
    ));

    return (
        <View style={gStyles.cardContainer}>
            <Text style={[gStyles.titleFont, styles.overview]}>Tento Mesiac</Text>
            <View style={gStyles.card}>
                <View style={[styles.topContainer]}>
                    <View style={[styles.topLeftContainer]}>
                        <Text style={[gStyles.grayFont, styles.totalText]}>Celkom</Text>
                        <Text style={[styles.totalNumber]}>{recentSheet.total}€</Text>
                    </View>
                    <View style={[styles.topRightContainer]}>
                        <AntDesign name='arrowup' size={24} color="#C6C4C4" ></AntDesign>
                        <Text style={[gStyles.grayFont]}>{recentSheet.lastMonthPercentage}% ako minulý mesiac </Text>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    {categoryCards}
                </View>
                {/* <View style={[styles.bottomBorder]}>
                    <Button title='Pridať Kategóriu'></Button>
                </View> */}
            </View>
        </View>
    );
};

export default CategoryPanel;