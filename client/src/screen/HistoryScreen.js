import { View, Text, StyleSheet, SectionList } from "react-native"
import { SearchBar } from 'react-native-elements';
import CardItem from "../components/CardItem";

const DATA = [
    {
        id: "ES001",
        productSN: "productSN ES001",
        name: "ES001 name",
        brand: "ES001 brand",
        price: 1000,
        image: "https://tayamotor.vn/wp-content/uploads/2022/12/DREAM_XANH-400x400.jpg",
    },
    {
        id: "ES002",
        productSN: "productSN ES002",
        name: "ES002 name",
        brand: "ES002 brand",
        price: 1300,
        image: "https://images.autofun.vn/file1/87653b83f38f44518ae12022e7d9ffcf_800.jpg",
    },
    {
        id: "ES003",
        productSN: "productSN ES003",
        name: "ES003 name",
        brand: "ES003 brand",
        price: 1200,
        image: "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2022_06_22/xe_honda.jpg",
    }
]

const newData = [
    {
        date: "Monday 7-8-2023",
        data: [<CardItem product={DATA[0]} resultVerify={"false"} />, <CardItem product={DATA[1]} resultVerify={"true"} />]
    },
    {
        date: "Tuesday 8-8-2023",
        data: [<CardItem product={DATA[2]} resultVerify={"true"} />]
    }
]

const renderItem = ({ item }) => (
    <View>{item}</View>
)

const renderHeader = ({ section }) => (
    <Text style={style.header}>{section.date}</Text>
)

const HistoryScreen = () => {

    return (
        <View style={style.container}>
            <SectionList
                keyExtractor={(item, index) => index.toString()}
                sections={newData}
                renderItem={renderItem}
                renderSectionHeader={renderHeader}
            ></SectionList>

        </View >

    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        height: "100%"
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold'
    },
})

export default HistoryScreen