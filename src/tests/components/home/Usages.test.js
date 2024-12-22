import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Usages from '../../../components/home/Usages';

// Mock image imports
jest.mock('../../../assets/images/SaveTime.png', () => 'mocked-save-time.png');
jest.mock('../../../assets/images/FastConvenient.png', () => 'mocked-fast-convenient.png');
jest.mock('../../../assets/images/TransparencySafety.png', () => 'mocked-transparency-safety.png');

describe('Usages Component', () => {
  const titles = ['Tiết kiệm thời gian', 'Nhanh chóng và tiện lợi', 'Minh bạch và an toàn'];

  test('renders Usages component', () => {
    render(<Usages />);
    expect(screen.getByText(titles[0])).toBeInTheDocument();
  });

  test('displays initial card correctly', () => {
    render(<Usages />);
    const centerCard = screen.getByText(titles[0]).closest('.MuiCard-root');
    const cardStyle = window.getComputedStyle(centerCard.parentElement);
    expect(cardStyle.transform).toContain('translateX(-150%) scale(0.8) rotateY(20deg)');
    expect(cardStyle.opacity).toBe('0.5');
  });

  test('navigates to next card', () => {
    render(<Usages />);
    const nextButton = screen.getByTestId('ArrowCircleRightRoundedIcon').parentElement;

    fireEvent.click(nextButton);

    expect(screen.getByText(titles[1])).toBeInTheDocument();
    const newCenterCard = screen.getByText(titles[1]).closest('.MuiCard-root');
    const cardStyle = window.getComputedStyle(newCenterCard.parentElement);
    expect(cardStyle.transform).toContain('translateX(-150%) scale(0.8) rotateY(20deg)');
  });

  test('navigates to previous card', () => {
    render(<Usages />);
    const prevButton = screen.getByTestId('ArrowCircleLeftRoundedIcon').parentElement;

    fireEvent.click(prevButton);

    expect(screen.getByText(titles[2])).toBeInTheDocument();
  });

  test('cycles through cards correctly', () => {
    render(<Usages />);
    const nextButton = screen.getByTestId('ArrowCircleRightRoundedIcon').parentElement;

    // Click through all cards
    titles.forEach((title, index) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });

    // Should cycle back to first card
    expect(screen.getByText(titles[0])).toBeInTheDocument();
  });

  test('changes card on direct click', () => {
    render(<Usages />);
    const thirdCard = screen.getByText(titles[2]).closest('.MuiCard-root');

    fireEvent.click(thirdCard);

    const cardStyle = window.getComputedStyle(thirdCard.parentElement);
    expect(cardStyle.transform).toContain('translateX(-50%) scale(1)');
    expect(cardStyle.opacity).toBe('1');
  });

  test('applies correct styles to side cards', () => {
    render(<Usages />);
    const cards = screen.getAllByRole('img', { name: 'Rectangle' });

    const leftCard = cards[2].closest('.MuiCard-root');
    const rightCard = cards[1].closest('.MuiCard-root');

    const leftStyle = window.getComputedStyle(leftCard.parentElement);
    const rightStyle = window.getComputedStyle(rightCard.parentElement);

    expect(leftStyle.transform).toContain('scale(0.8)');
    expect(rightStyle.transform).toContain('translateX(-50%) scale(1)');
    expect(leftStyle.opacity).toBe('0.5');
    expect(rightStyle.opacity).toBe('1');
  });
});
