import React from 'react'
import Title from '../../components/titles/Title'
import { useSidebarContext } from '../../components/sidebar/SidebarProvider'
import './Header.scss'
import Phrase from '../../components/titles/Phrase'

const Header = ({textPhrase, textTitle}) => {
    const {expandedSidebar} = useSidebarContext()
    return (
        <header className={`${!expandedSidebar ? 'expandHeader' : 'collapseHeader'}`}>
            <Title title={textTitle} color={'#000'} />
            <Phrase phrase={textPhrase} color={'#000'} />
        </header>
    )
}

export default Header
