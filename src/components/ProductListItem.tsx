import { Product } from '@/types/product'
import { Link } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}` as any} asChild>
      <Pressable style={styles.item}>
        <View style={styles.itemImageContainer}>
          <Image source={product.heroImage} style={styles.itemImage} />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{product.title}</Text>
          <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  itemImageContainer: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemTextContainer: {
    padding: 8,
    alignItems: 'flex-start',
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    color: '#888',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})
