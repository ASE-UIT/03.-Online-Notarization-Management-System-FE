import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarItem from '../../../components/static/SidebarItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

describe('SidebarItem Component', () => {
  const defaultProps = {
    type: 'home',
    icon: <HomeRoundedIcon />,
    title: 'Home',
    selectedMenu: '',
    openSideBar: true,
    onClick: jest.fn(),
  };

  const renderSidebarItem = (props = {}) => {
    return render(<SidebarItem {...defaultProps} {...props} />);
  };

  describe('Render Tests', () => {
    it('renders with icon', () => {
      renderSidebarItem();
      expect(screen.getByTestId('HomeRoundedIcon')).toBeInTheDocument();
    });

    it('renders title when sidebar is open', () => {
      renderSidebarItem();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('hides title when sidebar is closed', () => {
      renderSidebarItem({ openSideBar: false });
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
    });
  });

  describe('Interaction Tests', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      renderSidebarItem({ onClick });

      fireEvent.click(screen.getByRole('listitem'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies selected styles when selected', () => {
      renderSidebarItem({ selectedMenu: 'home' });
      const listItemText = screen.getByText('Home');

      expect(listItemText).toHaveStyle({
        fontWeight: 600,
      });
    });
  });

  describe('Style Tests', () => {
    it('applies correct padding when sidebar is open', () => {
      const { container } = renderSidebarItem();
      const listItem = container.firstChild;

      expect(listItem).toHaveStyle({
        padding: '0.5rem 1rem',
      });
    });

    it('applies correct padding when sidebar is closed', () => {
      const { container } = renderSidebarItem({ openSideBar: false });
      const listItem = container.firstChild;

      expect(listItem).toHaveStyle({
        padding: '0.5rem',
      });
    });

    it('applies correct icon margin when sidebar is open', () => {
      renderSidebarItem();
      const icon = screen.getByTestId('HomeRoundedIcon').parentElement;

      expect(icon).toHaveStyle({
        marginRight: '16px',
      });
    });

    it('removes icon margin when sidebar is closed', () => {
      renderSidebarItem({ openSideBar: false });
      const icon = screen.getByTestId('HomeRoundedIcon').parentElement;

      expect(icon).toHaveStyle({
        marginRight: '0px',
      });
    });
  });
});
