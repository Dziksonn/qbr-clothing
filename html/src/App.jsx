import React, {useEffect, useState} from 'react'
import ReactTooltip from 'react-tooltip'
import ReactModal from 'react-modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faSuitcase, faHatCowboy, faTshirt, faHorseHead, faSocks } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import Outfits from './components/Outfits.jsx'
import Skins from './components/Skins.jsx'
import Clothes from './components/Clothes.jsx'
import * as transfile from'./translation.js'

library.add(faAngleRight, faAngleLeft, faSuitcase, faHatCowboy, faTshirt, faHorseHead, faSocks)
ReactModal.setAppElement('#root')

export default function App() {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [newPlayer, setNew] =useState(false)
  const [navSelect, setNavSelect] = useState(0)
  const [menuType, setType] = useState('')
  const [outfits, setOutfits] = useState([])
  const [skins, setSkins] = useState([])
  const [clothes, setClothing] = useState([])
  const [outfitName, setOutfitName] = useState(null)

  const openingMenu = (e) => {
    let data = e.data 
    switch (data.type) {
      case 'newPlayer':
        setNew(true)
        setType('new')
        setSkins(data.skins)
        setClothing(data.clothes)
        setNavSelect(2)
        setOpen(true)
        break;
      case 'outfitMenu':
        setType('outfits')
        setOutfits(data.outfits)
        setNavSelect(1)
        setOpen(true)
        break;
      case 'skinMenu':
        setType('skins')
        setSkins(data.skins)
        setNavSelect(2)
        setOpen(true)
        break;
      case 'clothingMenu':
        setType('clothes')
        setClothing(data.clothes)
        setNavSelect(3)
        setOpen(true)
        break;
      case 'allMenu':
        setType('all')
        setOutfits(data.outfits)
        setSkins(data.skins)
        setClothing(data.clothes)
        setNavSelect(1)
        setOpen(true)
        break;
    }
  }

  const onKeyUp = (e) => {
    if(!newPlayer && e.key === 'Escape') closeMenu(false)
  }

  const rotateCamera = (e) => {
    fetch('https://qbr-clothing/rotateCamera', {method: 'POST', body: JSON.stringify({
      direction: e
    })})
  }

  const setCamera = (e) => {
    fetch('https://qbr-clothing/setCamera', {method: 'POST', body: JSON.stringify({
      direction: e
    })})
  }

  const setMenu = (e) => {
    setNavSelect(e)
  }

  const closeMenu = (save) => {
    setOpen(false)
    setModal(false)
    setNew(false)
    setNavSelect(0)
    setType('')
    setOutfits(null)
    setSkins(null)
    setClothing(null)
    setOutfitName('')

    if(save) {
      fetch('https://qbr-clothing/closeMenu', {method: 'POST', body: JSON.stringify({})})
    } else {
      fetch('https://qbr-clothing/closeMenu2', {method: 'POST', body: JSON.stringify({})})
    }

  }

  const saveCharacter = () => {
    if(navSelect != 1) {
      if(newPlayer) {
        fetch('https://qbr-clothing/save', {method: 'POST', body: JSON.stringify({})})
        closeMenu(true)
      } else if(!modal) {
        setModal(true)
      } else if(modal && outfitName.length > 1) {
        setModal(false)
        fetch('https://qbr-clothing/saveOutfit', {method: 'POST', body: JSON.stringify({
          outfitName: outfitName
        })})
  
        closeMenu(true)
      }
    }
  }

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: '#000',
      borderRadius: '10px',
      color: '#fff',
    },
  }

  useEffect(() => {
    window.addEventListener('message', openingMenu)
    return () => {
        window.removeEventListener('message', openingMenu);
    };
  }, [])

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keyup', onKeyUp)
    };
  }, [])

  return (
    <main id='App'>
      {open &&
        <section id='MainContent'>
          <ReactModal style={modalStyle} isOpen={modal} contentLabel='Outfit Name' onRequestClose={() => setModal(false)}>
            <div className="modalText">
              <h1>{transfile[transfile.language.toString() + "_menu"]["outfit_name"]}</h1>
              <input type="text" onInput={(e) => setOutfitName(e.target.value)} />
            </div>
            <div className="modalButtons">
              <button className='button button-solid' onClick={() => saveCharacter()}>
                {transfile[transfile.language.toString() + "_menu"]["save"]}
              </button>
              <button className='button button-solid' onClick={() => setModal(false)}>
                {transfile[transfile.language.toString() + "_menu"]["cancel"]}
              </button>
            </div>
          </ReactModal>
          <ReactTooltip />
          <div className="changeCamera_buttons">
            <button className='button button-solid' onClick={() => rotateCamera('left')} data-tip={transfile[transfile.language.toString() + "_menu"]["rotate_camera"]}>
              <FontAwesomeIcon icon="angle-left" />
            </button>
            <button className='button button-solid' onClick={() => setCamera(1)} data-tip={transfile[transfile.language.toString() + "_menu"]["upper_body"]}>
              <FontAwesomeIcon icon="horse-head" />
            </button>
            <button className='button button-solid' onClick={() => setCamera(2)} data-tip={transfile[transfile.language.toString() + "_menu"]["middle_body"]}>
              <FontAwesomeIcon icon="tshirt" />
            </button>
            <button className='button button-solid' onClick={() => setCamera(3)} data-tip={transfile[transfile.language.toString() + "_menu"]["lower_body"]}>
              <FontAwesomeIcon icon="socks" />
            </button>
            <button className='button button-solid' onClick={() => rotateCamera('right')} data-tip={transfile[transfile.language.toString() + "_menu"]["rotate_camera"]}>
              <FontAwesomeIcon icon="angle-right" />
            </button>
          </div>
          <div className="contentWrapper">
            <div className="contentWrapper_inner">
              <div className="clothingSection">

                { navSelect === 1 && 
                  <>
                    <p className="clothingMenu_header">{transfile[transfile.language.toString() + "_menu"]["Outfits"]}</p>
                    <Outfits data={outfits} /> 
                  </>
                }
                { navSelect === 2 && 
                  <>
                    <div className="clothingMenu_header">
                      <p>{transfile[transfile.language.toString() + "_menu"]["skin_customization"]}</p>
                    </div>
                    <Skins data={skins} />
                  </> 
                }
                { navSelect === 3 &&  
                  <>
                    <p className="clothingMenu_header">{transfile[transfile.language.toString() + "_menu"]["clothing_customization"]}</p>
                    <Clothes data={clothes} />
                  </>
                }
              </div>
              <div className="selectionMenu">
                <button className='button button-solid' onClick={() => saveCharacter()}>
                    {transfile[transfile.language.toString() + "_menu"]["save"]}
                </button>
                
                { (!newPlayer && menuType === 'outfits' || menuType === 'all') && 
                  <button className={navSelect === 1 ? 'button button-solid active' : 'button button-solid'}  onClick={() => setMenu(1)} data-tip={transfile[transfile.language.toString() + "_menu"]["Outfits"]}>
                    <FontAwesomeIcon icon="suitcase" />
                  </button>
                }

                { (menuType === 'skins' || menuType === 'new' || menuType === 'all') &&
                  <button className={navSelect === 2 ? 'button button-solid active' : 'button button-solid'}  onClick={() => setMenu(2)} data-tip={transfile[transfile.language.toString() + "_menu"]["skin_customization"]}>
                    <FontAwesomeIcon icon="hat-cowboy" />
                  </button>
                }

                { (menuType === 'clothes' || menuType === 'new' || menuType === 'all') &&
                  <button className={navSelect === 3 ? 'button button-solid active' : 'button button-solid'} onClick={() => setMenu(3)} data-tip={transfile[transfile.language.toString() + "_menu"]["clothing_customization"]}>
                    <FontAwesomeIcon icon="tshirt" />
                  </button>
                }

                <button className='button button-solid' onClick={() => closeMenu(false)}>
                  {transfile[transfile.language.toString() + "_menu"]["close"]}
                </button>
              </div>
            </div>
          </div>
        </section>
      }
    </main>
  )
}
