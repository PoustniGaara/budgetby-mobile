import React from 'react';
import { View, Text, ScrollView } from 'react-native';

//Local components
import MonthEditor from './MonthEditor/MonthEditor';
import Overview from './Overview/Overview';
import CategoryPanel from './Category/CategoryPanel/CategoryPanel';

//Styles
import gStyles from '../../globalStyles';
import styles from './Home.style';



const Home = () => {
    return (
        <ScrollView style={[gStyles.darkTheme, styles.container]}>
            {/* <MonthEditor /> */}
            <CategoryPanel />
            <Overview />
        </ScrollView>

    );
};


export default Home;