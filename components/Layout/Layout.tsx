import React from 'react';
import Header from './Header';

type Props = {
	children?: JSX.Element | JSX.Element[];
}

const Layout =({children}: Props) =>{
    return(
		<>
			{children}
		</>
    )
}

export default Layout;