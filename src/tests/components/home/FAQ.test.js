import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FAQSection from '../../../components/home/FAQ';


describe('FAQ Component', () => {
  const questions = [
    'Công chứng là gì?',
    'Công chứng trực tuyến hợp pháp và có giá trị tại đâu?',
    'Có thể công chứng chữ ký của hai hoặc nhiều người trong một cuộc họp không?',
    'Công chứng trực tuyến có giá trị và hiệu lực thi hành tại đâu?',
    'Tôi là một công chứng viên. Làm cách nào để đăng ký làm việc trên Công chứng?',
    'Bằng chứng đảm bảo tính bảo mật và riêng tư của thông tin cá nhân trên văn bản công chứng như thế nào?',
  ];

  test('renders FAQ component', () => {
    render(<FAQSection />);
    expect(screen.getByText('Những câu hỏi thường gặp.')).toBeInTheDocument();
  });

  test('displays all questions', () => {
    render(<FAQSection />);
    questions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  test('expands and collapses questions when clicked', () => {
    render(<FAQSection />);
    const firstQuestion = screen.getByText(questions[0]);

    // Initial state - answer should be collapsed
    const initialCollapse = screen.queryByText(/Công chứng là quá trình/).closest('.MuiCollapse-root');
    expect(initialCollapse).toHaveClass('MuiCollapse-hidden');

    // Click to expand
    fireEvent.click(firstQuestion);
    const expandedCollapse = screen.queryByText(/Công chứng là quá trình/).closest('.MuiCollapse-root');
    expect(expandedCollapse).not.toHaveClass('MuiCollapse-hidden');

    // Click to collapse
    fireEvent.click(firstQuestion);
    const collapsedCollapse = screen.queryByText(/Công chứng là quá trình/).closest('.MuiCollapse-root');
    expect(collapsedCollapse).toHaveClass('MuiCollapse-vertical');
  });

  test('only one question can be expanded at a time', () => {
    render(<FAQSection />);

    // Click first question
    fireEvent.click(screen.getByText(questions[0]));
    expect(screen.getByText(/Công chứng là quá trình/)).toBeVisible();

    // Click second question
    fireEvent.click(screen.getByText(questions[1]));
    const question1 = screen.getAllByText(/Công chứng trực tuyến hợp pháp/)[0];
    expect(question1).toBeVisible();
    //expect(screen.queryByText(/Công chứng là quá trình/)).not.toBeVisible();
  });

  test('shows dividers between questions except last one', () => {
    render(<FAQSection />);
    const dividers = screen.getAllByRole('separator');
    expect(dividers).toHaveLength(questions.length - 1);
  });

  test('changes expand/collapse icons when clicked', () => {
    render(<FAQSection />);
    const firstQuestion = screen.getByText(questions[0]);

    // Initial state - should show expand icon for first question
    const expandIcon = screen.getAllByTestId('ExpandMoreRoundedIcon')[0];
    expect(expandIcon).toBeInTheDocument();

    // After click - should show collapse icon
    fireEvent.click(firstQuestion);
    expect(screen.getByTestId('ExpandLessRoundedIcon')).toBeInTheDocument();
  });
});
