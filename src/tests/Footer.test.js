import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Footer from '../../src/components/Footer';

describe('Footer Component', () => {
  const homeData = [
    { name: 'Chính sách bảo mật', path: '/privacy-policy' },
    { name: 'Bảo mật thanh toán', path: '/payment-security' },
    { name: 'Điều khoản sử dụng', path: '/terms-of-use' },
    { name: 'Hướng dẫn sử dụng', path: '/user-guide' },
    { name: 'Quy chế hoạt động', path: '/operating-regulations' },
    { name: 'Cơ chế giải quyết khiếu nại', path: '/complaint-resolution' },
  ];
  const productsData = [
    { name: 'Giá', path: '/pricing' },
    { name: 'Dành cho cá nhân', path: '/for-individuals' },
    { name: 'Dành cho VPCC', path: '/for-vpcc' },
  ];
  const aboutUsData = [
    'Trụ sở chính: Linh Trung, Thu Duc, Ho Chi Minh',
    'Email: congchungtructuyen@gmail.com',
    'Số điện thoại: +84 86 868 6868',
  ];

  test('renders logo and main text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const logo = screen.getByAltText('logo');
    const mainText = screen.getByText('Hiện đại bậc nhất.');
    expect(logo).toBeInTheDocument();
    expect(mainText).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const facebookIcon = screen.getByTestId('Facebook');
    const instagramIcon = screen.getByTestId('Instagram');
    const linkedInIcon = screen.getByTestId('LinkedIn');
    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(linkedInIcon).toBeInTheDocument();
  });

  test('renders home data links and navigates correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
        <Routes>
          {homeData.map((item) => (
            <Route key={item.name} path={item.path} element={<div>{item.name} Page</div>} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    homeData.forEach((item) => {
      const linkElement = screen.getByText(item.name);
      fireEvent.click(linkElement);
      expect(screen.getByText(`${item.name}`)).toBeInTheDocument();
    });
  });

  test('renders products data links and navigates correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
        <Routes>
          {productsData.map((item) => (
            <Route key={item.name} path={item.path} element={<div>{item.name} Page</div>} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    productsData.forEach((item) => {
      const linkElement = screen.getByText(item.name);
      fireEvent.click(linkElement);
      expect(screen.getByText(`${item.name}`)).toBeInTheDocument();
    });
  });

  test('renders about us data', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    aboutUsData.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
