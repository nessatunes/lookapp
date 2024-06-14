/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {Box, Spacer, ScrollView} from '../../components/index';

import api from '../../services/api';

import Header from '../../components/Header';
import StoryList from '../../components/Story/list';
import PostList from '../../components/Post/list';
import Empty from '../../components/Empty';

const Feed = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState({
    stories: [],
    posts: [],
  });

  const getFeed = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const {data: feedData} = await api.get('/feed');
        setFeed(feedData);
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
      getFeed();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Box background="light">
      <Header title={'Explore'} />
      {loading && <Empty loading />}
      {!loading && (
        <ScrollView>
          <StoryList stories={feed?.stories} />
          <Spacer />
          <PostList posts={feed?.posts} />
        </ScrollView>
      )}
    </Box>
  );
};

export default Feed;
