import { useState, useContext } from 'react'
import { StyleSheet ,View ,Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Product from '../../components/Product'
import { CartContext } from '../../contexts/CartContext'

export default function Home(){
    const { cart, addItemCart } = useContext(CartContext)
    
    const navigation = useNavigation()
    const [products, setProducts] = useState([
        {
            id:'1',
            name: 'Coca Cola',
            price: 19.90
        },
        {
            id:'2',
            name: 'Chocolate',
            price: 6.50
        },
        {
            id:'3',
            name: 'Queijo 500g',
            price: 15
        },
        {
            id:'4',
            name: 'Batata Frita',
            price: 23.90
        },
        {
            id:'5',
            name: 'Guarana lata',
            price: 6
        }
    ])

    function handleAddCart(item){
        addItemCart(item)
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.carContent}>
                <Text style={styles.title}>Lista de Produtos</Text>
                <TouchableOpacity 
                    style={styles.carButton} 
                    onPress={() => navigation.navigate("Cart")}>
                    {cart?.length > 0 && (<View style={styles.dot}>
                        <Text style={styles.dotText}>{cart?.length}</Text>
                     </View>)}
                    <Icon name="shopping-cart" size={40} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                data={products}
                keyExtractor={(props) => String(props.id)}
                renderItem={({item}) => <Product 
                                            data={item}
                                            addToCart={() => handleAddCart(item)}
                                            />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FAFAFA',
        paddingStart: 14,
        paddingEnd: 14
    },
    carContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    dot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        zIndex:99,
        bottom: -2,
        left: -4,
    },
    dotText:{
        fontSize:14,
        fontWeight: '900'
    }
})