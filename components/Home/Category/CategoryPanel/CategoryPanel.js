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

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const handleAddCategory = (newCategory) => {
        dispatch(add(newCategory));
    };

    const handleUpdateCategory = (updatedCategory) => {
        dispatch(update(updatedCategory));
    };

    const handleDeleteCategory = (categoryId) => {
        dispatch(remove(categoryId));
    };

    //variables
    // let currentMonth = 'Apríl' //current month should be drilled from the actuall moth
    let totalAmount = 0; // should be calculated
    let percentage = 32; // should be calculated

    const categoryCards = categories.map((category, index) => (
        totalAmount += category.total,
        <CategoryCard
            key={category.id}
            name={category.name}
            total={category.total}
            color={category.color}
        // isLast={index === categories.length - 1}
        />
    ));

    return (
        <View style={[styles.mainContainer, gStyles.cardContainer]}>
            <Text style={[gStyles.titleFont, styles.overview]}>Tento Mesiac</Text>
            <View style={gStyles.card}>
                <View style={[styles.topContainer]}>
                    <View style={[styles.topLeftContainer]}>
                        <Text style={[gStyles.grayFont, styles.totalText]}>Celkom</Text>
                        <Text style={[styles.totalNumber]}>{totalAmount}€</Text>
                    </View>
                    <View style={[styles.topRightContainer]}>
                        <AntDesign name='arrowup' size={24} color="#8a7e72" ></AntDesign>
                        <Text style={[gStyles.grayFont]}>{percentage}% ako minulý mesiac </Text>
                    </View>
                </View>
                <View>
                    {categoryCards}
                </View>
                <View style={[styles.bottomBorder]}>
                    <Button title='Pridať Kategóriu'></Button>
                </View>
            </View>
        </View>
    );
};

export default CategoryPanel;