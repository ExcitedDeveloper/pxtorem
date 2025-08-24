import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ConverterTitle from './ConverterTitle'
import { ConverterProvider, useConverter, ConversionDirection } from '../../contexts/Converter/Converter.context'

// Test wrapper component to control the converter context
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConverterProvider>
      {children}
    </ConverterProvider>
  )
}

const DirectionController = () => {
  const { setDirection } = useConverter()
  
  return (
    <>
      <button 
        data-testid="set-px-to-rem" 
        onClick={() => setDirection(ConversionDirection.PxToRem)}
      >
        Set PX to REM
      </button>
      <button 
        data-testid="set-rem-to-px" 
        onClick={() => setDirection(ConversionDirection.RemToPx)}
      >
        Set REM to PX
      </button>
    </>
  )
}

describe('ConverterTitle', () => {
  it('should render with default PX to REM title', () => {
    render(
      <TestWrapper>
        <ConverterTitle />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('PX to REM converter')
  })

  it('should update title when direction changes to REM to PX', async () => {
    render(
      <TestWrapper>
        <ConverterTitle />
        <DirectionController />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('PX to REM converter')
    
    await act(async () => {
      screen.getByTestId('set-rem-to-px').click()
    })
    
    expect(heading).toHaveTextContent('REM to PX converter')
  })

  it('should update title when direction changes back to PX to REM', async () => {
    render(
      <TestWrapper>
        <ConverterTitle />
        <DirectionController />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    
    // Start with REM to PX
    await act(async () => {
      screen.getByTestId('set-rem-to-px').click()
    })
    
    expect(heading).toHaveTextContent('REM to PX converter')
    
    // Change back to PX to REM
    await act(async () => {
      screen.getByTestId('set-px-to-rem').click()
    })
    
    expect(heading).toHaveTextContent('PX to REM converter')
  })

  it('should have proper heading structure', () => {
    render(
      <TestWrapper>
        <ConverterTitle />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('should have correct CSS class', () => {
    render(
      <TestWrapper>
        <ConverterTitle />
      </TestWrapper>
    )
    
    const container = screen.getByRole('heading').parentElement
    expect(container).toHaveClass('converter-title')
  })

  it('should render title text constants correctly', () => {
    render(
      <TestWrapper>
        <ConverterTitle />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading')
    
    // Should contain the expected text patterns
    expect(heading.textContent).toMatch(/^(PX to REM converter|REM to PX converter)$/)
  })

  it('should respond to context changes immediately', async () => {
    render(
      <TestWrapper>
        <ConverterTitle />
        <DirectionController />
      </TestWrapper>
    )
    
    const heading = screen.getByRole('heading')
    
    // Multiple quick changes should be handled correctly
    await act(async () => {
      screen.getByTestId('set-rem-to-px').click()
    })
    
    expect(heading).toHaveTextContent('REM to PX converter')
    
    await act(async () => {
      screen.getByTestId('set-px-to-rem').click()
    })
    
    expect(heading).toHaveTextContent('PX to REM converter')
  })
})