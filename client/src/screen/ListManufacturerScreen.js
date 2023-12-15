import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { SearchBar } from 'react-native-elements';
import CardItem from "../components/CardItem";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from "react";
import { loadProductAction } from "../store/manufactuer/manufacturerSlice";

const data = [
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
    },
    {
        id: "ES004",
        productSN: "productSN ES004",
        name: "ES004 name",
        brand: "ES004 brand",
        price: 1250,
        image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/425/542/products/ex-den-mo-web.jpg",
    },
    {
        id: "ES005",
        productSN: "productSN ES005",
        name: "ES005 name",
        brand: "ES005 brand",
        price: 1100,
        image: "https://cdn.honda.com.vn/motorbikes/December2022/3C0atxHao3Fpr79jsnVl.jpg",
    },
    {
        id: "ES006",
        productSN: "productSN ES006",
        name: "ES006 name",
        brand: "ES006 brand",
        price: 1200,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1pIX8akid7rplhEx5IR2Cma5rXRF7tp6T9Q&usqp=CAU",
    },
]

const renderItem = ({ item }) => {
    return (

        <CardItem product={item} />
    )
}

const ListManufacturerScreen = () => {
    const dispatch = useDispatch()
    const { listProduct, isFetching } = useSelector((state) => state.manufacturer)
    const [listData, setListData] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            if (isFetching === true) {
                try {
                    await dispatch(loadProductAction())
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchProduct()
        setListData(listProduct)
    }, [isFetching])
    return (
        <View style={styles.screenContainer}>
            <View>
                <SearchBar placeholder="Search by name" platform="android" inputStyle={{ fontSize: 12 }}
                    containerStyle={{ padding: 0 }}
                />
            </View>
            <FlatList data={listProduct} renderItem={renderItem} keyExtractor={item => item.product_id}
                showsVerticalScrollIndicator={false}
            />
            {/* <View style={styles.list}>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        height: "100%",
    },
    list: {
        flex: 1,

    }
})

export default ListManufacturerScreen