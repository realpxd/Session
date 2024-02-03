import React from 'react'
import { Drawer } from 'react-native-paper';
import { View, TouchableOpacity, Image, Form } from 'react-native'

const Feed = (props) => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section title="Session">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
}

export default Feed