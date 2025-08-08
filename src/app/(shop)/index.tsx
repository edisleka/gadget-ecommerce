import { useGetProductsAndCategories } from '@/api/api'
import { ListHeader } from '@/components/ListHeader'
import ProductListItem from '@/components/ProductListItem'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function HomeScreen() {
  const { data, isLoading, error } = useGetProductsAndCategories()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !data) {
    return <Text>Error: {error?.message || 'An error occurred'}</Text>
  }

  return (
    <View>
      <FlatList
        data={data.products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={data.categories} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumnWrapper}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
  },
})
