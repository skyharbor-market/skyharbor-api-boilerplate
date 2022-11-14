import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NFTCard from '../components/NFTCard'
import styles from '../styles/Home.module.css'
import { skyHarborApi } from '../utils/consts'

const limit = 10
// `${skyHarborApi}/api/sales?status=active&orderCol=list_time&order=asc&limit=${limit}`

export default function Home() {

  const [sales, setSales] = useState([]);

  //collection
  //status = active | complete | cancelled
  //orderCol = 
  //order
  //limit


  async function getSales() {
    // const res = await axios.get(`${skyHarborApi}/api/sales?collection=ethugees&status=active&limit=${limit}&orderCol=list_time&order=desc`);
    
    const res = await axios.get(`${skyHarborApi}/api/collections`);
    
    console.log(res);
    if(!res) {
      return
    }

    const resData = res.data

    setSales(resData);


  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <div>
      <div style={{textAlign: "center"}}>
        <p style={{fontSize: 48, fontWeight: "bold"}}>SkyHarbor Tutorial</p>
      </div>

      {/* <div>
        {
          sales.map((item, index) => {
            return (
              <NFTCard item={item}/>
            )
          })
        }
      </div> */}
    </div>
  )
}
