import { useMemo, memo } from 'react'
import { useConverter } from '../../contexts/Converter/Converter.context'
import { pxToRem, remToPx } from '../../util'
import './ConversionTables.css'
import initialPxToRemData from './pxtorem.json'
import initialRemToPxData from './remtopx.json'

interface PxToRemRow {
  readonly px: number
  readonly rem: string
}

interface RemToPxRow {
  readonly rem: number
  readonly px: string
}

const ConversionTables = memo(() => {
  const { rootFontSize } = useConverter()

  const pxToRemRows: PxToRemRow[] = useMemo(
    () =>
      initialPxToRemData.map((row) => ({
        px: row.px,
        rem: pxToRem(rootFontSize, row.px, 2),
      })),
    [rootFontSize]
  )

  const remToPxRows: RemToPxRow[] = useMemo(
    () =>
      initialRemToPxData.map((row) => ({
        rem: row.rem,
        px: remToPx(rootFontSize, row.rem, 2),
      })),
    [rootFontSize]
  )

  return (
    <div className="ct-container">
      <h2>PX&thinsp;↔︎&thinsp;REM conversion tables</h2>
      <div className="ct-table">
        <table aria-label="Pixels to REM conversion table">
          <thead>
            <tr>
              <th scope="col">Pixels</th>
              <th scope="col">REM</th>
            </tr>
          </thead>
          <tbody>
            {pxToRemRows.map((row) => (
              <tr key={row.px}>
                <td>
                  {row.px}
                  <abbr>px</abbr>
                </td>
                <td>
                  {row.rem}
                  <abbr>rem</abbr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table aria-label="REM to pixels conversion table">
          <thead>
            <tr>
              <th scope="col">REM</th>
              <th scope="col">Pixels</th>
            </tr>
          </thead>
          <tbody>
            {remToPxRows.map((row) => (
              <tr key={row.rem}>
                <td>
                  {row.rem}
                  <abbr>rem</abbr>
                </td>
                <td>
                  {row.px}
                  <abbr>px</abbr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

ConversionTables.displayName = 'ConversionTables'

export default ConversionTables
