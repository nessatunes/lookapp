/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, {useState, useEffect, useContext} from 'react';

import Header from '../../components/Header';
import OrderList from '../../components/Order/list';
import Empty from '../../components/Empty';

import api from '../../services/api';
import {AppContext} from '../../contexts/app';

const Orders = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const {user} = useContext(AppContext);

  const getOrders = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const {data: ordersData} = await api.get('/orders', {
          params: {
            userId: user?.id,
          },
        });
        setOrders(ordersData);
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
      getOrders();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Header title="Orders" />
      {loading && <Empty loading />}
      {!loading && <OrderList orders={orders} />}
    </>
  );
};

export default Orders;
