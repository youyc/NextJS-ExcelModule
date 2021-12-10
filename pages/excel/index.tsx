import type { NextPage } from "next"
import styles from "../../styles/Home.module.css"

import { Button } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

// Module
//SheetJS
// import XLSX, { read, write, utils } from "xlsx"
import * as XLSX from "xlsx"
import { resolve } from "path"

const Excel: NextPage = () => {
  //   const [data, setData] = useState([])
  //   const [cols, setCols] = useState([])

  const cols = [
    { name: "A", key: 0 },
    { name: "B", key: 1 },
    { name: "C", key: 2 },
  ]
  const data = [
    ["id", "name", "value"],
    [1, "sheetjs", 7262],
    [2, "js-xlsx", 6969],
  ]

  // react code for excel reader
  const readExcelFile = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader()
      reader.readAsArrayBuffer(file)

      reader.onload = (e: any) => {
        /* Parse data */
        const arrayBuffer: any = e.target.result
        const wb: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: "buffer" })

        /* Get first worksheet */
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
        // const wsname = wb.SheetNames[0]
        // const ws = wb.Sheets[wsname]

        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws)

        //another data format return
        // const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true })
        //return data

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

  const createExcelFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
    console.log("New file created")
  }

  return (
    <main className={styles.main}>
      <div>
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
                if (file != null) {
                  readExcelFile(file)
                }
              }}
            />
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              createExcelFile()
            }}
          >
            Create New Excel File
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Excel
