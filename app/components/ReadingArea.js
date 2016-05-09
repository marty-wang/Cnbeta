import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

let ReactCSSTransitionGroup;
try {
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');
} catch (error) {
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
}

import NewsList from './NewsList';
import NewsDetails from './NewsDetails';

const convertLocalDateString = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString();
}

class ReadingArea extends React.Component {
    render() {
        const {dataStore} = this.props;
        const lastUpdated = convertLocalDateString(dataStore.updated.get());
        const selectedEntry = dataStore.selectedEntry.get();

        const column2 = selectedEntry
            ?   <div className={css(styles.column2)}>
                    <ReactCSSTransitionGroup transitionName="details"
                        transitionAppear={true} transitionAppearTimeout={250}
                        transitionEnter={false} transitionLeave={false}>
                            <NewsDetails key={selectedEntry.id} entry={selectedEntry} onClose={() => dataStore.navigateBack()} />
                    </ReactCSSTransitionGroup>
                </div>
            : null;

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.column1)}>
                    <NewsList dataStore={dataStore} />
                    <div className={css(styles.lastUpdated)}>Last updated @ {lastUpdated}</div>
                </div>
                {column2}
            </div>
        )
    }
}

export default observer(ReadingArea);

const styles = StyleSheet.create({
    lastUpdated: {
        textAlign: 'right',
        fontSize: '12px',
        padding: '2px 0 0',
    },
    container: {
        //display: 'flex',
    },
    column1: {
        width: 'calc(100vw - 10px)',
        height: 'calc(100vh - 10px)',
        padding: '5px',
        overflowY: 'auto',
    },
    column2: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: 'calc(100vw - 20px)',
        height: 'calc(100vh - 20px)',
        padding: '10px',
        backgroundColor: 'white',
        overflowY: 'auto'
    }
});