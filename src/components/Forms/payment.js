/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {Box, Text, Title, Spacer, Input, Touchable} from '../';
import SegmentedPicker from 'react-native-segmented-picker';

const PaymentForm = ({onChange = creditCard => {}}) => {
  const pickerRef = useRef(null);
  const [data, setData] = useState({
    holder_name: '',
    number: '',
    valid_date: '',
    cvv: '',
  });

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <>
      <SegmentedPicker
        ref={pickerRef}
        onConfirm={validDate =>
          setData({
            ...data,
            valid_date: `${validDate.month}/${validDate.year}`,
          })
        }
        options={[
          {
            key: 'month',
            items: [
              {label: 'Novembro', value: '11'},
              {label: 'Dezembro', value: '12'},
            ],
          },
          {
            key: 'year',
            items: [
              {label: '2021', value: '2021'},
              {label: '2022', value: '2022'},
            ],
          },
        ]}
      />

      <Box>
        <Title variant="small">Select and enter your payment details</Title>
        <Spacer />
        <Text>By continuing you agree to our Terms</Text>
        <Spacer size="20px" />
        <Input
          placeholder="Holder Name"
          value={data.holder_name}
          onChangeText={holder_name =>
            setData({
              ...data,
              holder_name,
            })
          }
        />
        <Spacer />
        <Input
          placeholder="Credit Card Number"
          value={data.number}
          onChangeText={number =>
            setData({
              ...data,
              number,
            })
          }
        />
        <Spacer />
        <Touchable width="100%" onPress={() => pickerRef.current.show()}>
          <Input
            value={data.valid_date}
            pointerEvents="none"
            editable={false}
            placeholder="09/2025"
          />
        </Touchable>
        <Spacer />
        <Box row>
          <Box spacing="0px 10px 0px 0px">
            <Input
              placeholder="CVV"
              value={data.cvv}
              onChangeText={cvv =>
                setData({
                  ...data,
                  cvv,
                })
              }
            />
          </Box>
          <Box>
            <Spacer />
            <Text variant="small">
              3 or 4 digits usually found on the signature strip
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentForm;
