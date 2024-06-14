/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Box, ScrollView, Text} from '../../components';
import Post from '.';

const PostList = ({posts}) => {
  return (
    <Box
      style={{
        minWidth: '100%',
      }}>
      {posts?.map(post => (
        <Post post={post} />
      ))}
    </Box>
  );
};

export default PostList;
