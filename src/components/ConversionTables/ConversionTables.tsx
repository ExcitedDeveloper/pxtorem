import { useEffect } from 'react'
import { useConverter } from '../../contexts/Converter/Converter.context'
import { pxToRem, remToPx } from '../../util'
import './ConversionTables.css'
import initialPxToRemData from './pxtorem.json'
import initialRemToPxData from './remtopx.json'

const ConversionTables = () => {
  const { rootFontSize } = useConverter()

  const insertNewCell = (
    text: string,
    abbr: string,
    newRow?: HTMLTableRowElement
  ) => {
    if (!newRow) return

    const newCell = newRow.insertCell()

    if (!newCell) {
      // eslint-disable-next-line no-console
      console.error(`ConversionTables: Error creating new cell`)
      return
    }

    newCell.innerHTML = `${text}<abbr>${abbr}</abbr>`
  }

  useEffect(() => {
    const pxToRemTbodyElem = document.getElementById(
      'pxToRemTbody'
    ) as HTMLTableElement
    const remToPxTbodyElem = document.getElementById(
      'remToPxTbody'
    ) as HTMLTableElement

    if (!pxToRemTbodyElem || !remToPxTbodyElem) return

    pxToRemTbodyElem.innerHTML = ''
    remToPxTbodyElem.innerHTML = ''

    initialPxToRemData.forEach((row) => {
      const newRow = pxToRemTbodyElem.insertRow()
      insertNewCell(row.px.toString(), 'px', newRow)
      insertNewCell(pxToRem(rootFontSize, row.px, 2), 'rem', newRow)
    })

    initialRemToPxData.forEach((row) => {
      const newRow = remToPxTbodyElem.insertRow()
      insertNewCell(row.rem.toString(), 'rem', newRow)
      insertNewCell(remToPx(rootFontSize, row.rem, 2), 'px', newRow)
    })
  }, [rootFontSize])

  return (
    <div className="ct-container">
      <div>PX&thinsp;↔︎&thinsp;REM conversion tables</div>
      <div className="ct-table">
        <table>
          <thead>
            <tr>
              <th>Pixels</th>
              <th>REM</th>
            </tr>
          </thead>
          <tbody id="pxToRemTbody" />
        </table>
        <table>
          <thead>
            <tr>
              <th>REM</th>
              <th>Pixels</th>
            </tr>
          </thead>
          <tbody id="remToPxTbody" />
        </table>
      </div>
    </div>
  )
}

export default ConversionTables
