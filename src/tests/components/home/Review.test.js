import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Reviews from '../../../components/home/Reviews';


describe('Reviews Component', () => {
  beforeEach(() => {
    // Mock current date
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-20'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders Reviews component', () => {
    render(<Reviews />);
    expect(screen.getByText('Công chức trực tuyến số 1 tại Việt Nam')).toBeInTheDocument();
  });

  test('displays initial reviews correctly', () => {
    render(<Reviews />);
    expect(screen.getByText('Tuyệt vời')).toBeInTheDocument();
  });

  test('navigates to next reviews', () => {
    render(<Reviews />);
    const nextButton = screen.getByTestId('ArrowCircleRightRoundedIcon').parentElement;

    // Get initial content
    const initialContent = screen.getByText('Tuyệt vời.');
    expect(initialContent).toBeInTheDocument();

    // Click next and verify new content
    fireEvent.click(nextButton);
    expect(screen.getByText('Dễ dàng sử dụng.')).toBeInTheDocument();
  });

  test('navigates to previous reviews', () => {
    render(<Reviews />);
    const nextButton = screen.getByTestId('ArrowCircleRightRoundedIcon').parentElement;
    const prevButton = screen.getByTestId('ArrowCircleLeftRoundedIcon').parentElement;

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    expect(screen.getByText('Tuyệt vời')).toBeInTheDocument();
  });

  test('displays correct star ratings', () => {
    render(<Reviews />);
    const starIcons = screen.getAllByTestId('StarRoundedIcon');
    const halfStarIcons = screen.getAllByTestId('StarHalfRoundedIcon');
    expect(starIcons.length).toBeGreaterThan(0);
    expect(halfStarIcons.length).toBeGreaterThan(0);
  });

  test('shows satisfaction level', () => {
    render(<Reviews />);
    expect(screen.getByText('Tuyệt vời')).toBeInTheDocument();
    expect(screen.getByText(/Dựa trên/)).toBeInTheDocument();
  });

  test('shows review count', () => {
    render(<Reviews />);
    expect(screen.getByText(/100.000 đánh giá/)).toBeInTheDocument();
  });
});
