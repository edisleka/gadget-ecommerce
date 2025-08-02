import { CATEGORIES } from '@/constants/categories'
import { useCartStore } from '@/store/cartStore'
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export const ListHeader = () => {
  const { getItemCount } = useCartStore()

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello, Edis Leka</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name='shopping-cart'
                    size={25}
                    color='gray'
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />

                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={() => {}} style={styles.signOutButton}>
            <FontAwesome name='sign-out' size={25} color='red' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image source={require('@img/hero.png')} style={styles.heroImage} />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <Link href={`/categories/${item.slug}`} asChild>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: '100%',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: '#1BC464',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
