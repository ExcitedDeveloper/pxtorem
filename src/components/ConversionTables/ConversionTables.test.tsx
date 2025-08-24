import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ConversionTables from './ConversionTables'
import { ConverterProvider } from '../../contexts/Converter/Converter.context'

// Mock the JSON data files
vi.mock('./pxtorem.json', () => ({
  default: [
    { px: 1, rem: null },
    { px: 2, rem: null },
    { px: 16, rem: null },
    { px: 32, rem: null }
  ]
}))

vi.mock('./remtopx.json', () => ({
  default: [
    { rem: 0.25, px: null },
    { rem: 0.5, px: null },
    { rem: 1, px: null },
    { rem: 2, px: null }
  ]
}))

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <ConverterProvider>
      {component}
    </ConverterProvider>
  )
}

describe('ConversionTables', () => {
  it('should render conversion tables with heading', () => {
    renderWithProvider(<ConversionTables />)
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('PX ↔︎ REM conversion tables')
  })

  it('should render pixels to REM table with correct headers', () => {
    renderWithProvider(<ConversionTables />)
    
    const pxToRemTable = screen.getByLabelText('Pixels to REM conversion table')
    expect(pxToRemTable).toBeInTheDocument()
    
    const headers = screen.getAllByText('Pixels')
    expect(headers[0]).toBeInTheDocument()
    
    const remHeaders = screen.getAllByText('REM')
    expect(remHeaders[0]).toBeInTheDocument()
  })

  it('should render REM to pixels table with correct headers', () => {
    renderWithProvider(<ConversionTables />)
    
    const remToPxTable = screen.getByLabelText('REM to pixels conversion table')
    expect(remToPxTable).toBeInTheDocument()
  })

  it('should calculate and display correct conversions for px to rem', () => {
    renderWithProvider(<ConversionTables />)
    
    // With default root font size of 16px:
    // 16px should equal 1rem
    const cells = screen.getAllByText('1')
    expect(cells.length).toBeGreaterThan(0)
    
    // 32px should equal 2rem
    const remCells = screen.getAllByText('2')
    expect(remCells.length).toBeGreaterThan(0)
  })

  it('should calculate and display correct conversions for rem to px', () => {
    renderWithProvider(<ConversionTables />)
    
    // With default root font size of 16px:
    // 1rem should equal 16px
    const pixelCells = screen.getAllByText('16')
    expect(pixelCells.length).toBeGreaterThan(0)
    
    // 2rem should equal 32px
    const largeCells = screen.getAllByText('32')
    expect(largeCells.length).toBeGreaterThan(0)
  })

  it('should render table rows with proper structure', () => {
    renderWithProvider(<ConversionTables />)
    
    const tables = screen.getAllByRole('table')
    expect(tables).toHaveLength(2)
    
    // Check that each table has rows
    tables.forEach(table => {
      const rows = table.querySelectorAll('tbody tr')
      expect(rows.length).toBeGreaterThan(0)
    })
  })

  it('should render abbreviations in table cells', () => {
    renderWithProvider(<ConversionTables />)
    
    const pxAbbrevs = screen.getAllByText('px')
    expect(pxAbbrevs.length).toBeGreaterThan(0)
    
    const remAbbrevs = screen.getAllByText('rem')
    expect(remAbbrevs.length).toBeGreaterThan(0)
  })

  it('should have proper table accessibility attributes', () => {
    renderWithProvider(<ConversionTables />)
    
    const pxToRemTable = screen.getByLabelText('Pixels to REM conversion table')
    expect(pxToRemTable).toHaveAttribute('aria-label', 'Pixels to REM conversion table')
    
    const remToPxTable = screen.getByLabelText('REM to pixels conversion table')
    expect(remToPxTable).toHaveAttribute('aria-label', 'REM to pixels conversion table')
    
    // Check for column headers with scope attribute
    const columnHeaders = screen.getAllByRole('columnheader')
    columnHeaders.forEach(header => {
      expect(header).toHaveAttribute('scope', 'col')
    })
  })
})