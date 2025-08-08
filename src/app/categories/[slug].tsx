import { useGetCategoryAndProducts } from '@/api/api'
import ProductListItem from '@/components/ProductListItem'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  const { data, isLoading, error } = useGetCategoryAndProducts(slug)

  if (isLoading) return <ActivityIndicator />

  if (error || !data) return <Text>Error: {error?.message}</Text>

  if (!data.category || !data.products) {
    return <Redirect href={'/404' as any} />
  }

  const { category, products } = data

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: category.name,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
})
