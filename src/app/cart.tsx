import { useCartStore } from '@/store/cartStore'
import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type CartItemType = {
  id: number
  title: string
  image: any
  price: number
  quantity: number
}

interface CartItemProps {
  item: CartItemType
  onRemove: (id: number) => void
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
}

const CartItem = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onDecrement(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onIncrement(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice } =
    useCartStore()

  const handleCheckout = () => {
    Alert.alert('Proceed to Checkout', `Total Price: $${getTotalPrice()}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Checkout', onPress: () => console.log('checkout') },
    ])
  }

  return (
    <View style={styles.container}>
      {/* Optional: StatusBar */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
        contentContainerStyle={styles.cartList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#ff5252',
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
