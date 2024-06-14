/* eslint-disable no-alert */
import React from 'react';
import moment from 'moment';

import {Touchable, Cover, Box, Text} from '../';
import {colors} from '../../styles/theme.json';

const Story = ({story}) => {
  return (
    <Touchable
      onPress={() => alert('teste')}
      background="black"
      radius="10px"
      height="190px"
      spacing="0px 5px 0px"
      width="150px">
      <Cover width="100%" height="100%" image={story?.cover}>
        <Box
          fluid
          hasPadding
          background={`${colors.dark}80`}
          justify="space-between">
          <Cover
            circle
            width="40px"
            height="40px"
            border={`1px solid ${colors.light}`}
            image={story?.owner?.photo}
          />

          <Box height="50px" justify="flex-end">
            <Text bold color="light">
              {story?.owner?.username}
            </Text>
            <Text color="light" variant="small">
              {moment(story.createdAt).fromNow()}
            </Text>
          </Box>
        </Box>
      </Cover>
    </Touchable>
  );
};

export default Story;
