import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FontSizeSetter from './FontSizeSetter'
import { ConverterProvider } from '../../contexts/Converter/Converter.context'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ConverterProvider>{component}</ConverterProvider>)
}

describe('FontSizeSetter', () => {
  it('should render with default font size input', () => {
    renderWithProvider(<FontSizeSetter />)

    const input = screen.getByRole('spinbutton', {
      name: /calculation base on a root font-size/i,
    })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('id', 'rootFontSize')
  })

  it('should have proper label association', () => {
    renderWithProvider(<FontSizeSetter />)

    const label = screen.getByText(/calculation base on a root font-size/i)
    const input = screen.getByRole('spinbutton')

    expect(label).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'rootFontSize')
  })

  it('should have correct input attributes', () => {
    renderWithProvider(<FontSizeSetter />)

    const input = screen.getByRole('spinbutton')

    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('step', '0.001')
    expect(input).toHaveClass('fs-input')
  })

  it('should update font size when input value changes', async () => {
    const user = userEvent.setup()
    renderWithProvider(<FontSizeSetter />)

    const input = screen.getByRole('spinbutton')

    // Clear and set new value
    await user.clear(input)
    await user.type(input, '18')

    // Trigger change event to ensure the handler is called
    fireEvent.change(input, { target: { value: '18' } })

    expect(input).toHaveValue(18)
  })

  it('should handle click on the span to focus input', async () => {
    const user = userEvent.setup()
    renderWithProvider(<FontSizeSetter />)

    const span = screen.getByRole('button')
    const input = screen.getByRole('spinbutton')

    await user.click(span)

    expect(input).toHaveFocus()
  })

  it('should handle keyboard interaction on span', () => {
    renderWithProvider(<FontSizeSetter />)

    const span = screen.getByRole('button')
    const input = screen.getByRole('spinbutton')

    fireEvent.keyDown(span, { key: 'Enter' })

    expect(input).toHaveFocus()
  })

  it('should render pencil icon with correct alt text', () => {
    renderWithProvider(<FontSizeSetter />)

    const image = screen.getByAltText('Edit font size')
    expect(image).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    renderWithProvider(<FontSizeSetter />)

    const span = screen.getByRole('button')

    expect(span).toHaveAttribute('role', 'button')
    expect(span).toHaveAttribute('tabIndex', '0')
  })

  it('should handle default value fallback', async () => {
    const user = userEvent.setup()
    renderWithProvider(<FontSizeSetter />)

    const input = screen.getByRole('spinbutton')

    // Clear input and trigger change
    await user.clear(input)
    fireEvent.change(input, { target: { value: '' } })

    // Should fallback to '16'
    expect(input).toHaveValue(16)
  })

  it('should maintain focus after value change', async () => {
    const user = userEvent.setup()
    renderWithProvider(<FontSizeSetter />)

    const input = screen.getByRole('spinbutton')

    await user.click(input)
    expect(input).toHaveFocus()

    await user.clear(input)
    await user.type(input, '20')

    // Trigger change event to ensure the handler is called
    fireEvent.change(input, { target: { value: '20' } })

    expect(input).toHaveFocus()
    expect(input).toHaveValue(20)
  })
})
