import { View, Text, StyleSheet, SectionList } from "react-native"
import { SearchBar } from 'react-native-elements';
import CardItemHistory from "../components/CardItemHistory";
import CardItem from "../components/CardItem";

import { useDispatch, useSelector } from 'react-redux';
import { getAllHistory, loadHistory } from '../store/userSlice/userSlice';
import { useEffect, useLayoutEffect, useState } from "react";
import { format, parseISO } from 'date-fns';

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
        date: "7-8-2023",
        data: [<CardItem product={DATA[0]} resultVerify={"false"} />, <CardItem product={DATA[1]} resultVerify={"true"} />]
    },
    {
        date: "8-8-2023",
        data: [<CardItem product={DATA[2]} resultVerify={"true"} />]
    }
]


const renderHeader = ({ section }) => (
    <Text style={style.header}>{section.date}</Text>
)

const renderItem = ({ item }) => (
    <View>{item}</View>
)

const HistoryScreen = () => {
    const dispatch = useDispatch()
    const { listHistory, isFetchHistory } = useSelector((state) => state.user)
    const [listData, setListData] = useState([])
    const renderNewData = () => {
        const groupedHistory = listHistory.reduce((acc, historyItem) => {
            let { productpin, result_verify, date_verify } = historyItem;
            date_verify = parseISO(date_verify)
            const formattedDate = format(date_verify, "yyyy-MM-dd");
            date_verify = formattedDate
            // Check if the date is already a key in the groupedHistory object
            if (acc[date_verify]) {
                acc[date_verify].data.push(
                    <CardItemHistory
                        key={`${productpin}-${result_verify}`}
                        product={productpin}
                        resultVerify={result_verify}
                    />
                );
            } else {

                // If date is not a key, create a new entry
                acc[date_verify] = {
                    date: date_verify,
                    data: [
                        <CardItemHistory
                            key={`${productpin}-${result_verify}`}
                            product={productpin}
                            resultVerify={result_verify}
                        />
                    ],
                };
            }

            return acc;
        }, {});
        const groupedHistoryArray = Object.values(groupedHistory);
        return groupedHistoryArray
    }
    useEffect(() => {
        const fetchHistory = async () => {
            if (isFetchHistory === true) {
                try {
                    await dispatch(getAllHistory())
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchHistory()
        setListData(renderNewData())
    }, [isFetchHistory])

    return (
        <View style={style.container}>
            <SectionList
                keyExtractor={(item, index) => index.toString()}
                sections={listData}
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