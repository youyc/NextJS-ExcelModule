import type { NextPage } from "next"
import styles from "../../styles/Home.module.css"

import { Button } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

// Module
//SheetJS
import XLSX, { read } from "xlsx"
import { resolve } from "path"

const Excel: NextPage = () => {
  //   const [data, setData] = useState([])
  //   const [cols, setCols] = useState([])

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)

      reader.onload = (e: any) => {
        /* Parse data */
        const arrayBuffer = e.target.result
        const wb = XLSX.read(arrayBuffer, { type: "buffer" })
        /* Get first worksheet */
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws)

        /* Update state */
        resolve(data)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      //   reader.readAsArrayBuffer(file)
    })

    promise.then((d) => {
      console.log(d)
    })
  }

  return (
    <main className={styles.main}>
      <div>
        <Button variant="contained" component="label">
          Upload Excel File
          <input
            id="fileUpload"
            type="file"
            hidden
            onChange={(event) => {
              const file = event.target.files?.item(0)
              // console.log(file)
              if (file != null) readExcel(file)
            }}
          />
        </Button>
      </div>
    </main>
  )
}

export default Excel
