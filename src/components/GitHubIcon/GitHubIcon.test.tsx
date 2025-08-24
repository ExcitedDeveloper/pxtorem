import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GitHubIcon from './GitHubIcon'

describe('GitHubIcon', () => {
  it('should render GitHub link with proper attributes', () => {
    render(<GitHubIcon />)
    
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/ExcitedDeveloper/pxtorem')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('should have correct CSS class', () => {
    render(<GitHubIcon />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('gh-link')
  })

  it('should render SVG icon', () => {
    render(<GitHubIcon />)
    
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveClass('feather', 'feather-github')
  })

  it('should have proper accessibility attributes', () => {
    render(<GitHubIcon />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', 'GitHub')
    
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('role', 'img')
  })

  it('should have SVG title for accessibility', () => {
    render(<GitHubIcon />)
    
    const title = screen.getByText('GitHub')
    expect(title.tagName).toBe('title')
  })

  it('should have correct SVG attributes', () => {
    render(<GitHubIcon />)
    
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('stroke-width', '2')
    expect(svg).toHaveAttribute('stroke-linecap', 'round')
    expect(svg).toHaveAttribute('stroke-linejoin', 'round')
  })

  it('should render the GitHub path element', () => {
    render(<GitHubIcon />)
    
    const svg = screen.getByRole('img')
    const path = svg.querySelector('path')
    
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d')
  })

  it('should be a static component that renders consistently', () => {
    const { rerender } = render(<GitHubIcon />)
    
    const firstLink = screen.getByRole('link')
    const firstHref = firstLink.getAttribute('href')
    
    rerender(<GitHubIcon />)
    
    const secondLink = screen.getByRole('link')
    const secondHref = secondLink.getAttribute('href')
    
    expect(firstHref).toBe(secondHref)
  })
})