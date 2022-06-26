import React, {useEffect, useState} from 'react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as transfile from'../translation.js'

export default function SkinItem({data, key, onSkinChange}) {
  const [sliderValue, setSliderValue] = useState(0)
  
  const sliderHandler = async (e) => {
    setSliderValue(e)
    data.currentValue = e
    onSkinChange(data)
  }
  
  const onClickHandler = async (type, element) => {
    if(type === 'increase') {
      data.currentValue += 1
      if(data.currentValue > data.maxValue) data.currentValue = data.maxValue
    } else if(type === 'decrease') {
      data.currentValue -= 1
      if(data.currentValue < data.minValue) data.currentValue = data.minValue
    }

    setSliderValue(data.currentValue)
    onSkinChange(data)
  }

  return (
    <div className="skinItem">
      <div className='skinItem_text'>
        <p className='skinItem_text_header'>{translation(data['name'])}</p>
        <p>{data.currentValue} | {data.maxValue}</p>
      </div>
      <div className="skinControls">
        <button className='button button-solid' onClick={() => onClickHandler('decrease', key)}>
          <FontAwesomeIcon icon="angle-left" />
        </button>
        <Slider 
          className='slider'
          defaultValue={data.currentValue}
          min={data.minValue}
          max={data.maxValue}
          value={sliderValue}
          onChange={sliderHandler}
        />
        <button className='button button-solid' onClick={() => onClickHandler('increase', key)}>
          <FontAwesomeIcon className='horizontal-slider' icon="angle-right" />
        </button>
      </div>
    </div>
  )
}


function translation(data){
  try {
    return transfile[transfile.language.toString() + "_clothes"][data] //getting language code in XX format, looking for XX_clothes, then find cloth name in array
  } catch (error) {      //catching any errors
    console.error(error);
  }
}