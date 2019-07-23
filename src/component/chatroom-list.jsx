import React, { PureComponent, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Card from '@material-ui/core/Card';
import { ChatRoomSearch } from '../component/chatroom-search';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
};

class Row extends PureComponent {
  render() {
    const { index } = this.props;
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <ListItem button key={index}>
        <ListItemText
          primary={label}
          secondary={`Latitude: X, Longitude: Y`}
          secondaryTypographyProps={{ align: "left" }} />
      </ListItem>
    );
  }
}
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300
  },
  nothingToShow: {
    fontSize: 20,
    padding: 25
  },
  search: {
    padding: 15,
    display: 'flex',
    justifyContent: 'space-evenly'
  }
};
export class ChatRoomList extends Component {
  addNewChatRoom = () => {
    console.log('add new chat')
  }
  render() {
    const chatrooms = [];
    return (
      <Card style={styles.root}>
        <div style={styles.search}>
          <ChatRoomSearch></ChatRoomSearch>
          <IconButton aria-label="Add" onClick={this.addNewChatRoom}>
            <AddIcon />
          </IconButton>
        </div>

        {chatrooms.length > 0 ?
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={0}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={300}
                itemCount={0}
                itemSize={40}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={350}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
          :

          <span style={styles.nothingToShow}>Nothing to show here.<br /> Use the + button to create a new chat</span>}
      </Card>
    );
  }
}