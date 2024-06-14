/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Empty from '../../components/Empty';
import Header from '../../components/Header';
import ProductList from '../../components/Product/list';
import {Touchable} from '../../components';

import api from '../../services/api';

const Category = ({route, navigation}) => {
  const {category} = route?.params;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const {data: productsData} = await api.get('/products', {
          params: {
            categoryId: category?.id,
          },
        });
        setProducts(productsData);
        setLoading(false);
      }, 1000 * 3);
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  // FOCUS
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProducts();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Header
        title={category?.title}
        right={() => (
          <Touchable
            hasPadding
            width="70px"
            onPress={() => navigation.navigate('Cart')}>
            <Icon name="bag" size={20} />
          </Touchable>
        )}
      />
      {loading && <Empty loading />}
      {!loading && <ProductList products={products} />}
    </>
  );
};

export default Category;
