import React from 'react'
import Title from '../titles/Title'
import { useSidebarContext } from '../sidebar/SidebarProvider'
import './Header.scss'
import Phrase from '../titles/Phrase'

const Header = (props) => {
    const {expandedSidebar} = useSidebarContext()
    return (
        <header className={`${!expandedSidebar ? 'expandHeader' : 'collapseHeader'}`}>
            <Title title={props.textTitle} color={'#000'} />
            <Phrase phrase={props.textPhrase} color={'#000'} />
        </header>
    )
}

export default Header
