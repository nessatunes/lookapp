import React from 'react';
import {ScrollView} from '../../components';

import Order from '.';

const OrderList = ({orders}) => {
  return (
    <ScrollView fluid background="light" hasPadding>
      {orders?.map(order => (
        <Order order={order} />
      ))}
    </ScrollView>
  );
};

export default OrderList;
