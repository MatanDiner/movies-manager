import React from 'react';
import Toolbar from '../toolbar/toolbar';
import classes from './layout.css';
import Search from '../search/search';
import Aux from '../../hoc/Aux';
const layout = props => {

    return (

        <Aux>
            <div>
                <Toolbar/>
                <Search/>
            </div>
            <main className={classes.main}>
                <div>{props.children}</div>
            </main>
        </Aux>

    )

}

export default layout;
