import { ListHeader } from '@/components/ListHeader'
import ProductListItem from '@/components/ProductListItem'
import { PRODUCTS } from '@/constants/products'
import { FlatList, StyleSheet, View } from 'react-native'

export default function Index() {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        ListHeaderComponent={ListHeader}
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
