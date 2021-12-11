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
  // const data = [
  //   ["id", "name", "value"],
  //   [1, "sheetjs", 7262],
  //   [2, "js-xlsx", 6969],
  // ]

  const data2 = [
    ["id", "name", "value"],
    [1, "sheetjs", 7262],
    [2, "js-xlsx", 6969],
  ]

  // react code for excel reader
  const read_excel_file = async (file: any) => {
    var data: any = null
    await new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e: any) => {
        /* Parse data */
        const arrayBuffer: any = e.target.result
        const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, {
          type: "buffer",
        })

        /* Get first worksheet */
        const worksheet: XLSX.WorkSheet =
          workbook.Sheets[workbook.SheetNames[0]]
        // const wsname = wb.SheetNames[0]
        // const ws = wb.Sheets[wsname]

        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(worksheet)

        /* Update state */
        resolve(data)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      //   reader.readAsArrayBuffer(file)
    }).then((d: any) => {
      data = d
    })

    return data
  }

  const create_excel_file = () => {
    /* convert state to workbook */
    const worksheet = XLSX.utils.aoa_to_sheet(data2) // data variable
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(workbook, "sheetjs.xlsx")
    console.log("New file created")
  }

  const edit_excel_file = async (file: any) => {
    //need to install @type/node - using fs library for the file access
    // var fs = require("fs")
    const filename: string = file["name"]
    const workbook = await fs.XLSX.readFileSync(filename)
    const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]]
    // console.log(worksheet)
    // const data: any = await read_excel_file(file)
    // console.log(data)
    /* convert state to workbook */
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
                  // read_excel_file(file)
                  edit_excel_file(file)
                }
              }}
            />
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              create_excel_file()
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
