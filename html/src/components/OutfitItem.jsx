import React, {useEffect, useState} from 'react'
import * as transfile from'../translation.js'

export default function OutfitItem({data}) {
  const useOutfit = async (e) => {
    await fetch('https://qbr-clothing/useOutfit', {method: 'POST', body: JSON.stringify({
      skin: data.skin
    })})
  }

  return (
    <div className='clothingMenu_option'>
      <p>{data['outfitname'].toUpperCase()}</p>
      <div className="clothingItem">
        <button className='button button-solid' onClick={() => useOutfit(data)}>
            {transfile[transfile.language.toString() + "_menu"]["use"]}
        </button>
      </div>
    </div>
  )
}