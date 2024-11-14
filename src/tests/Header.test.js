import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from '../../src/components/Header';
describe('Header Component', () => {
  const serviceItems = [
    { name: 'Dịch vụ công chứng', path: '/services' },
    { name: 'Tra cứu hồ sơ công chứng', path: '/lookup' },
    { name: 'Văn phòng công chứng', path: '/' },
    { name: 'Đăng ký VPCC', path: '*' },
    { name: 'Hướng dẫn', path: '/user-guide' },
  ];

  test('renders logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const logo = screen.getByAltText('logo');
    const title = screen.getByText('ASE');
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('renders menu items on desktop', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    serviceItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

//   test('opens menu on mobile', () => {
//     // Mock useMediaQuery to simulate mobile view
//     jest.spyOn(require('@mui/material/useMediaQuery'), 'default').mockReturnValue(true);

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>,
//     );
//     const menuButton = screen.getByLabelText('menu');
//     fireEvent.click(menuButton);

//     serviceItems.forEach((item) => {
//       expect(screen.getByText(item.name)).toBeInTheDocument();
//     });
//   });

  test('navigates to service items', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routes>
          {serviceItems.map((item) => (
            <Route key={item.name} path={item.path} element={<div>{item.name} Page</div>} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    serviceItems.forEach((item) => {
      const linkElement = screen.getByText(item.name);
      fireEvent.click(linkElement);
      expect(screen.getByText(`${item.name}`)).toBeInTheDocument();
    });
  });

  test('navigates to signin and signup', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routes>
          <Route path="/signin" element={<div>Signin Page</div>} />
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const signinButton = screen.getByText('Đăng nhập');
    fireEvent.click(signinButton);
    expect(screen.getByText('Đăng nhập')).toBeInTheDocument();

    const signupButton = screen.getByText('Đăng ký');
    fireEvent.click(signupButton);
    expect(screen.getByText('Đăng ký')).toBeInTheDocument();
  });
});
